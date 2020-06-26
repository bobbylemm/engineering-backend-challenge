const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": "chidozienwoga",
    "password": null,
    "database": "driver_challenge",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "url": process.env.DATABASE_URL,
    "dialect": "postgres"
  }
}
