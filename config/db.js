const mysql = require('mysql')


const db = mysql.createPool({
  host: 'databasedlytime.mysql.database.azure.com',
  user: 'administrador',
  password: '123123Ge.',
  database: 'dlyTime',
  port: 3306,
  ssl: {
    rejectUnauthorized: true
  }
})

module.exports = db
