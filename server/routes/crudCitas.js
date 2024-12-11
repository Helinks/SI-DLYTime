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
    ORDER BY cita.idCita DESC;`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
        console.log(result);

    }

    )
});

router.get("/crudCitaCliente", (req, res) => {
    const id = req.query.id

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
    WHERE p1.numeroDocumento = ?
    ORDER BY cita.idCita DESC ;`;
    db.query(query,[id], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
        console.log(result);

    }

    )
});

router.post("/addCita", async (req, res) => {
    const cliente = req.body.NumeroDocumentoCliente;
    const oftalmologo = req.body.NumeroDocumentoOftalmologo;
    const idHorario = req.body.idHorario;
    const idTipoConsulta = req.body.idTipoConsulta;
    const direccion = "Cra. 78k #35A - 82sur, Bogotá";
    const estadoCita = 1;

    db.getConnection((err, connection) => {
        if (err) return res.status(500).send("Error al conectar con la base de datos");

        connection.beginTransaction(async (transErr) => {
            if (transErr) {
                connection.release();
                return res.status(500).send("Error al iniciar la transacción");
            }

            try {
                // Paso 1: Insertar un nuevo diagnóstico
                const descripcionDiagnostico = ""; // Valor predeterminado vacío
                const diagResult = await new Promise((resolve, reject) => {
                    connection.query(
                        'INSERT INTO diagnostico (descripcion) VALUES (?)',
                        [descripcionDiagnostico],
                        (error, results) => {
                            if (error) return reject(error);
                            resolve(results);
                        }
                    );
                });

                const idDiagnostico = diagResult.insertId; // ID del diagnóstico generado
                console.log("ID Diagnóstico:", idDiagnostico);

                // Paso 2: Actualizar el estado del horario
                const horarioQuery = 'UPDATE horario SET estadoHorario = 2 WHERE idHorarios = ?';
                const horarioResult = await new Promise((resolve, reject) => {
                    connection.query(horarioQuery, [idHorario], (error, results) => {
                        if (error || results.affectedRows === 0) return reject(new Error("Error al actualizar el horario"));
                        resolve(results);
                    });
                });

                console.log("Horario actualizado correctamente:", horarioResult);
                // Paso 3: Insertar la cita en Cita
                const CitaQuery = `
                 INSERT INTO cita ( NumeroDocumentoCliente, NumeroDocumentoOftalmologo)
                 VALUES (?, ?)
             `;
                const citaResult = await new Promise((resolve, reject) => {
                    connection.query(
                        CitaQuery,
                        [cliente, oftalmologo],
                        (error, results) => {
                            if (error) return reject(error);
                            resolve(results);
                        }
                    );
                });
                const idCita = citaResult.insertId;

                // Paso 4: Insertar la cita en detalleCita
                const detalleCitaQuery = `
                    INSERT INTO detalleCita (idCita,idDiagnostico, idHorarios, idTipoConsulta, idEstadoCita, direccion)
                    VALUES (?,?, ?, ?, ?, ?)
                `;
                await new Promise((resolve, reject) => {
                    connection.query(
                        detalleCitaQuery,
                        [idCita, idDiagnostico, idHorario, idTipoConsulta, estadoCita, direccion],
                        (error, results) => {
                            if (error) return reject(error);
                            resolve(results);
                        }
                    );
                });

                console.log("Cita agregada correctamente");

                // Confirmar la transacción
                await new Promise((resolve, reject) => {
                    connection.commit((commitErr) => {
                        if (commitErr) return reject(commitErr);
                        resolve();
                    });
                });

                res.status(201).send("Cita agregada exitosamente");
            } catch (error) {
                // Revertir la transacción en caso de error
                connection.rollback(() => {
                    res.status(500).send("Error durante la transacción: " + error.message);
                });
            } finally {
                // Liberar la conexión
                connection.release();
            }
        });
    });
});



