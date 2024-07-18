// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
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

