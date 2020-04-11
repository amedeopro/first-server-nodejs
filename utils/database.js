const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     database: 'node',
//     user: 'root',
//     password: '',
// });

// module.exports = pool.promise();