router.patch("/cancelCita", (req, res) => {
    const estadoCita = req.body.estadoCita;
    const idCita = req.body.idCita;

    db.query(`UPDATE detallecita SET idEstadoCita = ? WHERE idCita = ?`, [estadoCita, idCita],
        (err, result) => {

            if (err) return res.status(500).send("Error en la consulta");

            if (result.affectedRows == 0) return res.status(404).send('Cita no encontrada');

            res.status(200).json({ message: "Estado cambiado", estadoCita, idCita });

        });
})

router.get("/getHorarios", (req, res) => {
    const fecha = req.query.fecha
    const query = `SELECT idHorarios AS id,hora FROM horario WHERE fecha=? && estadoHorario=1;`;
    db.query(query, [fecha], (err, result) => {
        if (err) {
            console.error(err);
        }
        res.send(result);
        console.log(result);

    })
})

router.get("/getEmpleados", (req, res) => {
    const query = `SELECT CONCAT(persona.Nombres,' ',persona.Apellidos )AS nombre, numeroDocumento FROM persona WHERE idRol = 2;`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
        }
        res.send(result);
        console.log(result);

    })
})

router.get("/getClientes", (req, res) => {
    const query = `SELECT CONCAT(persona.Nombres,' ',persona.Apellidos) AS nombre, numeroDocumento FROM persona WHERE idRol = 1 && numeroDocumento= ?;`;
    const numero = req.query.NumeroDocumentoCliente
    db.query(query, [numero], (err, result) => {
        if (err) {
            console.error(err);
        }
        res.send(result);
        console.log(result);

    })
})

router.get("/getTipoConsulta", (req, res) => {
    const query = `SELECT idtipoConsulta, nombre FROM tipoConsulta;`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
        }
        res.send(result);
        console.log(result);

    })
})

router.patch("/updateCita", async (req, res) => {

    const updateCitaQuery = `UPDATE detallecita SET idHorarios = ?, idTipoConsulta = ? WHERE idCita = ?`;
    const idCita = req.body.idCita;
    const idHorario = req.body.idHorario;
    const idTipoConsulta = req.body.idTipoConsulta;
    db.getConnection((err, connection) => {
        if (err) return res.status(500).send("Error al conectar con la base de datos");

        connection.beginTransaction(async (transErr) => {
            if (transErr) {
                connection.release();
                return res.status(500).send("Error al iniciar la transacción");
            }
            try {
                // Paso 1: Insertar un nuevo diagnóstico
                const updateResult = await new Promise((resolve, reject) => {
                    connection.query(
                        `UPDATE detallecita SET idHorarios = ?, idTipoConsulta = ? WHERE idCita = ?`,
                        [idHorario, idTipoConsulta, idCita],
                        (error, results) => {
                            if (error) return reject(error);
                            resolve(results);
                        }
                    );
                });

                // Paso 2: Actualizar el estado del horario
                const horarioQuery = 'UPDATE horario SET estadoHorario = 1 WHERE idHorarios = ?';
                const horarioResult = await new Promise((resolve, reject) => {
                    connection.query(horarioQuery, [idHorario], (error, results) => {
                        if (error || results.affectedRows === 0) return reject(new Error("Error al actualizar el horario"));
                        resolve(results);
                    });
                });

                console.log("Horario actualizado correctamente:", horarioResult);


                console.log("Cita actualizada correctamente");

                // Confirmar la transacción
                await new Promise((resolve, reject) => {
                    connection.commit((commitErr) => {
                        if (commitErr) return reject(commitErr);
                        resolve();
                    });
                });

                res.status(201).send("Cita agregada exitosamente");
            } catch (error) {
                // Revertir la transacción en caso de error
                connection.rollback(() => {
                    res.status(500).send("Error durante la transacción: " + error.message);
                });
            } finally {
                // Liberar la conexión
                connection.release();
            }
        });
    });
})

/* Fin del crud Citas */

module.exports = router;