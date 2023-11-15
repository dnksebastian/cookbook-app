const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Recipe = require('../models/recipe');




beforeEach(async () => {
    await Recipe.deleteMany({});

    const recipeObjects = helper.initialRecipes.map(recipe => new Recipe(recipe));
    const promiseArr = recipeObjects.map(recipe => recipe.save());
    await Promise.all(promiseArr);

    // for (let recipe of helper.initialRecipes) {
    //     let recipeObj = new Recipe(recipe);
    //     await recipeObj.save();
    // }
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

test('new valid recipe can be added', async () => {
    const newRecipe = {
        title: 'Test recipe 3',
        ingredients: ['Test ingredient 3'],
        method: 'Testing method 3',
        cookingTime: '30'
    };

    await api
        .post('/api/recipes')
        .send(newRecipe)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const recipesAtEnd = await helper.recipesInDb();
    expect(recipesAtEnd).toHaveLength(helper.initialRecipes.length + 1);

    const titles = recipesAtEnd.map(r => r.title);
    expect(titles).toContain('Test recipe 3');
});

test('invalid recipe is not added', async () => {
    const newRecipe = {
        ingredients: ['Test ingredient invalid'],
        method: 'Testing method invalid',
        cookingTime: '0'
    };

    await api
        .post('/api/recipes')
        .send(newRecipe)
        .expect(400);

    const recipesAtEnd = await helper.recipesInDb();

    expect(recipesAtEnd).toHaveLength(helper.initialRecipes.length);
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

test('recipe can be deleted', async () => {
    const startRecipes = await helper.recipesInDb();
    const recipeToDelete = startRecipes[0];

    await api
        .delete(`/api/recipes/${recipeToDelete.id}`)
        .expect(204);

    const endRecipes = await helper.recipesInDb();

    expect(endRecipes).toHaveLength(helper.initialRecipes.length - 1);

    const titles = endRecipes.map(r => r.title);

    expect(titles).not.toContain(recipeToDelete.title);
});


afterAll(async () => {
    await mongoose.connection.close();
});