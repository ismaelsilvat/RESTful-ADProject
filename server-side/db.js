const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  "user": "postgres",
  "password": "ismael123",
  "host": "localhost",
  "port": 5432,
  "database": "postgres"
}); 

module.exports = pool;