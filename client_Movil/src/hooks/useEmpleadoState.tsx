import React, { useState } from 'react'
import Persona from '../types/persona';
import Genero from '../types/generos';
import Identification from '../types/identificacion';
import Estado from "../types/Estado"

const useEmpleadoState = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false)

    const [personas, setPersonas] = useState<Persona[]>([]);
    const [personaSeleccionada, setPersonaSeleccionada] = useState<Persona | null>(null);

    const [tiposGenero, setTiposGenero] = useState<Genero[]>([]);
    const [tiposIdentification, setIdentification] = useState<Identification[]>([]);
    const [tipoEstado, setTipoEstado] = useState<Estado[]>([])
    const [busqueda, setBusqueda] = useState('');



    return {
        tiposIdentification, setIdentification,
        tiposGenero, setTiposGenero,
        tipoEstado,setTipoEstado,
        modoEdicion, setModoEdicion,
        modalVisible, setModalVisible,
        personas, setPersonas,
        personaSeleccionada, setPersonaSeleccionada,
        busqueda, setBusqueda
    }
}

export default useEmpleadoState
