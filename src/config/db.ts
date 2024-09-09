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
    charset: 'utf8mb4',
  },
});

const production = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST_DEV,
    port: 3306,
    user: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: 'iu',
    charset: 'utf8mb4',
  },
});

export const db =
  process.env.NODE_ENV === 'development' ? development : production;
