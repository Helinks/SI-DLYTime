const express = require("express");
const router = express.Router();
const db = require("../Config/db");

/* Consulta los Usuarios que son empleados  */
router.get("/consultarGenero", (req, res) => {

    let consulta = `select * from genero`

    db.query(consulta, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;