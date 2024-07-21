/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('food_nutrient_table', function(table) {
    table.bigInteger('id');
    table.primary('id');
    table.bigInteger('fdc_id');
    table.integer('nutrient_id');
    table.float('amount');
    table.varchar('data_points').defaultTo(null);
    table.varchar('derivation_id');
    table.varchar('min').defaultTo(null);
    table.varchar('max').defaultTo(null);
    table.varchar('median').defaultTo(null);
    table.varchar('footnote').defaultTo(null);
    table.varchar('min_year_acquired').defaultTo(null);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('food_nutrient_table');
};
