/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('food_table',function(table) {
    table.increments('id');
    table.primary('id')
    table.bigInteger('fdc_id');
    table.string('data_type');
    table.text('description');
    table.text('food_category_id').defaultTo(null);
    table.dateTime('publication_date');
    table.string('market_country',20);
    table.text('trade_channel').defaultTo(null);
    table.text('microbe_data');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('food_table');
};