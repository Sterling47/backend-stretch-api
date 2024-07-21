/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('nutrient_table', function(table) {
    table.increments('id');
    table.primary('id');
    table.varchar('name', 100);
    table.string('unit_name',10);
    table.varchar('nutrient_nbr');
    table.varchar('rank');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('nutrient_table');
};
