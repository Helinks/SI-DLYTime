import{ useState } from 'react'
import Cita from '../types/cita'
import Horarios from '../types/horario';
import Consulta from '../types/consulta';

const useEmpleadoState = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);

    const [citas, setCitas] = useState<Cita[]>([]);
    const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);

    const [horarios,setHorarios] = useState<Horarios[]>([])
    const [consulta,setConsulta] = useState<Consulta[]>([]);
    
    const [busqueda, setBusqueda] = useState('');



    return {
        modoEdicion, setModoEdicion,
        modalVisible, setModalVisible,
        citas, setCitas,
        consulta, setConsulta,
        horarios,setHorarios,
        citaSeleccionada, setCitaSeleccionada,
        busqueda, setBusqueda
    }
}

export default useEmpleadoState
