const express = require('express')
const app = express()
const environment = process.env.NODE_EV || 'development';
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

const PORT = process.env.PORT || 3000;

app.get('/api/v1/branded_food', async (request, response) => {
  try {
      const branded_food = await (await database('branded_food_table').select('id', 'brand_owner' )).slice(0, 25)
      response.status(200).json(branded_food)
  } catch(error) {
      response.status(500).json({error})
  }
})

app.get('/api/v1/branded_food/ingredients', async (request, response) => {
    try {
      const ingredients = (await database('branded_food_table').select('id', 'brand_owner', 'ingredients' )).slice(0, 250);
      response.status(200).json(ingredients);
    } catch(error) {
      response.status(500).json({ error });
    }
  });

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})