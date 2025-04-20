import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { RootStackParamList } from '../../../App';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import {loginUser} from './controller/auth';

interface LoginScreenProps{
  onLogin: ( )=>void;
  navigation:any;
}
const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async () => {

    const result = await loginUser(email,password);

    if(result?.success){
      onLogin();
    }
    else {
      setErrorMessage(result?.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
      style={styles.input}
      placeholder="Corrreo Electrónico"
      value={email}
      onChangeText={setEmail}
      keyboardType='email-address'
      />
      <TextInput
      style={styles.input}
      placeholder="Contraseña"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
      />
      <Text>{errorMessage}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      {/* Opcional: Enlace para ir a la pantalla de registro */}
      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.link}>¿No tienes una cuenta? Regístrate aquí.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    marginTop: 20,
    color: '#007bff',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;


