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
        console.log(credenciales)
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

export const getGenero = async (setTiposGenero) => {
    try {
        const response = await axios.get(url() +'/miniConsultaSelect/consultarGenero');
        setTiposGenero(response.data);
        
    } catch (error) {
        console.error('Error al obtener tipos de genero:', error);
    }
}

export const getIdentificacion = async (setTiposIdentificacion) => {
    try {
        const response = await axios.get(url() +'/miniConsultaSelect/consultarIdentificacion');
        setTiposIdentificacion(response.data);
        
    } catch (error) {
        console.error('Error al obtener tipos de identificación:', error);
    }
}

export const getEstado = async (setTipoEstado) => {
    try {
        const response = await axios.get(url() +'/miniConsultaSelect/consultarEstado');
        setTipoEstado(response.data);
        
    } catch (error) {
        console.error('Error al obtener tipos de identificación:', error);
    }
}
