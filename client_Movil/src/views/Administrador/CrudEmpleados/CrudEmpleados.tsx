import { Text, TextInput, View, Button, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styles from './Styles';
import useEmpleadoState from '../../../hooks/useEmpleadoState';
import filtro from '../../Administrador/CrudEmpleados/componentes/filtro';
import { url } from '../../../Global/url';
import { Getcrud, addCrud, patchCrud } from './api/Services';
import { validarCampos } from './componentes/validarCampos';
import { Picker } from '@react-native-picker/picker';


export default function CrudEmpleados() {


    const tiposIdentificacion = [
        { id: 1, nombre: 'Cédula de Ciudadanía' },
        { id: 2, nombre: 'Tarjeta de Identidad' },
        { id: 3, nombre: 'RUC' },
        // Agrega más si lo necesitas
    ];

    const {
        modoEdicion, setModoEdicion,
        modalVisible, setModalVisible,
        personas, setPersonas,
        personaSeleccionada, setPersonaSeleccionada,
        busqueda, setBusqueda
    } = useEmpleadoState();

    const personasFiltradas = filtro(personas, busqueda);

    useEffect(() => {
        Getcrud(setPersonas);
    }, []);


    return (

        <View style={Styles.container}>
            <View style={Styles.topBar}>
                <TextInput
                    style={Styles.input}
                    placeholder="Buscar..."
                    value={busqueda}
                    onChangeText={(texto) => setBusqueda(texto)}
                />
                <TouchableOpacity style={Styles.botones} onPress={() => {
                    setPersonaSeleccionada({
                        numeroDocumento: 0,
                        idTipoIdentificacion: 0,
                        Nombres: '',
                        Apellidos: '',
                        idGenero: 0,
                        correo: '',
                        telefono: "",
                        clave: '',
                        idEstadoPersona: 0,
                    });
                    setModoEdicion(false)
                    setModalVisible(true);
                }}><Text style={Styles.encabezado}>ADD</Text></TouchableOpacity>
            </View>
            <View >
                <ScrollView style={Styles.tabla}>
                    <View style={Styles.fila}>
                        <Text style={[Styles.celda, Styles.encabezado]}>N° Documento</Text>
                        <Text style={[Styles.celda, Styles.encabezado]}>Nombre</Text>
                    </View>

                    {personasFiltradas.map((item, index) => (
                        <View key={index} style={Styles.fila}>
                            <TouchableOpacity style={Styles.celda} onPress={() => {
                                setPersonaSeleccionada(item);
                                setModoEdicion(true);
                                setModalVisible(true);
                            }}>
                                <Text style={Styles.textoCelda}>{item.numeroDocumento}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={Styles.celda} onPress={() => {
                                setPersonaSeleccionada(item);
                                setModoEdicion(true);
                                setModalVisible(true);
                            }}>
                                <Text style={Styles.textoCelda}>{item.Nombres}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}

                </ScrollView>
            </View>

            {/* MODAL DE AGREGAR */}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={Styles.modalFondo}>
                    <View style={Styles.modalContenido}>
                        <Text style={Styles.titulo}>
                            {modoEdicion ? "Editar Empleado" : "Agregar Empleado"}
                        </Text>

                        {personaSeleccionada && (
                            <>
                                {modoEdicion ?
                                    "" :
                                    <TextInput
                                        value={modoEdicion ? personaSeleccionada.numeroDocumento?.toString() : undefined}
                                        placeholder="Número de Documento"
                                        keyboardType="numeric"
                                        onChangeText={(texto) => setPersonaSeleccionada({ ...personaSeleccionada, numeroDocumento: texto === "" ? "" : parseInt(texto) })}
                                    />

                                }

                                <Picker
                                    selectedValue={personaSeleccionada.idTipoIdentificacion}
                                    onValueChange={(itemValue) => {
                                        setPersonaSeleccionada({
                                            ...personaSeleccionada,
                                            idTipoIdentificacion: itemValue,
                                        });
                                    }}
                                >
                                    <Picker.Item label="Seleccione un tipo de identificación" value={0} />
                                    {tiposIdentificacion.map((tipo) => (
                                        <Picker.Item key={tipo.id} label={tipo.nombre} value={tipo.id} />
                                    ))}
                                </Picker>

                                <TextInput
                                    value={modoEdicion ? personaSeleccionada.Nombres : undefined}
                                    placeholder="Nombres"
                                    onChangeText={(texto) => setPersonaSeleccionada({ ...personaSeleccionada, Nombres: texto })}
                                />

                                <TextInput
                                    value={modoEdicion ? personaSeleccionada.Apellidos : undefined}
                                    placeholder="Apellidos"
                                    onChangeText={(texto) => setPersonaSeleccionada({ ...personaSeleccionada, Apellidos: texto })}
                                />

                                <TextInput
                                    value={modoEdicion ? personaSeleccionada.idGenero?.toString() : undefined}
                                    placeholder="ID Género"
                                    keyboardType="numeric"
                                    onChangeText={(texto) => setPersonaSeleccionada({ ...personaSeleccionada, idGenero: texto === "" ? "" : parseInt(texto) })}
                                />

                                <TextInput
                                    value={modoEdicion ? personaSeleccionada.correo : undefined}
                                    placeholder="Correo Electrónico"
                                    onChangeText={(texto) => setPersonaSeleccionada({ ...personaSeleccionada, correo: texto })}
                                />

                                <TextInput
                                    value={modoEdicion ? personaSeleccionada.telefono : undefined}
                                    placeholder="Telefono"
                                    onChangeText={(texto) => setPersonaSeleccionada({ ...personaSeleccionada, telefono: texto })}
                                />

                                <TextInput
                                    value={modoEdicion ? personaSeleccionada.clave : undefined}
                                    placeholder="Clave"
                                    secureTextEntry
                                    onChangeText={(texto) => setPersonaSeleccionada({ ...personaSeleccionada, clave: texto })}
                                />

                                <TextInput
                                    value={modoEdicion ? personaSeleccionada.idEstadoPersona?.toString() : undefined}
                                    placeholder="ID Estado Persona"
                                    keyboardType="numeric"
                                    onChangeText={(texto) => setPersonaSeleccionada({ ...personaSeleccionada, idEstadoPersona: texto === "" ? "" : parseInt(texto) })}
                                />
                            </>
                        )}
                        < Button
                            title="Guardar"
                            onPress={ async () => {

                                if (validarCampos(personaSeleccionada)) {
                                    return;
                                }

                                if (modoEdicion) {

                                    // Modificar datos
                                    await patchCrud(personaSeleccionada);

                                    // Actualizar la lista
                                    await Getcrud(setPersonas);

                                    // Cerrar el modal
                                    setModalVisible(false);

                                    // Limpiar el formulario
                                    setPersonaSeleccionada(null);


                                } else {

                                    // Agregar datos
                                    await addCrud(personaSeleccionada);

                                    // Actualizar la lista
                                    await Getcrud(setPersonas);

                                    // Cerrar el modal
                                    setModalVisible(false);

                                    // Limpiar el formulario
                                    setPersonaSeleccionada(null);
                                }

                            }}
                        />
                        <Button
                            title="Cancelar"
                            onPress={() => {
                                // Cancelar edición
                                setModalVisible(false);
                            }}
                        />
                    </View>
                </View>
            </Modal>

        </View>


    );
}


/* // Suponiendo que tienes un arreglo de tipos de identificación


// En tu JSX:
<Picker
  selectedValue={personaSeleccionada.idTipoIdentificacion}
  onValueChange={(itemValue) =>
    setPersonaSeleccionada({ ...personaSeleccionada, idTipoIdentificacion: itemValue })
  }
>
  <Picker.Item label="Seleccione un tipo de identificación" value={0} />
  {tiposIdentificacion.map((tipo) => (
    <Picker.Item key={tipo.id} label={tipo.nombre} value={tipo.id} />
  ))}
</Picker> 




import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type TipoIdentificacion = {
  id: number;
  nombre: string;
};

type Persona = {
  idTipoIdentificacion: number;
  // Puedes agregar otros campos como nombres, apellidos, etc.
};

type Props = {
  personaSeleccionada: Persona;
  setPersonaSeleccionada: React.Dispatch<React.SetStateAction<Persona>>;
};

const tiposIdentificacion: TipoIdentificacion[] = [
  { id: 1, nombre: 'Cédula de Ciudadanía' },
  { id: 2, nombre: 'Tarjeta de Identidad' },
  { id: 3, nombre: 'Pasaporte' },
];

*/