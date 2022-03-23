const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

//Convert pool object to promise based object
const promisePool = pool.promise();

module.exports = promisePool;