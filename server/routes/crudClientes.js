const express = require("express");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const db = require("../Config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
      // El nombre ya lo genera el frontend, solo lo usamos aquí directamente
      cb(null, file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    const extname = path.extname(file.originalname);
    if (extname !== ".pdf") {
      return cb(new Error("Solo se permiten archivos PDF"), false);
    }
    cb(null, true);
  };
  
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  });
  
  router.post("/agregarHistorialClinico", upload.single("archivoPDF"), (req, res) => {
    const { numeroDocumento } = req.body;
  
    if (!req.file) {
      return res.status(400).send("No se ha enviado un archivo PDF.");
    }
  
    const archivoNombre = req.file.filename;
  
    // 1. Obtener el último número consecutivo
    const countQuery = "SELECT COUNT(*) AS total FROM clientes_historial";
  
    db.query(countQuery, (err, result) => {
      if (err) {
        return res.status(500).send("Error al obtener el conteo de historiales.");
      }
  
      const nuevoNumero = result[0].total + 1;
      const descripcion = `Historial Clínico #${nuevoNumero}`;
  
      // 2. Insertar el nuevo historial
      const insertQuery = "INSERT INTO clientes_historial (numeroDocumento, descripcion, archivoPDF) VALUES (?, ?, ?)";
      db.query(insertQuery, [numeroDocumento, descripcion, archivoNombre], (err, result) => {
        if (err) {
          return res.status(500).send("Error al guardar historial clínico.");
        }
        res.send("Historial clínico agregado con éxito.");
      });
    });
  });
  
  
  // Ruta para obtener historial clínico
  router.get("/consultaHistorialClinico/:numeroDocumento", (req, res) => {
    const { numeroDocumento } = req.params;
    const query = "SELECT * FROM clientes_historial WHERE numeroDocumento = ?";
    db.query(query, [numeroDocumento], (err, result) => {
      if (err) {
        return res.status(500).send("Error al obtener historial clínico.");
      }
      res.json(result);
    });
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