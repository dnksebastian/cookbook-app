const recipesRouter = require('express').Router();
const mongoose = require('mongoose');
const Recipe = require('../models/recipe');

recipesRouter.get('/', async (_request, response) => {
    const recipes = await Recipe.find({}).populate('user', { username: 1, name: 1 });
    response.json(recipes);
});

recipesRouter.post('/', async (request, response) => {
    const body = request.body;
    const user = request.user;

    console.log(request.body);
    console.log(request.user);

    if (!user) {
        return response.status(401).json({ error: 'User unauthorized' });
    }

    const recipe = new Recipe({
        title: body.title,
        ingredients: body.ingredients,
        method: body.method,
        cookingTime: body.cookingTime,
        user: user._id
    });

    const savedRecipe = await recipe.save();
    user.recipes = user.recipes.concat(savedRecipe._id);
    await user.save();

    response.status(201).json(savedRecipe);
});

recipesRouter.get('/:id', async (request, response) => {
    const id = request.params.id;
    const recipe = await Recipe.findById(id).populate('user', { username: 1, name: 1 });
    if (recipe) {
        response.json(recipe);
    } else {
        response.status(404).end();
    }
});


recipesRouter.delete('/:id', async (request, response) => {
    const id = request.params.id;
    const user = request.user;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({ error: 'Invalid recipe ID' });
    }

    const recipe = await Recipe.findById(id);

    if(!recipe) {
        return response.status(410).end();
    }

    if (user && recipe.user.toString() === user.id.toString()) {
        await Recipe.findByIdAndRemove(id);
        response.status(204).end();
    } else {
        response.status(401).json({ error: 'Deleting not possible - user unauthorized' });
    }
});

recipesRouter.put('/:id', (request, response, next) => {
    // const body = request.body;

    const { title, ingredients, method, cookingTime } = request.body;
    const id = request.params.id;

    const updatedRecipe = {
        title: title,
        ingredients: ingredients,
        method: method,
        cookingTime: cookingTime
    };

    Recipe.findByIdAndUpdate(id, updatedRecipe, { new: true, runValidators: true, context: 'query' })
        .then(receivedRec => {
            response.json(receivedRec);
        })
        .catch(error => next(error));
});


module.exports = recipesRouter;