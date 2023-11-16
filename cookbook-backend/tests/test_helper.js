const Recipe = require('../models/recipe');
const User = require('../models/user');

const initialRecipes = [
    {
        title: 'Test recipe 1',
        ingredients: ['Test ingredient 1', 'Test ingredient 2'],
        method: 'Testing method 1',
        cookingTime: '10'
    },
    {
        title: 'Test recipe 2',
        ingredients: ['Test ingredient 2'],
        method: 'Testing method 2',
        cookingTime: '20'
    }
];

const nonExistingId = async () => {

    const recipe = new Recipe({
        title: 'To remove',
        ingredients: ['Test'],
        method: 'Testing',
        cookingTime: '10'
    });

    await recipe.save();
    await recipe.deleteOne();

    return recipe._id.toString();
};

const recipesInDb = async () => {
    const recipes = await Recipe.find({}).populate('user', { username: 1, name: 1 });
    return recipes.map(recipe => recipe.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
};

module.exports = {
    initialRecipes, nonExistingId, recipesInDb, usersInDb
};