import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { Picker } from '@react-native-picker/picker';
import {registerUser} from './controller/auth';


const RegisterScreen = () => {
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [idRol,setIdRol]= useState<number>(1);
  const [idTipoIdentificacion,setIdTipoIdentificacion]= useState<number>(1);
  const [nombre, setNombre]= useState('');
  const [apellido, setApellido] = useState('');
  const [idGenero, setIdGenero] = useState <number>(1);
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  
  const opcionesIdentficacion =[
    {label: 'Cédula', value:'1'},
    {label: 'Pasaporte', value:'2'},
    {label: 'Ruc', value:'3'},
  ];

  const opcionesGenero =[
    {label: 'Masculino', value:'1'},
    {label: 'Femenino', value:'2'},
    {label: 'Otro', value:'3'},
  ];

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSubmit = async () => {
    
    const formData={
      numeroDocumento,
      idRol,
      idTipoIdentificacion,
      nombre,
      apellido,
      idGenero,
      correo,
      clave
    };

    await registerUser(formData);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <TextInput
      style={styles.input}
      placeholder="Número de Documento"
      value={numeroDocumento}
      onChangeText={setNumeroDocumento}
      />
      <Picker
      selectedValue={idTipoIdentificacion}
      onValueChange={(itemValue, itemIndex)=>setIdTipoIdentificacion(itemValue)}
      >
        {opcionesIdentficacion.map((opcion)=>(
          <Picker.Item key={opcion.value} label={opcion.label} value={opcion.value}/>
        ))}
      </Picker>
      <TextInput
      style={styles.input}
      placeholder="Nombre"
      value={nombre}
      onChangeText={setNombre}
      />
      <TextInput
      style={styles.input}
      placeholder="Apellido"
      value={apellido}
      onChangeText={setApellido}
      />
      <Picker
      selectedValue={idGenero}
      onValueChange={(itemValue, itemIndex)=>setIdGenero(itemValue)}
      >
        {opcionesGenero.map((opcion)=>(
          <Picker.Item key={opcion.value} label={opcion.label} value={opcion.value}/>
        ))}
      </Picker>
      <TextInput
      style={styles.input}
      placeholder="Correo"
      value={correo}
      onChangeText={setCorreo}
      keyboardType="email-address"
      />
      <TextInput
      style={styles.input}
      placeholder="Clave"
      value={clave}
      onChangeText={setClave}
      secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>¿Ya tienes una cuenta? Inicia sesión aquí.</Text>
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

export default RegisterScreen;