// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require('dotenv').config()
module.exports = {
  development: {
    client: 'pg',

    connection: {
      host : 'localhost',
      user : 'postgres',
      password : process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  },

  staging: {
    client: 'postgresql',

    connection: {
      host: '127.0.0.1',  
      port: 5432,  
      user: 'postgres',  
      password: 'your-password',  
      database: 'postgres'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',  
      port: 5432,  
      user: 'postgres',  
      password: 'your-production-password',  
      database: 'postgres' 
    }
  }
};

