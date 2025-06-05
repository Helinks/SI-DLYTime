const mysql = require('mysql')


const db = mysql.createPool({
  host: 'databasedlytime.mysql.database.azure.com',
  user: 'Administrador',
  password: '123123KA.',
  database: 'dlyTime',
  port: 3306,
  ssl: {
    rejectUnauthorized: true
  }
})

module.exports = db
