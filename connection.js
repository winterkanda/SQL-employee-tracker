const mysql = require('mysql');

// Connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // {TODO: Add your MySQL password}
      password: 'rambo123',
      database: 'employee_tracker'
    },
    console.log(`Connected to the employee_tracker database.`)
);

  module.exports = connection