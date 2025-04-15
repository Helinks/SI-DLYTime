import { url } from '../../../../Global/url';
import axios from 'axios';

export const Getcrud = async (setPersonas) => {
    try {
        const response = await axios.get(url() + '/crudEmpleados/consultaEmpleado')
        console.log("actualizo")
        return setPersonas(response.data);
    } catch (error) {
        return console.log(error);
    }
}

export const addCrud = async (credenciales) => {
    try {
        const response = await axios.post(url() + '/crudEmpleados/agregarEmpleado',credenciales)

        return response.data;
    } catch (error) {
        return console.log('Error al agregar persona:', error);
    }

}

export const patchCrud = async (credenciales) => {
    try {
        const response = await axios.patch(url() + '/crudEmpleados/actualizarEmpleado',credenciales)

        return response.data;
    } catch (error) {
        return console.log('Error al modificar persona:', error);
    }
}
