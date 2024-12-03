const express = require("express");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const db = require("../Config/db");


router.post("/validarCodigo", async (req, res) => {
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
                    return res.status(400).send("Código inválido o correo no registrado.");
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

router.patch("/cambiarPassword", async (req, res) => {
    const correo = req.body.correo;
    const password = req.body.password;
    const codigo = req.body.codigo;

    const hashedPassword = await bcryptjs.hash(password, 10);
    db.query(
        "UPDATE persona SET clave = ?  where correo = ? and reset_code = ?",
        [hashedPassword, correo, codigo],(err,result) => {}
    );
});

module.exports = router;
