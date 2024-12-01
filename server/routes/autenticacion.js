const express = require("express");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const db = require("../Config/db");



/*Función para registrar los Usuarios */
router.post("/registro", async (req, res) => {
    const numeroDocumento = req.body.numeroDocumento;
    const idRol = req.body.idRol;
    const idTipoIdentificacion = req.body.idTipoIdentificacion;
    const Nombres = req.body.nombre;
    const Apellidos = req.body.apellido;
    const idGenero = req.body.idGenero;
    const correo = req.body.correo;
    const clave = req.body.clave;
    const estado = false;

    /*Encriptación de contraseña (método bcryptjs)*/
    try {
        const hashedPassword = await bcryptjs.hash(clave, 10);
      /* Guardar el usuario en la base de datos */
        db.query(
            "INSERT INTO persona (numeroDocumento, idRol, idTipoIdentificacion, Nombres, Apellidos, idGenero, correo, clave, estadoPersona) VALUES (?,?,?,?,?,?,?,?,?)",
            [
                numeroDocumento,
                idRol,
                idTipoIdentificacion,
                Nombres,
                Apellidos,
                idGenero,
                correo,
                hashedPassword,
                estado,
            ], 
            (err, result) => {
                if (err) {
                    return res.status(500).send("Error al registrar el empleado");
                } else {
                    res.send("Empleado Registrado con éxito!!");
                }
            }
        );
    } catch (error) {
        res.status(500).send("Error al encriptar la contraseña");
    }
});

/* Validar Ingreso de Iniciar sesión  */
router.post("/login", async (req, res) => {
    const correo = req.body.correo_i;
    db.query(
        "SELECT clave FROM persona WHERE correo = ?",
        [correo],
        async (err, result) => {
            if (err) {
                return res.status(500).send("Error en la consulta de la base de datos");
            }

            if (result.length > 0) {
                const hashedPassword = result[0].clave;
                const isPasswordValid = await bcryptjs.compare(
                    req.body.password_i,
                    hashedPassword
                );
                if (isPasswordValid) {
                    router.get("/login/rol", (req, res) => {
                        db.query(
                            "SELECT idRol FROM persona WHERE correo = ?",
                            [correo],
                            (err, result) => {
                                res.send(result);
                            }
                        );
                    });
                    res.send(true);
                } else {
                    res.status(401).json({ message: "Correo o Contraseña incorrecta" });
                }
            } else {
                res.status(404).json({ message: "Correo o Contraseña incorrecta" });
            }
        }
    );
});

module.exports = router;