import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const development = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST_DEV,
    port: 3306,
    user: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: 'iu_dev',
  },
});

const production = knex({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'daniel',
    password: '',
    database: 'iu_dev',
  },
});

export const db =
  process.env.NODE_ENV === 'development' ? development : production;
