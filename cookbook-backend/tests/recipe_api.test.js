const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('return recipes as json', async () => {
    await api
        .get('/api/recipes')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('there are two recipes', async () => {
    const response = await api.get('/api/recipes');

    expect(response.body).toHaveLength(2);
});

test('first recipe identified', async () => {
    const response = await api.get('/api/recipes');

    expect(response.body[0].title).toBe('Test recipe 1');
});


afterAll(async () => {
    await mongoose.connection.close();
});