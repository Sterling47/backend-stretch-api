const environment = process.env.environment || 'development'
const config = require('../knexfile.js')[environment];

module.exports = require('knex')(config);


