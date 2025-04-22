import React, {useState} from 'react'
import Persona from '../types/persona';

const useEmpleadoState = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [modoEdicion, setModoEdicion ] = useState(false)

    const [personas, setPersonas] = useState<Persona[]>([]);
    const [personaSeleccionada, setPersonaSeleccionada] = useState<Persona | null>(null);

    const [busqueda, setBusqueda] = useState('');

    return {
        modoEdicion, setModoEdicion,
        modalVisible, setModalVisible,
        personas, setPersonas,
        personaSeleccionada, setPersonaSeleccionada,
        busqueda, setBusqueda
    }
}

export default useEmpleadoState
