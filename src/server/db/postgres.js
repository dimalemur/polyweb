// eslint-disable-next-line spaced-comment
const pgp = require('pg-promise')();

const cn = {
  host: 'localhost', // server name or IP address;
  port: 5432,
  database: 'PD',
  user: 'postgres',
  password: '',
};

export const db = pgp(cn);

db.connect()
  .then((obj) => {
    const { database } = obj.client.connectionParameters;
    console.log('Postgres is connected to database: ', database);

    obj.done(); // success, release the connection;
  })
  .catch((error) => {
    console.log('ERROR:', error.message || error);
  });
