import { Text, TextInput, View, Button, ScrollView, TouchableOpacity, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import Styles from './Styles';
import useEmpleadoState from '../../../hooks/useEmpleadoState';
import filtro from '../../Administrador/CrudEmpleados/componentes/filtro';
import { Getcrud, addCrud, patchCrud, getGenero, getIdentificacion, getEstado } from './controller/Services';
import { validarCampos } from './componentes/validarCampos';
import { Picker } from '@react-native-picker/picker';


export default function CrudEmpleados() {

    const {
        tiposIdentification, setIdentification,
        tiposGenero, setTiposGenero,
        tipoEstado, setTipoEstado,
        modoEdicion, setModoEdicion,
        modalVisible, setModalVisible,
        personas, setPersonas,
        personaSeleccionada, setPersonaSeleccionada,
        busqueda, setBusqueda
    } = useEmpleadoState();

    const Consultas = async () => {
        await getGenero(setTiposGenero);
        await getIdentificacion(setIdentification);
        await getEstado(setTipoEstado);
    };

    const personasFiltradas = filtro(personas, busqueda);

    useEffect(() => {
        Consultas();
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={Styles.modalFondo}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={Styles.modalContenido}
                    >

                        <ScrollView contentContainerStyle={Styles.scrollViewContent}>
                            <Text style={Styles.titulo}>
                                {modoEdicion ? "Editar Empleado" : "Agregar Empleado"}
                            </Text>
                            {personaSeleccionada && (
                                <>
                                    {modoEdicion ?
                                        "" :
                                        <TextInput
                                            style={Styles.inputText}
                                            value={modoEdicion ? personaSeleccionada.numeroDocumento?.toString() : undefined}
                                            placeholder="Número de Documento"
                                            keyboardType="numeric"
                                            onChangeText={(texto) => setPersonaSeleccionada({ ...personaSeleccionada, numeroDocumento: texto === "" ? "" : parseInt(texto) })}
                                        />

                                    }

                                    <View style={Styles.textPicker}>
                                        <Picker
                                            style={Styles.Picker}
                                            selectedValue={personaSeleccionada.idTipoIdentificacion}
                                            onValueChange={(itemValue) => {
                                                setPersonaSeleccionada({
                                                    ...personaSeleccionada,
                                                    idTipoIdentificacion: itemValue,
                                                });
                                            }}
                                        >
                                            <Picker.Item label="tipo de identificación" value={0} />
                                            {tiposIdentification.map((tipo) => (
                                                <Picker.Item key={tipo.idTipoIdentificacion} label={tipo.nombre} value={tipo.idTipoIdentificacion} />
                                            ))}
                                        </Picker>
                                    </View>
                                    <TextInput
                                        style={Styles.inputText}
                                        value={modoEdicion ? personaSeleccionada.Nombres : undefined}
                                        placeholder="Nombres"
                                        onChangeText={(texto) => setPersonaSeleccionada({ ...personaSeleccionada, Nombres: texto })}
                                    />

                                    <TextInput
                                        style={Styles.inputText}
                                        value={modoEdicion ? personaSeleccionada.Apellidos : undefined}
                                        placeholder="Apellidos"
                                        onChangeText={(texto) => setPersonaSeleccionada({ ...personaSeleccionada, Apellidos: texto })}
                                    />

                                    <View style={Styles.textPicker}>
                                        <Picker
                                            style={Styles.Picker}
                                            selectedValue={personaSeleccionada.idGenero}
                                            onValueChange={(itemValue) => {
                                                setPersonaSeleccionada({
                                                    ...personaSeleccionada,
                                                    idGenero: itemValue,
                                                });
                                            }}
                                        >
                                            <Picker.Item label="tipo de Genero" value={0} />
                                            {tiposGenero.map((tipo) => (
                                                <Picker.Item key={tipo.idGenero} label={tipo.nombre} value={tipo.idGenero} />
                                            ))}
                                        </Picker>
                                    </View>

                                    <TextInput
                                        style={Styles.inputText}
                                        value={modoEdicion ? personaSeleccionada.correo : undefined}
                                        placeholder="Correo Electrónico"
                                        onChangeText={(texto) => setPersonaSeleccionada({ ...personaSeleccionada, correo: texto })}
                                    />

                                    <TextInput
                                        style={Styles.inputText}
                                        value={modoEdicion ? personaSeleccionada.telefono : undefined}
                                        placeholder="Telefono"
                                        onChangeText={(texto) => setPersonaSeleccionada({ ...personaSeleccionada, telefono: texto })}
                                    />

                                    {modoEdicion ?
                                        "" :
                                        <TextInput
                                            style={Styles.inputText}
                                            value={modoEdicion ? personaSeleccionada.clave?.toString() : undefined}
                                            placeholder="Clave"
                                            secureTextEntry={true}
                                            onChangeText={(texto) => setPersonaSeleccionada({ ...personaSeleccionada, clave: texto })}
                                        />

                                    }
                                    <View style={Styles.textPicker}>
                                        <Picker
                                            style={Styles.Picker}
                                            selectedValue={personaSeleccionada.idEstadoPersona}
                                            onValueChange={(itemValue) => {
                                                setPersonaSeleccionada({
                                                    ...personaSeleccionada,
                                                    idEstadoPersona: itemValue,
                                                });
                                            }}
                                        >
                                            <Picker.Item label="tipo de Estado" value={0} />
                                            {tipoEstado.map((tipo) => (
                                                <Picker.Item key={tipo.idEstado} label={tipo.nombre} value={tipo.idEstado} />
                                            ))}
                                        </Picker>
                                    </View>
                                </>
                            )}

                            <View style={Styles.buttonContainer}>
                                < Button
                                    title="Guardar"
                                    color="#FF5757"
                                    onPress={async () => {

                                        const valid = await validarCampos(personaSeleccionada)
                                        if (valid) {
                                            return;
                                        }

                                        if (modoEdicion) {

                                            // Modificar datos
                                            const respuesta = await patchCrud(personaSeleccionada);

                                            // Actualizar la lista
                                            await Getcrud(setPersonas);
                                            alert(respuesta.message);

                                            // Cerrar el modal
                                            setModalVisible(false);

                                            // Limpiar el formulario
                                            setPersonaSeleccionada(null);


                                        } else {

                                            // Agregar datos
                                            const respuesta = await addCrud(personaSeleccionada);
                                            // Actualizar la lista
                                            await Getcrud(setPersonas);

                                            alert(respuesta.message);
                                            // Cerrar el modal
                                            setModalVisible(false);

                                            // Limpiar el formulario
                                            setPersonaSeleccionada(null);
                                        }

                                    }}
                                />
                            </View>
                            <View style={Styles.buttonContainer}>
                                <Button
                                    color="#FF5757"
                                    title="Cancelar"
                                    onPress={() => {
                                        // Cancelar edición
                                        setModalVisible(false);
                                    }}
                                />
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </Modal >

        </View >


    );
}
