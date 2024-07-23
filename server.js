const express = require('express');
const PORT = process.env.PORT || 3001 ;
const knex = require('./knex/knex.js')
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const {parse} = require('csv-parse');
const fs = require('node:fs');
const {finished} = require('stream/promises');


app.get('/foodcategory/:id', async (req,res) => {
    try {
        const foodCategory = await database('branded_food_table as b').select('b.fdc_id', 'b.brand_name', 'b.ingredients', 'b.serving_size', 'b.serving_size_unit', 'b.branded_food_category')
            .where('b.fdc_id', '=', req.params.id)
            res.status(200).json(foodCategory.slice(0, 100))
    } catch(error) {
        res.status(500).json({error})
    } 
})


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})

// Columns: fdc_id, brand_name, 
//(from food_table) 
//description, ingredients, serving_size, serving_size_unit, branded_food_category