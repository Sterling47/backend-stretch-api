/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
    return knex.schema.createTable('branded_food_table', function(table) {
        table.increments('id');
        table.primary('id','fdc_id');
        table.bigInteger('fdc_id');
        table.unique('fdc_id');
        table.string('brand_owner');
        table.string('brand_name').defaultTo(null);
        table.string('subbrand_name').defaultTo(null);
        table.string('gtin_upc');
        table.text('ingredients');
        table.text('not_a_significant_source_of').defaultTo(null);
        table.varchar('serving_size',30);
        table.string('serving_size_unit');
        table.text('household_serving_fulltext').defaultTo(null);
        table.string('branded_food_category');
        table.string('data_source');
        table.string('package_weight').defaultTo(null);
        table.varchar('modified_date', 50);
        table.varchar('available_date', 50);
        table.varchar('discontinued_date').defaultTo(null);
        table.string('market_country',30);
        table.string('preparation_state_code').defaultTo(null);
        table.text('short_description').defaultTo(null);
        table.text('trade_channel').defaultTo(null);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('branded_food_table');
};
