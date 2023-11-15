const recipesRouter = require('express').Router();
const Recipe = require('../models/recipe');


recipesRouter.get('/', (_request, response, next) => {
    Recipe.find({})
        .then(recipes => {
            response.json(recipes);
        })
        .catch(error => next(error));
});

recipesRouter.post('/', (request, response, next) => {
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

    recipe.save()
        .then(savedRecipe => {
            response.json(savedRecipe);
        })
        .catch(error => next(error));
});

recipesRouter.get('/:id', (request, response, next) => {
    const id = request.params.id;

    Recipe.findById(id)
        .then(recipe => {
            if (recipe) {
                response.json(recipe);
            } else {
                response.status(404).end();
            }
        })
        .catch (error => next(error));
});


recipesRouter.delete('/:id', (request, response, next) => {
    const id = request.params.id;

    Recipe.findByIdAndDelete(id)
        .then(_result => {
            response.status(204).end();
        })
        .catch(error => next(error));
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