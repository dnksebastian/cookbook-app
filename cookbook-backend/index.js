require('dotenv').config()

const express = require('express')
const app = express()

let recipes = ['example'];

app.get('/', (request, response) => {
  response.send('<h1>Server is working</h1>')
})

app.get('/api/recipes', (request, response) => {
  response.json(recipes)
})

app.get('/api/recipes/:id', (request, response) => {
    const id = request.params.id;
    const recipe = recipes.find(r => r.id === id);

    console.log(recipe);
    response.json(recipe)
  })

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})