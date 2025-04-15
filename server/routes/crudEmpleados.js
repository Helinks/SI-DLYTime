const express = require("express");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const db = require("../Config/db");


/* Consulta los Usuarios que son empleados  */
router.get("/consultaEmpleado", (req, res) => {
 
   const buscarfiltro = req.query.q;


    let consulta = `select p.*, td.nombre AS idTipoIdentificacion, ep.nombre AS estadoPersona, g.nombre As idGenero from persona p  
        inner join tipoidentificacion td on p.idTipoIdentificacion = td.idTipoIdentificacion
        inner join estadopersona ep on  ep.idEstado = p.idEstadoPersona 
        inner join genero g on g.idGenero = p.idGenero
        where idrol = 2 `
     
const params = [];

        if (buscarfiltro){
            consulta+=` and p.numeroDocumento like ? `
            params.push(`%${buscarfiltro}%`)
        }

    db.query(consulta,params, (err, result) => {
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
    const idRol = 2;
    const idTipoIdentificacion = req.body.idTipoIdentificacion;
    const Nombres = req.body.Nombres;
    const Apellidos = req.body.Apellidos;
    const idGenero = req.body.idGenero;
    const correo = req.body.correo;
    const clave = req.body.clave;
    const telefono = req.body.telefono;
    const estado = req.body.idEstadoPersona;

    console.log(
        numeroDocumento,
        idRol,
        idTipoIdentificacion,
        Nombres,
        Apellidos,
        idGenero,
        correo,
        telefono,
        clave,
        estado);


    try {
        const hashedPassword = await bcryptjs.hash(clave, 10);
        db.query(
            "SELECT numeroDocumento, correo FROM persona WHERE numeroDocumento = ? or correo = ?",
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

                // Guardar el usuario en la base de datos
                db.query(
                    "INSERT INTO persona (numeroDocumento, idRol, idTipoIdentificacion, Nombres, Apellidos, idGenero, correo, telefono , clave, idestadoPersona) VALUES (?,?,?,?,?,?,?,?,?,?)",
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
    const nombres = req.body.Nombres;
    const apellidos = req.body.Apellids;
    const idGenero = req.body.idGenero;
    const correo = req.body.correo;
    const telefono = req.body.telefono;
    const estado = req.body.idEstadoPersona;
    db.query(
        "UPDATE persona SET idTipoIdentificacion = ?, Nombres = ?, Apellidos = ?, idGenero = ?, correo = ?, telefono = ?, idEstadoPersona = ? WHERE numeroDocumento = ? ",
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
