const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const Recipe = require('./models/recipe');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_TEST_URI;

mongoose.connect(url);


const recipe = new Recipe({
    title: 'Test recipe 2',
    ingredients: ['Test ingredient 2'],
    method: 'Testing method 2',
    cookingTime: '20'
});

recipe.save().then(_result => {
    console.log('recipe saved!');
    mongoose.connection.close();
});