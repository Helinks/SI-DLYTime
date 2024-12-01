const express = require("express");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const db = require("../Config/db");

/* Comienzo del Crud Citas  */
router.get("/crudCita", (req, res) => {
    const query = `SELECT
    detalleCita.idCita,
    horario.fecha,
    horario.hora,
    CONCAT(horario.fecha,' ',horario.hora) AS fechaHora,
    CONCAT(p1.nombres,' ', p1.apellidos) AS nombreCliente,
    CONCAT(p2.nombres,' ', p2.apellidos) AS nombreEmpleado,
    tipoconsulta.nombre AS tipoConsulta,
    detalleCita.direccion,
    estadosCita.nombre AS estadoCita
    FROM cita
    INNER JOIN detallecita ON detallecita.idCita = cita.idCita
    INNER jOIN horario ON horario.idHorarios = detallecita.idHorarios
    INNER JOIN persona p1 ON cita.NumeroDocumentoCliente = p1.numeroDocumento
    INNER JOIN persona p2 ON cita.NumeroDocumentoOftalmologo = p2.numeroDocumento 
    INNER JOIN tipoconsulta ON tipoconsulta.idtipoConsulta = detallecita.idTipoConsulta
    INNER JOIN estadosCita ON estadosCita.idEstadocita = detallecita.idEstadoCita
    ORDER BY cita.idCita ASC;`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
        console.log(result);
    });
});

router.patch("/updateCita", (req, res) => {
    const estadoCita = req.body.estadoCita;
    const idCita = req.body.idCita;

    db.query(
        `UPDATE detallecita SET idEstadoCita = ? WHERE idCita = ?`,
        [estadoCita, idCita],
        (err, result) => {
            if (err) return res.status(500).send("Error en la consulta");

            if (result.affectedRows == 0)
                return res.status(404).send("Cita no encontrada");

            res.status(200).json({ message: "Estado cambiado", estadoCita, idCita });
        }
    );
});

/* Fin del crud Citas */

module.exports = router;