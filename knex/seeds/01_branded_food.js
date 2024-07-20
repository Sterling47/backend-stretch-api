/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const {parse} = require('csv-parse');
const fs = require('node:fs');
const {finished} = require('stream/promises');


const processFile = async (i) => {
  const records = [];
  const parser = fs
    .createReadStream(`csv/branded_food/branded_food${i}.csv`)
    .pipe(parse({relax_quotes: true, from_line: 2, skip_records_with_error: true, skip_records_with_empty_values: true}));
  parser.on('readable', function(){
    let record; while ((record = parser.read()) !== null) {
    // Work with each record
      records.push(record);
    }
  });
  await finished(parser);
  return records;
};

exports.seed = async function(knex) {
  try {
    await knex('branded_food_table').del()
    for (var i = 1; i < 11; i++) {
      let records = await processFile(1);
 
      const brandedFoodObjects = records.map(record => {
        return {fdc_id:record[0], brand_owner:record[1],brand_name:record[2], subbrand_name:record[3], gtin_upc:record[4], ingredients:record[5],
          not_a_significant_source_of:record[6], serving_size:record[7], serving_size_unit:record[8], household_serving_fulltext:record[9],
          branded_food_category:record[10], data_source:record[11], package_weight:record[12], modified_date:record[13], available_date:record[14],
          market_country:record[15], discontinued_date:record[16], preparation_state_code:record[17], trade_channel:record[18], short_description:record[19]}
        })
      await knex.transaction(async function (tr) {
        let i, chunk = 200;
        for (i = 0; i < brandedFoodObjects.length; i += chunk) {
          let rowsToInsert = brandedFoodObjects.slice(i, i + chunk);
          await knex.batchInsert('branded_food_table', ('id',rowsToInsert));
        }
      })
      }
    }
   
    
  catch (error) {
    console.log(`Error seeding data: ${error}`)
  }
}
