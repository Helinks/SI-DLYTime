const mysql = require('mysql')

const db = mysql.createPool({
  host: 'mysqldatabaseserverdlytime.mysql.database.azure.com',
  user: 'administrador',
  password: '123123Ge.',
  database: 'dlyTime',
  port: 3306,
  ssl: { ca: fs.readFileSync('{ca-cert filename}') },
})

module.exports = db
