const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../Config/db");

const SECRET_KEY = "joan123";
let atemps = 0;

/*Función para registrar los Usuarios */
router.post("/registro", async (req, res) => {
    const {
        numeroDocumento,
        idRol,
        idTipoIdentificacion,
        nombre: Nombres,
        apellido: Apellidos,
        idGenero,
        correo,
        clave
    } = req.body;
    const estado = 1;

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcryptjs.hash(clave, 10);

        // Verificar si el número de documento o correo ya existen
        db.query(
            "SELECT numeroDocumento, correo FROM persona WHERE numeroDocumento = ? OR correo = ?",
            [numeroDocumento, correo],
            (err, result) => {
                if (err) {
                    console.error("Error en la consulta de verificación:", err);
                    return res.status(500).json({ message: "Error interno del servidor." });
                }

                if (result.length > 0) {
                    // Verifica si hay registros
                    return res.json({ exists: true, message: "El número de documento o correo ya existe." });
                }

                db.query(
                    "INSERT INTO persona (numeroDocumento, idRol, idTipoIdentificacion, Nombres, Apellidos, idGenero, correo, clave, idEstadoPersona) VALUES (?,?,?,?,?,?,?,?,?)",
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
                            console.error("Error al registrar el empleado:", err);
                            return res.status(500).json({ message: "Error al registrar el empleado." });
                        }

                        // Enviar respuesta de éxito
                        res.status(201).json({ message: "Empleado registrado con éxito." });
                    }
                );
            }
        );
    } catch (error) {
        console.error("Error al encriptar la contraseña:", error);
        res.status(500).json({ message: "Error al procesar la solicitud." });
    }
});


/* Validar Ingreso de Iniciar sesión y Crea una Sesión */
router.post("/login", async (req, res) => {
    const correo = req.body.correo_i;


    db.query(
        "SELECT clave, idRol, idEstadoPersona, block_account, numeroDocumento FROM persona WHERE correo = ?",
        [correo],
        async (err, result) => {
            if (err) {
                return res.status(500).send("Error en la consulta de la base de datos");
            }

            if (result.length > 0) {
                if(result[0].idEstadoPersona == 3 && new Date(result[0].block_account) > new Date()){
                    return res.status(401).json({ message: "Cuenta bloqueada, intentelo más tarde: "+(Math.ceil((new Date(result[0].block_account) - new Date()) / 60000))+" Minutos"});
                };

                if (atemps >= 10) {

                    const timeBlock = new Date(Date.now() + 600 * 1000);

                    db.query("UPDATE persona SET idEstadoPersona = 3, block_account = ? WHERE correo = ?", [timeBlock,correo],
                        async (err, result) => {
                            if (err) {
                                return res.status(500).send("Error en la consulta de la base de datos");
                            }
                        });
                    atemps = 0;
                    return res.status(401).json({ message: "Limite de intentos cumplidos"});

                }

                const hashedPassword = result[0].clave;
                const isPasswordValid = await bcryptjs.compare(req.body.password_i, hashedPassword);

                if (isPasswordValid) {
                    const rol = result[0].idRol;
                    const id = result[0].numeroDocumento;
                    // Crear el token con rol incluido
                    const token = jwt.sign({ correo, rol,id }, SECRET_KEY, { expiresIn: "1h" });

                    atemps = 0;

                    
                    db.query("UPDATE persona SET idEstadoPersona = 1 WHERE correo = ?", [correo],
                        async (err, result) => {
                            if (err) {
                                return res.status(500).send("Error en la consulta de la base de datos");
                            }
                        });

                    return res.status(200).json({
                        token,
                        rol,
                        id,
                        message: "Inicio de sesión exitoso",
                    });
                } else {
                    atemps++
                    return res.status(401).json({ message: "Correo o contraseña incorrecta" });
                }
            } else {
                atemps++
                return res.status(404).json({ message: "Correo o contraseña incorrecta" });
            }
        }
    );
});

module.exports = router;