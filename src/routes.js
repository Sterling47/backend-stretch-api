const express = require('express')
const app = express()
const environment = process.env.NODE_EV || 'development';
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {

})

app.get('/api/v1/branded_food_table', async (request, response) => {
  try {
      const branded_food = await database('branded_food_table').select('id', 'brand_owner' )
      response.status(200).json(branded_food)
  } catch(error) {
      response.status(500).json({error})
  }
})

  app.get('/api/v1/branded_food/ingredients', async (request, response) => {
    try {
      const ingredients = await database('branded_food_table').select('id', 'ingredients' );
      response.status(200).json(ingredients);
    } catch(error) {
      response.status(500).json({ error });
    }
  });