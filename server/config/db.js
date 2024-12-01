const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dlytime",
});

db.connect((err)=>{
    if(err){
        console.error("Error a conectarse a la Base de datos: ",err.message)
        return;
    }
    console.log("Conexión Exitosa")
});

module.exports = db;