const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');


const Recipe = require('./models/recipe');

const app = express();


app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.get('/', (_request, response) => {
    response.send('<h1>Server is working</h1>');
});

app.get('/api/recipes', (_request, response, next) => {
    Recipe.find({})
        .then(recipes => {
            response.json(recipes);
        })
        .catch(error => next(error));
});

app.post('/api/recipes', (request, response, next) => {
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

app.get('/api/recipes/:id', (request, response, next) => {
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


app.delete('/api/recipes/:id', (request, response, next) => {
    const id = request.params.id;

    Recipe.findByIdAndDelete(id)
        .then(_result => {
            response.status(204).end();
        })
        .catch(error => next(error));
});

app.put('/api/recipes/:id', (request, response, next) => {
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


const unknownEndpoint = (_request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);


const errorHandler = (error, _request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted ID' });
    } else if (error.name === 'ValidationError') {
        console.log('here');
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});