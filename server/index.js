const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcryptjs = require("bcryptjs");

/* Esto es de prueba de la api */
const nodemailer = require("nodemailer");
/* asta aqui */

app.use(cors());
app.use(express.json()); /*Se transforma los datos a json*/

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dlytime",
});



/*Función para registrar los Usuarios */
app.post("/registro", async (req, res) => {
    const numeroDocumento = req.body.numeroDocumento;
    const idRol = req.body.idRol;
    const idTipoIdentificacion = req.body.idTipoIdentificacion;
    const Nombres = req.body.nombre;
    const Apellidos = req.body.apellido;
    const idGenero = req.body.idGenero;
    const correo = req.body.correo;
    const clave = req.body.clave;
    const estado = false;

    /*Encriptación de contraseña al momento de guardarlo en la base de datos (método bcryptjs)*/
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
app.post("/login", async (req, res) => {
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
                    app.get("/login/rol", (req, res) => {
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

/* Crud Empleados */
/* Consulta los Usuarios que son empleados  */
app.get("/crud_empleados_referencia", (req, res) => {
    db.query("select * from persona where idRol = 2", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

/* Agregar Nuevos empleados */
app.post("/Crud_empleado_Registrar", async (req, res) => {
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
    } catch (error) {
        res.status(500).send("Error al encriptar la contraseña");
    }
});

/* Actualizar Empleado */
app.patch("/ActualizarEmpleado", async (req, res) => {
    const numeroDocumento = req.body.numeroDocumento;
    const idTipoIdentificacion = req.body.idTipoIdentificacion;
    const nombres = req.body.nombre;
    const apellidos = req.body.apellido;
    const idGenero = req.body.idGenero;
    const correo = req.body.correo;
    const telefono = req.body.telefono;
    const estado = req.body.estadoPersona;

    console.log("funciona");

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

/* Fin del Crud Empleados */

/* Crud CLientes */
/* Consultar clientes (usuarios con rol de cliente) */
app.get("/crud_clientes_referencia", (req, res) => {
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
app.post("/agregar_cliente", (req, res) => {
    const { numeroDocumento, idTipoIdentificacion, Nombres, Apellidos, correo, telefono, idGenero, estadoPersona } = req.body;
    const idRol = 1; // Cliente tiene idRol 1

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
app.put("/editar_cliente", (req, res) => {
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

/* Fin Del crud Clientes */

/* Prueba de Api de enviar correos */
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "dlytime987@gmail.com", /* Correo */
        pass: "cvqn rxuh gkif quww", /* Contraseña de Aplicacion  */
    },
});

app.post("/Enviar-correo", async (req, res) => {
    const { to, subject } = req.body;

    try {
        /*  Generar un código de 6 dígitos */
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        /*  Establecer tiempo de expiración (1 hora) */
        const expires = new Date(Date.now() + 3600 * 1000);

        await db.query(
            "UPDATE persona SET reset_code = ?, reset_expires = ? WHERE correo = ?",
            [code, expires, to]
        );

        const mailOptions = {
            from: "dlytime987@gmail.com",
            to, /*  Dirección proporcionada por el usuario */
            subject, /*  Asunto del correo  */
            text: `Hola, has solicitado restablecer tu contraseña. Contáctanos si necesitas más ayuda. Este es tu codigo de restablecimiento: ${code}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                console.log(mailOptions);
                return res.status(500).send("Error enviando el correo");
            }
            res
                .status(200)
                .send("Correo enviado con éxito, Ingresar código temporal enviado.");
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al enviar el código.");
    }
});

app.post("/validar-codigo", async (req, res) => {
    const correo = req.body.correo;
    const codigo = req.body.code;

    try {
        /*  Verificar el codigo y la fecha de expiracion */
        db.query(
            "SELECT reset_expires FROM persona WHERE correo = ? AND reset_code = ?",
            [correo, codigo],
            (err, result) => {
                if (err) {
                    console.log("no funciona");
                } else {
                    console.log(result);
                }

                if (result.length === 0) {
                    return res
                        .status(400)
                        .send("Código inválido o correo no registrado.");
                }

                /* Validar si el codigo ha expirado */
                const resetExpires = new Date(result[0].reset_expires);
                if (Date.now() > resetExpires) {
                    return res.status(400).send("El código ha expirado.");
                }

                /*  Si todo esta correcto, enviar respuesta positiva */
                return res.status(200).json({ valid: true });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al validar el código.");
    }
});

app.patch("/CambiaContrasena", async (req, res) => {
    const correo = req.body.correo;
    const password = req.body.password;
    const codigo = req.body.codigo;

    const hashedPassword = await bcryptjs.hash(password, 10);
    db.query(
        "UPDATE persona SET clave = ?  where correo = ? and reset_code = ?",
        [hashedPassword, correo, codigo]
    );
});

/* Fin de la Prueba de enviar correos  */

/* Comienzo del Crud Citas  */
app.get("/crudCita", (req, res) => {
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

app.patch("/updateCita", (req, res) => {
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

app.listen(3001, () => {
    console.log("Puerto en funcionamiento 3001");
});
