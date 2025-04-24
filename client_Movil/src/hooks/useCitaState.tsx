import{ useState } from 'react'
import Cita from '../types/cita'

const useEmpleadoState = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);

    const [citas, setCitas] = useState<Cita[]>([]);
    const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);

    const [busqueda, setBusqueda] = useState('');



    return {
        modoEdicion, setModoEdicion,
        modalVisible, setModalVisible,
        citas, setCitas,
        citaSeleccionada, setCitaSeleccionada,
        busqueda, setBusqueda
    }
}

export default useEmpleadoState
