const express = require("express");
const router = express.Router();
const db = require("../Config/db");

router.get("/consultarIdentificacion", (req, res) => {

    let consulta = `select * from tipoIdentificacion`

    db.query(consulta, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

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


router.get("/consultarEstado", (req, res) => {

    let consulta = `select * from estadopersona`

    db.query(consulta, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;