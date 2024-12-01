const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = require("./Config/db"); //Conexión a la base de datos

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


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});