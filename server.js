const express = require('express');
const PORT = process.env.PORT || 3001 ;
const knex = require('./knex/knex.js')
const cors = require('cors');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(cors());

app.get('/api/food_table', async (req,res) => {
    try {
        const food = await database('branded_food_table as b')
        .join('food_table as f', 'f.fdc_id', 'b.fdc_id')
        .select('b.fdc_id','b.brand_name','f.description','b.ingredients',
                'b.serving_size','b.serving_size_unit','b.branded_food_category')
        .whereRaw('b.fdc_id = f.fdc_id');
        res.status(200).json(food.slice(0,100000))
    }
    catch (error){
        res.status(500).json({error});
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
    console.log(`Current environment is: ${environment}`)
})