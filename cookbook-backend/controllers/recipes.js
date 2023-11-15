const recipesRouter = require('express').Router();
const Recipe = require('../models/recipe');


recipesRouter.get('/', async (_request, response) => {
    const recipes = await Recipe.find({});
    response.json(recipes);
});

recipesRouter.post('/', async (request, response) => {
    const body = request.body;

    // if (!body || body.title === undefined) {
    //   return response.status(400).json({ error: 'Title is missing'});
    // }

    const recipe = new Recipe({
        title: body.title,
        ingredients: body.ingredients,
        method: body.method,
        cookingTime: body.cookingTime
    });

    const savedRecipe = await recipe.save();
    response.status(201).json(savedRecipe);
});

recipesRouter.get('/:id', async (request, response) => {
    const id = request.params.id;
    const recipe = await Recipe.findById(id);
    if (recipe) {
        response.json(recipe);
    } else {
        response.status(404).end();
    }
});


recipesRouter.delete('/:id', async (request, response) => {
    const id = request.params.id;
    await Recipe.findByIdAndDelete(id);
    response.status(204).end();
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