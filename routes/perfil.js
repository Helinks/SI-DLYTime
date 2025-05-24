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

router.patch("/updateUsuario", async(req, res) => {
    const id = req.body.numeroDocumento;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const telefono = req.body.telefono;
    const password = req.body.password;

    const hashedPassword = await bcryptjs.hash(password, 10);

    db.query(`UPDATE persona SET Nombres = ?, Apellidos= ?, telefono = ?, clave=? WHERE numeroDocumento = ?`, [nombre, apellido, telefono, hashedPassword, id],
        (err, result) => {

            if (err) return res.status(500).send("Error actualizando datos");

            if (result.affectedRows == 0) return res.status(404).send('Usuario no encontrado');

            res.status(200).json({ message: "Datos actualizados"});

        });
})

router.patch("/updateUsuarioAdmin", async(req, res) => {
    const id = req.body.numeroDocumento;
    const password = req.body.password;

    const hashedPassword = await bcryptjs.hash(password, 10);

    db.query(`UPDATE persona SET clave=? WHERE numeroDocumento = ?`, [hashedPassword, id],
        (err, result) => {

            if (err) return res.status(500).send("Error actualizando datos");

            if (result.affectedRows == 0) return res.status(404).send('Usuario no encontrado');

            res.status(200).json({ message: "Datos actualizados"});

        });
})

/* Fin del crud Citas */

module.exports = router;