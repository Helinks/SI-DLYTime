const express = require("express");
const router = express.Router();
const db = require("../Config/db");



/* API INTERNA Enviar correos */
const nodemailer = require("nodemailer"); 
/* Hasta aqui */

/* Prueba de Api de enviar correos */
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "dlytime987@gmail.com", /* Correo */
        pass: "cvqn rxuh gkif quww", /* Contraseña de Aplicacion  */
    },
});

router.post("/enviarCorreo", async (req, res) => {
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

module.exports = router;