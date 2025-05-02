import{ useState } from 'react'
import Cita from '../types/cita'
import Horarios from '../types/horario';
import Consulta from '../types/consulta';
import Persona from '../types/persona';

const useEmpleadoState = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);

    const [citas, setCitas] = useState<Cita[]>([]);
    const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);

    const [horarios,setHorarios] = useState<Horarios[]>([])
    const [consulta,setConsulta] = useState<Consulta[]>([]);
    const [empleado,setEmpleado] = useState<Persona[]>([]);
    const [cliente,setCliente] = useState<Persona[]>([]);
    const [ numeroCliente, setNumeroCliente] = useState('');
    
    const [busqueda, setBusqueda] = useState('');
    const [numeroDocumento, setNumeroDocumento] = useState('');



    return {
        modoEdicion, setModoEdicion,
        modalVisible, setModalVisible,
        empleado, setEmpleado,
        cliente, setCliente,
        citas, setCitas,
        consulta, setConsulta,
        horarios,setHorarios,
        citaSeleccionada, setCitaSeleccionada,
        busqueda, setBusqueda,
        numeroDocumento, setNumeroDocumento,
        numeroCliente, setNumeroCliente
    }
}

export default useEmpleadoState
