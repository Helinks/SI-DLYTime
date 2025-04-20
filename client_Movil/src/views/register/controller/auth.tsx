import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// import Emailvalidation from '@everapi/emailvalidation-js'

const url = 'http://192.168.1.13:3001';

export const registerUser = async (formData: {
    numeroDocumento: string;
    idRol: number;
    idTipoIdentificacion: number;
    nombre: string;
    apellido: string;
    idGenero: number;
    correo: string;
    clave: string;
}) => {
    if (!formData.numeroDocumento || !formData.idTipoIdentificacion || !formData.nombre || !formData.apellido || !formData.idGenero || !formData.correo || !formData.clave) {
        Alert.alert("Por favor llene todos los datos")
    }
    else {
        try {
            const response = await axios.post(`${url}/autenticacion/registro`, formData);
            if (response.status === 201) {
                Alert.alert('Registro Exitoso', response.data.message);
                return { success: true };
            } else {
                Alert.alert('Error de Registro', response.data.message || 'Ocurrió un error durante el registro.');
                return { success: false, error: response.data.message || 'Error al registrar.' };
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('Axios error:', error.message);
            } else {
                console.log('Unexpected error:', error);
            }
        }
    }
}

