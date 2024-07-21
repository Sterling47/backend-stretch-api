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
    .createReadStream('csv/nutrient.csv')
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
    let records = await processFile();
    await knex('nutrient_table').del();
    const nutrients = records.map(record => {
      return {id:record[0], name:record[1], unit_name:record[2], nutrient_nbr:record[3], rank:record[4]}
    });
    await knex.transaction(async function (tr) { 
      let i, chunk = 1000;
      for (i = 0; i < nutrients.length; i += chunk) {
        let rowsToInsert = nutrients.slice(i, i + chunk);
        await knex.batchInsert('nutrient_table', ('id',rowsToInsert));
      }
    })
  }
  catch (error) {
    console.log(`Error seeding data: ${error}`)
  };
}

