import Emailvalidation from '@everapi/emailvalidation-js'

const client = new Emailvalidation('ema_live_7rehNckD3mKmrQKF5f0vJSoj3fbJFUHYbqTlWWRL');

const validarEmail = async (email: string) => {
    try {
        const response = await client.info(email, { catch_all: 0 });
        return response.smtp_check;

    } catch (error) {
        console.error("Error al validar el correo:", error);
        return false;
    }
}

export default validarEmail;