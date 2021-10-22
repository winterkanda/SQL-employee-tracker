const mysql = require('mysql');
const dotenv = require("dotenv");
dotenv.config();

// Connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: process.env.DB_USER,
      // {TODO: Add your MySQL password}
      password: process.env.DB_PW,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the employee_tracker database.`)
);

  module.exports = connection