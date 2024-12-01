const express = require("express");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const db = require("../Config/db");


/* Consultar clientes (usuarios con rol de cliente) */
router.get("/consultaCliente", (req, res) => {
    db.query("SELECT * FROM persona WHERE idRol = 1", (err, result) => {
        if (err) {
            console.error("Error al obtener los datos:", err);
            res.status(500).send("Error al obtener los datos");
        } else {
            res.send(result);
        }
    });
});

/* Agregar nuevos clientes */
router.post("/agregarCliente", (req, res) => {
    const { numeroDocumento, idTipoIdentificacion, Nombres, Apellidos, correo, telefono, idGenero, estadoPersona } = req.body;
    const idRol = 1;

    // Validación de que los campos no estén vacíos
    if (!numeroDocumento || !Nombres || !Apellidos || !correo || !telefono || !idGenero || estadoPersona === undefined) {
        return res.status(400).send("Todos los campos son obligatorios.");
    }

    db.query(
        "INSERT INTO persona (numeroDocumento, idRol, idTipoIdentificacion, Nombres, Apellidos, idGenero, correo, telefono, estadoPersona) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [numeroDocumento, idRol, idTipoIdentificacion, Nombres, Apellidos, idGenero, correo, telefono, estadoPersona],
        (err, result) => {
            if (err) {
                console.error("Error al añadir el cliente:", err);
                res.status(500).send("Error al añadir el cliente");
            } else {
                res.send("Cliente añadido con éxito");
            }
        }
    );
});

/* Editar información del cliente */
router.put("/actualizarCliente", (req, res) => {
    const { numeroDocumento, idTipoIdentificacion, Nombres, Apellidos, correo, telefono, idGenero, estadoPersona } = req.body;

    // Validación de que los campos no estén vacíos
    if (!numeroDocumento || !Nombres || !Apellidos || !correo || !telefono || !idGenero || estadoPersona === undefined) {
        return res.status(400).send("Todos los campos son obligatorios.");
    }

    db.query(
        "UPDATE persona SET Nombres = ?, Apellidos = ?, correo = ?, telefono = ?, idGenero = ?, estadoPersona = ? WHERE numeroDocumento = ? AND idTipoIdentificacion = ?",
        [Nombres, Apellidos, correo, telefono, idGenero, estadoPersona, numeroDocumento, idTipoIdentificacion],
        (err, result) => {
            if (err) {
                console.error("Error al actualizar el cliente:", err);
                res.status(500).send("Error al editar el cliente");
            } else {
                if (result.affectedRows === 0) {
                    return res.status(404).send("Cliente no encontrado para editar");
                }
                res.send("Cliente editado con éxito");
            }
        }
    );
});


module.exports = router;