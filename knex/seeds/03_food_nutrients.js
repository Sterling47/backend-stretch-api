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
    .createReadStream(`csv/food_nutrient/food_nutrient_${i}.csv`)
    .pipe(parse({relax_quotes: true, from_line: 2, skip_records_with_error: true, skip_records_with_empty_values: true}));
  parser.on('readable', function(){
    let record; while ((record = parser.read()) !== null) {
      records.push(record);
    }
  });
  await finished(parser);
  return records;
};

exports.seed = async function(knex) {
  try {
    await knex('food_nutrient_table').del();
    for (var i = 1; i < 52; i++) {
      let records = await processFile(i);
      const foodNutrients = records.map(record => {
        return {id:record[0], fdc_id:record[1], nutrient_id:record[2], amount:record[3], data_points:record[4],
          derivation_id:record[5], min:record[6], max:record[7], median:record[8], footnote:record[9], min_year_acquired:record[10]
        }
        });
      await knex.transaction(async function (tr) {
        let i, chunk = 1000;
        for (i = 0; i < foodNutrients.length; i += chunk) {
          let rowsToInsert = foodNutrients.slice(i, i + chunk);
          await knex.batchInsert('food_nutrient_table', ('id',rowsToInsert));
        }
      })
      }
    }
  
  catch (error) {
    console.log(`Error seeding data: ${error}`)
  };
}

