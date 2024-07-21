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
    .createReadStream(`csv/food/food${i}.csv`)
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
    await knex('food_table').del();
    for (var i = 1; i < 21; i++) {
      let records = await processFile(i);
      const foodNames = records.map(record => {
        return {fdc_id:record[0], data_type:record[1], description:record[2], food_category_id:record[3], publication_date:record[4],
          market_country:record[5], trade_channel:record[6], microbe_data:record[7]}
        });
      await knex.transaction(async function (tr) {
        let i, chunk = 1000;
        for (i = 0; i < foodNames.length; i += chunk) {
          let rowsToInsert = foodNames.slice(i, i + chunk);
          await knex.batchInsert('food_table', ('id',rowsToInsert));
        }
      })
      }
    }
  
  catch (error) {
    console.log(`Error seeding data: ${error}`)
  };
}

