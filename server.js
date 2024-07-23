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
        const foodCategory = await database('branded_food_table as b')
            .select('b.fdc_id', 'b.brand_name', 'b.ingredients', 'b.serving_size', 'b.serving_size_unit', 'b.branded_food_category')
            .where('b.fdc_id', '=', req.params.id)
            .join('food_table as f', 'b.fdc_id', 'f.fdc_id').select('b.fdc_id', 'b.brand_name', 'b.ingredients', 'b.serving_size', 'b.serving_size_unit', 'b.branded_food_category', 'f.description')
            .whereRaw('f.fdc_id = b.fdc_id')
            res.status(200).json(foodCategory.slice(0, 100))
    } catch(error) {
        res.status(500).json({error})
    } 
})

app.get('/nutrientCategory/:fdc_id', async (req, res) => {
    try {
        const nutrientCategory = await database('food_nutrient_table as fn')
        .select('fn.fdc_id', 'fn.nutrient_id','fn.id', 'fn.amount')
        .where('fn.fdc_id', '=', req.params.fdc_id)
        .join('nutrient_table as n', 'n.id', 'fn.nutrient_id')
        .select('fn.fdc_id', 'fn.nutrient_id','n.name', 'n.unit_name', 'fn.amount')
        .whereRaw('fn.nutrient_id = n.id')
        
        if(nutrientCategory.length === 0) {
            res.status(404).send('not matches found') 
        } else {
            res.status(200).json(nutrientCategory.slice(0,10))
        }
    } catch (error) {
        res.status(500).json({error})
    }
})

app.get('/api/food_categories', async (req,res) => {
    try {
        const distinctCategories = await database('branded_food_table')
        .select('branded_food_category').distinctOn('branded_food_category');
        let foodCategories = [];
        distinctCategories.forEach(foodCategory => {
            foodCategories.push(foodCategory.branded_food_category)
        })
        res.status(200).json(foodCategories);
    }
    catch (error) {
        res.status(500).json({error})
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})
