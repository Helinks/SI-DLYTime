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
    const descripcion = `Historial Clínico #${nuevoNumero} - ${numeroDocumento} - ${new Date().toLocaleDateString('es-ES')} - ${new Date().toLocaleTimeString('es-ES')}`;

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
router.get("/consultaCliente", (req, res) => {
  const buscarfiltro = req.query.q;

  let consulta = `
    SELECT 
      persona.*,
      genero.nombre AS nombreGenero,
      estadoPersona.nombre AS nombreEstado
    FROM persona
    JOIN genero ON persona.idGenero = genero.idGenero
    JOIN estadoPersona ON persona.idEstadoPersona = estadoPersona.idEstado
    WHERE idRol = 1

  `;

  const params = [];

  if (buscarfiltro) {
    consulta += ` AND persona.numeroDocumento LIKE ?`;
    params.push(`%${buscarfiltro}%`);
  }

  db.query(consulta, params, (err, result) => {
    if (err) {
      console.error("Error al consultar los clientes:", err);
      res.status(500).send("Error al consultar los clientes");
    } else {
      res.send(result);
    }
  });
});

/* Agregar cliente */
router.post("/agregarCliente", async (req, res) => {
  const numeroDocumento = req.body.numeroDocumento;
  const idRol = 1;
  const idTipoIdentificacion = req.body.idTipoIdentificacion;
  const Nombres = req.body.Nombres;
  const Apellidos = req.body.Apellidos;
  const idGenero = req.body.idGenero;
  const correo = req.body.correo;
  const clave = req.body.numeroDocumento;
  const telefono = req.body.telefono;
  const estado = req.body.estadoPersona;

  try {
    const hashedPassword = await bcryptjs.hash(clave, 10);

    db.query(
      "SELECT numeroDocumento, correo FROM persona WHERE numeroDocumento = ? OR correo = ?",
      [numeroDocumento, correo],
      (err, result) => {
        if (err) {
          console.error("Error en la verificación:", err);
          return res.status(500).json({ message: "Error interno del servidor." });
        }

        if (result.length > 0) {
          return res.json({ exists: true, message: "El número de documento o correo ya existe." });
        }

        db.query(
          "INSERT INTO persona (numeroDocumento, idRol, idTipoIdentificacion, Nombres, Apellidos, idGenero, correo, telefono, clave, idEstadoPersona) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [numeroDocumento, idRol, idTipoIdentificacion, Nombres, Apellidos, idGenero, correo, telefono, hashedPassword, estado],
          (err, result) => {
            if (err) {
              return res.status(500).send("Error al registrar el cliente");
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

/* Actualizar cliente */
router.patch("/actualizarCliente", (req, res) => {
  const numeroDocumento = req.body.numeroDocumento;

  // Crear un objeto para almacenar los campos que se van a actualizar
  const updates = {};

  // Si el campo está presente en el cuerpo de la solicitud, lo agregamos al objeto `updates`
  if (req.body.idTipoIdentificacion) {
    updates.idTipoIdentificacion = req.body.idTipoIdentificacion;
  }
  if (req.body.Nombres) {
    updates.Nombres = req.body.Nombres;
  }
  if (req.body.Apellidos) {
    updates.Apellidos = req.body.Apellidos;
  }
  if (req.body.idGenero) {
    updates.idGenero = req.body.idGenero;
  }
  if (req.body.correo) {
    updates.correo = req.body.correo;
  }
  if (req.body.telefono) {
    updates.telefono = req.body.telefono;
  }
  if (req.body.estadoPersona !== undefined) { // Aseguramos que `estadoPersona` sea explícito
    updates.idEstadoPersona = req.body.estadoPersona;
  }

  // Si no se enviaron datos a actualizar
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No se proporcionaron datos para actualizar." });
  }

  // Verificar si el correo ya existe para otro usuario
  if (req.body.correo) {
    db.query(
      "SELECT correo FROM persona WHERE correo = ? AND numeroDocumento != ?",
      [req.body.correo, numeroDocumento],
      (err, result) => {
        if (err) {
          console.error("Error en la verificación:", err);
          return res.status(500).json({ message: "Error interno del servidor." });
        }

        if (result.length > 0) {
          return res.json({ exists: true, message: "El correo ya está registrado por otra persona." });
        }

        // Si el correo no existe, actualizar la persona con los campos enviados
        updateCliente();
      }
    );
  } else {
    // Si no hay correo para verificar, solo actualizar
    updateCliente();
  }

  // Función para realizar la actualización con los campos definidos
  function updateCliente() {
    const query = "UPDATE persona SET ? WHERE numeroDocumento = ?";
    const params = [updates, numeroDocumento];

    db.query(query, params, (err, result) => {
      if (err) {
        console.error("Error al actualizar:", err);
        return res.status(500).json({ error: "Error al actualizar el cliente" });
      }

      return res.json({ success: true, message: "Se procesó correctamente." });
    });
  }
});


module.exports = router;