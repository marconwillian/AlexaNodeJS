// Update with your config settings.

import dotenv from 'dotenv';

dotenv.config();

export default {
  dev: {
    client: 'mysql',
    connection: {
      host: process.env.PAGPRO_DB_HOST,
      user: process.env.PAGPRO_DB_USER,
      database: process.env.PAGPRO_DB_DATABASE,
      password: process.env.PAGPRO_DB_PASS
    },
    migrations: {
      directory: './src/database/migrations'
    }
  },
  test: {
    client: 'mysql',
    connection: {
      host: '51.79.72.47',
      user: 'storefyt_mw_dev',
      database: 'storefyt_development',
      password: 'aTpAvjg2lG4c'
    },
    migrations: {
      directory: './src/database/migrations'
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host: process.env.PAGPRO_DB_HOST,
      user: process.env.PAGPRO_DB_USER,
      database: process.env.PAGPRO_DB_DATABASE,
      password: process.env.PAGPRO_DB_PASS
    },
    migrations: {
      directory: './src/database/migrations'
    }
  }
};
