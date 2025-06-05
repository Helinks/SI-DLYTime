const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const path = require("path");
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = require("./Config/db"); //Conexión a la base de datos

const miniConsulta = require("./routes/miniConsultaSelect"); // Gestión de consultas pequeñas como generos o tipos de ID
app.use("/miniConsultaSelect", miniConsulta);
const recuperar = require("./routes/recuperarPassword"); // Gestión de validación y recuperación de contraseña
app.use("/recuperarPassword", recuperar);
const autenticacion = require("./routes/autenticacion"); // Autenticación y Registro 
app.use("/autenticacion", autenticacion);
const enviarCorreo = require("./API's/enviarCorreo"); // API Interna Enviar Correos
app.use("/enviarCorreo", enviarCorreo);
const crudEmpleados = require("./routes/crudEmpleados"); // Crud Empleados 
app.use("/crudEmpleados", crudEmpleados);
const crudClientes = require("./routes/crudClientes"); // Crud CLientes
app.use("/crudClientes", crudClientes);
const crudCitas = require("./routes/crudCitas"); // Crud Citas
app.use("/crudCitas", crudCitas);
const perfiluser = require("./routes/perfil"); // Perfil usuario
app.use("/perfil", perfiluser);
const { swaggerUi, swaggerDocument } = require('./swagger/swagger');// Cargar el archivo swagger.js
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // http://localhost:3001/ api-docs

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
