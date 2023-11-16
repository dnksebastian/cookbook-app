const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Recipe = require('../models/recipe');

const testUser = supertest.agent(app);
let userToken = null;

const createTestUser = async () => {
    const testUser = {
        username: 'testuser',
        name: 'Test User',
        password: 'test'
    };

    await api
        .post('/api/users')
        .send(testUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);
};

const loginTestUser = async () => {
    const loggedUser = await testUser
        .post('/api/login')
        .send({ username: 'testuser', password: 'test' })
        .expect(200)
        .expect('Content-Type', /application\/json/);

    userToken = loggedUser.body.token;
};

beforeAll(async () => {
    await createTestUser();
    console.log('test user created');
    await loginTestUser();
    console.log('test user logged in');
    // await Recipe.insertMany(helper.initialRecipes);
    await Recipe.deleteMany({});
});


describe('some recipes available initially', () => {

    beforeEach(async () => {
        await Recipe.deleteMany({});
        // await Recipe.insertMany(helper.initialRecipes);

        for (let recipe of helper.initialRecipes) {
            // let recipeObj = new Recipe(recipe);
            await api
                .post('/api/recipes')
                .set('Authorization', `Bearer ${userToken}`)
                .send(recipe)
                .expect(201)
                .expect('Content-Type', /application\/json/);
        }
    });

    test('return recipes as json', async () => {
        await api
            .get('/api/recipes')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('return all recipes', async () => {
        const response = await api.get('/api/recipes');

        expect(response.body).toHaveLength(helper.initialRecipes.length);
    });

    test('a specific recipe is within returned recipes', async () => {
        const response = await api.get('/api/recipes');

        const titles = response.body.map(r => r.title);
        expect(titles).toContain('Test recipe 1');
    });

});

describe('fetching a specific recipe', () => {

    beforeEach(async () => {
        await Recipe.deleteMany({});
        // await Recipe.insertMany(helper.initialRecipes);

        for (let recipe of helper.initialRecipes) {
            // let recipeObj = new Recipe(recipe);
            await api
                .post('/api/recipes')
                .set('Authorization', `Bearer ${userToken}`)
                .send(recipe)
                .expect(201)
                .expect('Content-Type', /application\/json/);
        }
    });

    test('a specific recipe can be fetched', async () => {
        const recipesAtStart = await helper.recipesInDb();

        const recipeToShow = recipesAtStart[0];

        const resultRecipe = await api
            .get(`/api/recipes/${recipeToShow.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(resultRecipe.body).toEqual(recipeToShow);
    });

    test('returns 404 if recipe does not exist', async () => {
        const validUnavailableID = await helper.nonExistingId();

        await api
            .get(`/api/recipes/${validUnavailableID}`)
            .expect(404);
    });

    test('returns 400 if ID invalid', async () => {
        const invalidID = 'testingivalid';

        await api
            .get(`/api/recipes/${invalidID}`)
            .expect(400);
    });
});

describe('adding new recipe', () => {
    beforeEach(async () => {
        await Recipe.deleteMany({});
        // await Recipe.insertMany(helper.initialRecipes);

        for (let recipe of helper.initialRecipes) {
            // let recipeObj = new Recipe(recipe);
            await api
                .post('/api/recipes')
                .set('Authorization', `Bearer ${userToken}`)
                .send(recipe)
                .expect(201)
                .expect('Content-Type', /application\/json/);
        }
    });

    test('new valid recipe can be added', async () => {
        const newRecipe = {
            title: 'Test recipe 3',
            ingredients: ['Test ingredient 3'],
            method: 'Testing method 3',
            cookingTime: '30'
        };

        await api
            .post('/api/recipes')
            .set('Authorization', `Bearer ${userToken}`)
            .send(newRecipe)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const recipesAtEnd = await helper.recipesInDb();
        expect(recipesAtEnd).toHaveLength(helper.initialRecipes.length + 1);

        const titles = recipesAtEnd.map(r => r.title);
        expect(titles).toContain('Test recipe 3');
    });

    test('invalid recipe is not added and returns 400', async () => {
        const newRecipe = {
            ingredients: ['Test ingredient invalid'],
            method: 'Testing method invalid',
            cookingTime: '0'
        };

        await api
            .post('/api/recipes')
            .set('Authorization', `Bearer ${userToken}`)
            .send(newRecipe)
            .expect(400);

        const recipesAtEnd = await helper.recipesInDb();

        expect(recipesAtEnd).toHaveLength(helper.initialRecipes.length);
    });

    test('adding recipe fails with 401 if user not logged', async () => {
        const newRecipe = {
            title: 'Valid title',
            ingredients: ['Valid ingredient'],
            method: 'Valid method',
            cookingTime: '10'
        };

        await api
            .post('/api/recipes')
            .set('Authorization', 'Bearer invalidToken')
            .send(newRecipe)
            .expect(401);

        const recipesAtEnd = await helper.recipesInDb();

        expect(recipesAtEnd).toHaveLength(helper.initialRecipes.length);
    });
});

describe('deleting a recipe', () => {

    beforeEach(async () => {
        await Recipe.deleteMany({});
        // await Recipe.insertMany(helper.initialRecipes);

        for (let recipe of helper.initialRecipes) {
            // let recipeObj = new Recipe(recipe);
            await api
                .post('/api/recipes')
                .set('Authorization', `Bearer ${userToken}`)
                .send(recipe)
                .expect(201)
                .expect('Content-Type', /application\/json/);
        }
    });

    test('recipe can be deleted', async () => {
        const startRecipes = await helper.recipesInDb();
        const recipeToDelete = startRecipes[0];

        await api
            .delete(`/api/recipes/${recipeToDelete.id}`)
            .set('Authorization', `Bearer ${userToken}`)
            .expect(204);

        const endRecipes = await helper.recipesInDb();

        expect(endRecipes).toHaveLength(helper.initialRecipes.length - 1);

        const titles = endRecipes.map(r => r.title);

        expect(titles).not.toContain(recipeToDelete.title);
    });
});

describe('one user in db initially', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('secret', 10);
        const user = new User({ username: 'root', passwordHash });

        await user.save();
    });

    test('adding new username succeeds', async () => {
        const startUsers = await helper.usersInDb();

        const newUser = {
            username: 'newTest',
            name: 'John Doe',
            password: 'testpass',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const endUsers = await helper.usersInDb();
        expect(endUsers).toHaveLength(startUsers.length + 1);

        const usernames = endUsers.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test('adding new username with not unique username fails with status 400', async () => {
        const startUsers = await helper.usersInDb();

        const newUser = {
            username: 'root',
            name: 'Invalid',
            password: 'testpwd',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('expected `username` to be unique');

        const endUsers = await helper.usersInDb();
        expect(endUsers).toEqual(startUsers);
    });

    test('adding user with username too short fails', async () => {
        const startUsers = await helper.usersInDb();

        const newUser = {
            username: 'us',
            name: 'Too Short',
            password: 'testpwd',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('must have at least 3');

        const endUsers = await helper.usersInDb();
        expect(endUsers).toEqual(startUsers);
    });

    test('adding user with invalid password fails', async () => {
        const startUsers = await helper.usersInDb();

        const newUser = {
            username: 'usernameOK',
            name: 'Too Short',
            password: 'in',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('must have at least 3');

        const endUsers = await helper.usersInDb();
        expect(endUsers).toEqual(startUsers);
    });
});


afterAll(async () => {
    await mongoose.connection.close();
});