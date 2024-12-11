const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());

// Hacer que los archivos en la carpeta 'uploads' sean accesibles desde el navegador
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = require("./Config/db"); // Conexión a la base de datos

// Rutas
const recuperar = require("./routes/recuperarPassword"); // Gestión de validación y recuperación de contraseña
app.use("/recuperarPassword", recuperar);
const autenticacion = require("./routes/autenticacion"); // Autenticación y Registro 
app.use("/autenticacion", autenticacion);
const enviarCorreo = require("./API's/enviarCorreo"); // API Interna Enviar Correos
app.use("/enviarCorreo", enviarCorreo);
const crudEmpleados = require("./routes/crudEmpleados"); // Crud Empleados 
app.use("/crudEmpleados", crudEmpleados);
const crudClientes = require("./routes/crudClientes"); // Crud Clientes
app.use("/crudClientes", crudClientes);
const crudCitas = require("./routes/crudCitas"); // Crud Citas
app.use("/crudCitas", crudCitas);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
