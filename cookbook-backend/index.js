const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')

const Recipe = require('./models/recipe')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))


app.get('/', (request, response) => {
  response.send('<h1>Server is working</h1>')
})

app.get('/api/recipes', (request, response) => {
  Recipe.find({})
  .then(recipes => {
    response.json(recipes)
  })
})

app.post('/api/recipes', (request, response) => {
  const body = request.body

  if (!body || body.title === undefined) {
    return response.status(400).json({ error: 'Title is missing'});
  }

  const recipe = new Recipe({
    title: body.title,
    ingredients: body.ingredients,
    method: body.method,
    cookingTime: body.cookingTime
  })

  recipe.save().then(savedRecipe => {
    response.json(savedRecipe)
  })
})

app.get('/api/recipes/:id', (request, response) => {
    const id = request.params.id;

    Recipe.findById(id)
    .then(recipe => {
      response.json(recipe)
    })
  })

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})