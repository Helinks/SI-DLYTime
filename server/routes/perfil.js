const express = require("express");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const db = require("../Config/db");


router.get('/datosUsuario',(req,res)=>{
    const query =`SELECT persona.numeroDocumento,
    persona.Nombres,
    persona.Apellidos, 
    genero.nombre AS genero,
    persona.correo,
    persona.telefono,
    persona.fechaNacimiento,
    persona.direccion 
    FROM persona 
    INNER JOIN genero ON genero.idGenero = persona.idGenero WHERE numeroDocumento = ?;`;

    const id =req.query.id 

    db.query(query,[id],(err,result)=>{
        if (err) {
            console.error(err);
            return ;
        }
        return res.json(result[0]);
    })
})
/* Fin del crud Citas */

module.exports = router;