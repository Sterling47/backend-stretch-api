/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
    return knex.schema.createTable('branded_food_table', function(table) {
        table.increments('id');
        table.primary('id','fdc_id');
        table.bigInteger('fdc_id');
        table.text('brand_owner');
        table.string('brand_name');
        table.string('subbrand_name');
        table.string('gtin_upc');
        table.text('ingredients');
        table.string('not_a_significant_source_of');
        table.float('serving_size');
        table.string('serving_size_unit');
        table.string('household_serving_fulltext');
        table.string('branded_food_category', 100);
        table.string('data_source');
        table.string('package_weight');
        table.varchar('modified_date', 50);
        table.varchar('available_date', 50);
        table.varchar('discontinued_date');
        table.string('market_country');
        table.string('preparation_state_code');
        table.string('short_description');
        table.string('trade_channel');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('branded_food_table');
};
