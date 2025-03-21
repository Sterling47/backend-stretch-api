const express = require('express');
const PORT = process.env.PORT || 3001 ;
const knex = require('./knex/knex.js')
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const cors = require('cors');
app.use(cors());

app.get('/foodnames', async (req,res) => {
    try {
        const foodCategory = await database('branded_food_table as b')
            .join('food_table as f', 'b.fdc_id', 'f.fdc_id')
            .select('b.fdc_id', 'b.brand_name', 'b.ingredients', 'b.serving_size', 
                'b.serving_size_unit', 
                'b.branded_food_category', 
                'f.description')
                .orderBy('b.fdc_id', 'asc')
                .limit(50)
            
            .whereRaw('f.fdc_id = b.fdc_id')
            res.status(200).json(foodCategory)
    } catch(error) {
        res.status(500).json({error})
    } 
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})
