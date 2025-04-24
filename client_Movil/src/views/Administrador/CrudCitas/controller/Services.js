import { url } from '../../../../Global/url';
import axios from 'axios';

export const Getcrud = async (setCitas) => {
    try {
        const response = await axios.get(url() + '/crudCitas/crudCita')
        console.log("actualizo")
        return setCitas(response.data);
    } catch (error) {
        return console.log(error);
    }
}

export const getHorarios = async (fecha, setHorarios) => {
    try{
        const response = await axios.get(url() + "/crudCitas/getHorarios",{
            params: { fecha: fecha },
          })

        return setHorarios(response.data);
    } catch (err) {
        return console.log(err)
    }
}

export const Getconsulta = async (setConsulta) => {
    try{
        const response = await axios.get(url() + "/crudCitas/getTipoConsulta")
          
        return setConsulta(response.data);
    } catch (err) {
        return console.log(err)
    }
}


