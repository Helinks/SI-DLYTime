import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { url } from '../../../Global/url';

// import Emailvalidation from '@everapi/emailvalidation-js'

           

export const loginUser = async (correo_i: string, password_i: string) => {
    if (!correo_i || !password_i) {
        Alert.alert("Por favor llener todos los campos")
    } else {
        try {
            const response = await axios.post<{ token: string; rol: string; id: string; message?: string }>(`${url()}/autenticacion/login`, { correo_i, password_i });
            if (response.status === 200) {
                await AsyncStorage.setItem('authToken', response.data.token);
                await AsyncStorage.setItem('userRole', response.data.rol.toString());
                await AsyncStorage.setItem('userId', response.data.id.toString());
                return {  success: true }
            } else {
                Alert.alert(response.data.message || 'Ocurrió un error inesperado.');
                return { success: false, error: response.data.message };
            }
        } catch (error:any) {
            console.error('Error al iniciar sesión', error);
            Alert.alert(error.response?.data?.message || "Ocurrio un error inesperado");
            return { success: false, error};

        }
    }
}

