import knex from 'knex';

export const db = knex({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'daniel',
    password: '',
    database: 'iu_dev',
  },
});
