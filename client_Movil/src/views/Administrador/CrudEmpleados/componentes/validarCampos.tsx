import Personas from '../../../../types/persona';

export const validarCampos = (personaSeleccionada: Personas | null) => {

    if (!personaSeleccionada) {
        return true;
    }

    if (personaSeleccionada.numeroDocumento == 0 || !personaSeleccionada.Nombres || !personaSeleccionada.Apellidos || !personaSeleccionada.numeroDocumento ||
        personaSeleccionada.idGenero == 0 || !personaSeleccionada.correo || !personaSeleccionada.clave || personaSeleccionada.idEstadoPersona == 0) {
        alert('Por favor, complete todos los campos requeridos.');
        return true;
    }

    if (personaSeleccionada.numeroDocumento.toString().length > 10) {
        alert('Limite de digitos superado. Digitar un maximo de 10 digitos en Número de documento');
        return true;
    }

    if (true) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const hola = emailRegex.test(personaSeleccionada.correo);
        if (hola === false) {
            alert("Por favor cumplir con los requisitos -@- y -.-")
            return true;
        }

    }

    const require = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (require.test(personaSeleccionada?.clave) === false) {
        alert("Contraseña inválida. Debe contener al menos una mayúscula, un número y tener mínimo 8 caracteres.");
        return true;
    }


}

