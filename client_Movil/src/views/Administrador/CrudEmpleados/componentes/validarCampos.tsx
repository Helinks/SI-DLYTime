import React from 'react'
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


}

