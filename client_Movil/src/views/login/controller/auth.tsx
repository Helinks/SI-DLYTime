import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// import Emailvalidation from '@everapi/emailvalidation-js'

const url = 'http://192.168.1.13:3001';

           

export const loginUser = async (correo_i: string, password_i: string) => {
    if (!correo_i || !password_i) {
        Alert.alert("Por favor llener todos los campos")
    } else {
        try {
            const response = await axios.post(`${url}/autenticacion/login`, { correo_i, password_i });
            if (response.status === 200) {
                await AsyncStorage.setItem('authToken', response.data.token);
                await AsyncStorage.setItem('userRole', response.data.rol.toString());
                await AsyncStorage.setItem('userId', response.data.id.toString());
                return {  success: true }
            } else {
                Alert.alert('Error de Inicio de Sesión 1', response.data.message || 'Correo o contraseña incorrecta');
                return { success: false, error: response.data.message };
            }
        } catch (error) {
            console.error('Error al iniciar sesión 2', error);
            Alert.alert('Error de Conexión', 'No se pudo conectar con el servidor.');
            return { success: false, error};

        }
    }
}

