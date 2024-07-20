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


app.get('/', async (req,res) => {
 
      res.status(500).json({error});

})
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})