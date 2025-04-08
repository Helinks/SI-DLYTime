const express = require("express");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const db = require("../Config/db");
const multer = require("multer"); // Añadido para insertar archivos localmente y en base de datos
const path = require("path");
const fs = require("fs");  // Añadido para leer archivos en el servidor

// Configuración de multer para el manejo de archivos PDF
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define la carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para evitar sobrescribir archivos
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },  // Limitar el tamaño de los archivos a 10 MB
}).single('archivoPDF');  // El nombre del campo del formulario será 'archivoPDF'

// Ruta para agregar historial clínico (con archivo PDF)
router.post("/agregarHistorialClinico", upload, (req, res) => {
    console.log(req.body); // Verifica los datos que estás recibiendo
    console.log(req.file);  // Verifica el archivo que se ha subido

    const { numeroDocumento, descripcion } = req.body;
    
    if (!req.file) {
        return res.status(400).send("No se ha enviado un archivo PDF.");
    }

    if (!numeroDocumento || !descripcion) {
        return res.status(400).send("Todos los campos son obligatorios.");
    }

    // Realizamos la consulta para guardar el historial clínico
    const archivoPDF = req.file.filename;  // Usamos el nombre del archivo en lugar del contenido binario

    const query = "INSERT INTO clientes_historial (numeroDocumento, descripcion, archivoPDF) VALUES (?, ?, ?)";
    db.query(query, [numeroDocumento, descripcion, archivoPDF], (err, result) => {
        if (err) {
            console.error("Error al guardar historial clínico:", err);
            return res.status(500).send("Error al guardar historial clínico.");
        }
        res.send("Historial clínico agregado con éxito.");
    });
});

// Ruta para consultar historiales clínicos de un cliente
router.get("/consultaHistorialClinico/:numeroDocumento", (req, res) => {
    const { numeroDocumento } = req.params;

    // Consultar los historiales clínicos asociados al cliente
    db.query(
        "SELECT * FROM clientes_historial WHERE numeroDocumento = ?",
        [numeroDocumento],
        (err, result) => {
            if (err) {
                console.error("Error al obtener el historial clínico:", err);
                res.status(500).send("Error al obtener el historial clínico");
            } else {
                res.send(result);
            }
        }
    );
});

// Las rutas para manejar clientes permanecen igual
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

/* Función nueva: Actualizar solo el estado del cliente */
router.put("/actualizarEstadoCliente", (req, res) => {
    const { numeroDocumento, idTipoIdentificacion, estadoPersona } = req.body;

    // Validación de que los campos no estén vacíos
    if (!numeroDocumento || !idTipoIdentificacion || estadoPersona === undefined) {
        return res.status(400).send("Todos los campos son obligatorios.");
    }

    // Asegurarse de que 'estadoPersona' es 1 (activo) o 0 (inactivo)
    const estado = estadoPersona === true ? 1 : 0;

    db.query(
        "UPDATE persona SET estadoPersona = ? WHERE numeroDocumento = ? AND idTipoIdentificacion = ?",
        [estado, numeroDocumento, idTipoIdentificacion],
        (err, result) => {
            if (err) {
                console.error("Error al actualizar el estado del cliente:", err);
                res.status(500).send("Error al actualizar el estado del cliente");
            } else {
                if (result.affectedRows === 0) {
                    return res.status(404).send("Cliente no encontrado para actualizar el estado");
                }
                res.send("Estado del cliente actualizado con éxito");
            }
        }
    );
});

/* Función original: Editar toda la información del cliente */
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