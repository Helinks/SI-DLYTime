const express = require("express");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const db = require("../Config/db");


/* Consulta los Usuarios que son empleados  */
router.get("/consultaEmpleado", (req, res) => {
    db.query("select * from persona where idRol = 2", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

/* Agregar Nuevos empleados */
router.post("/agregarEmpleado", async (req, res) => {
    const numeroDocumento = req.body.numeroDocumento;
    const idRol = req.body.idRol;
    const idTipoIdentificacion = req.body.idTipoIdentificacion;
    const Nombres = req.body.nombre;
    const Apellidos = req.body.apellido;
    const idGenero = req.body.idGenero;
    const correo = req.body.correo;
    const clave = req.body.clave;
    const telefono = req.body.telefono;
    const estado = req.body.estadoPersona;

    try {
        const hashedPassword = await bcryptjs.hash(clave, 10);

        db.query(
            "SELECT numeroDocumento, correo FROM persona WHERE numeroDocumento = ? OR correo = ?",
            [numeroDocumento, correo],
            (err, result) => {
                if (err) {
                    console.error("Error en la consulta de verificación:", err);
                    return res.status(500).json({ message: "Error interno del servidor." });
                }

                console.log(result.length);

                if (result.length > 0) {
                    // Verifica si hay registros
                    return res.json({ exists: true, message: "El número de documento o correo ya existe." });
                }

                // Guardar el usuario en la base de datos
                db.query(
                    "INSERT INTO persona (numeroDocumento, idRol, idTipoIdentificacion, Nombres, Apellidos, idGenero, correo, telefono , clave, estadoPersona) VALUES (?,?,?,?,?,?,?,?,?,?)",
                    [
                        numeroDocumento,
                        idRol,
                        idTipoIdentificacion,
                        Nombres,
                        Apellidos,
                        idGenero,
                        correo,
                        telefono,
                        hashedPassword,
                        estado,
                    ], // Usamos hashedPassword en lugar de clave
                    (err, result) => {
                        if (err) {
                            return res.status(500).send("Error al registrar el empleado");
                        } else {
                            res.send(result);
                        }
                    }
                );
            }
        );
    } catch (error) {
        res.status(500).send("Error al encriptar la contraseña");
    }
});

/* Actualizar Empleado */
router.patch("/actualizarEmpleado", async (req, res) => {
    const numeroDocumento = req.body.numeroDocumento;
    const idTipoIdentificacion = req.body.idTipoIdentificacion;
    const nombres = req.body.nombre;
    const apellidos = req.body.apellido;
    const idGenero = req.body.idGenero;
    const correo = req.body.correo;
    const telefono = req.body.telefono;
    const estado = req.body.estadoPersona;

    db.query(
        "UPDATE persona SET idTipoIdentificacion = ?, Nombres = ?, Apellidos = ?, idGenero = ?, correo = ?, telefono = ?, estadoPersona = ? WHERE numeroDocumento = ? ",
        [
            idTipoIdentificacion,
            nombres,
            apellidos,
            idGenero,
            correo,
            telefono,
            estado,
            numeroDocumento,
        ],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send({ error: "Error al actualizar el empleado" });
            } else {
                res.send(result);
            }
        }
    );
});


module.exports = router;
/* Fin del Crud Empleados */
