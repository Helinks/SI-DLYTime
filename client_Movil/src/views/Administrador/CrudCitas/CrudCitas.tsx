import { Text, TextInput, View, Button, ScrollView, TouchableOpacity, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Styles from './Styles';
import useCitaState from '../../../hooks/useCitaState';
import filtro from '../../Administrador/CrudCitas/componentes/filtro';
import { Getcrud, getHorarios, Getconsulta } from './controller/Services';
/*import { validarCampos } from ''; */
import { Picker } from '@react-native-picker/picker';
import { formatearFecha } from '../CrudCitas/componentes/dateFormart';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CrudEmpleados() {

    const {
        modoEdicion, setModoEdicion,
        modalVisible, setModalVisible,
        citas, setCitas,
        consulta, setConsulta,
        horarios, setHorarios,
        citaSeleccionada, setCitaSeleccionada,
        busqueda, setBusqueda
    } = useCitaState();

    const [showDatePicker, setShowDatePicker] = useState(false);

    const Consultas = async () => {
        await Getcrud(setCitas);
        await Getconsulta(setConsulta);
    };

    const Horarios = async (localDate : any) => {
        await getHorarios(localDate, setHorarios);
    };



    const citasFiltradas = filtro(citas, busqueda);

    useEffect(() => {
        Consultas();

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
                    setCitaSeleccionada({
                        idCita: 0,
                        fecha: '',
                        hora: '',
                        estadoHorario: '',
                        fechaHora: '',
                        nombreCliente: '',
                        nombreEmpleado: '',
                        tipoConsulta: '',
                        direccion: '',
                        idEstadoCita: 0,
                        estadoCita: '',
                        idHorarios: 0,
                        idHorarios1: 0
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

                    {citasFiltradas.map((item, index) => (
                        <View key={index} style={Styles.fila}>
                            <TouchableOpacity style={Styles.celda} onPress={() => {
                                setCitaSeleccionada(item);
                                setModoEdicion(true);
                                setModalVisible(true);
                            }}>
                                <Text style={Styles.textoCelda}>{formatearFecha(item.fecha)}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={Styles.celda} onPress={() => {
                                setCitaSeleccionada(item);
                                setModoEdicion(true);
                                setModalVisible(true);
                            }}>
                                <Text style={Styles.textoCelda}>{item.nombreCliente}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={Styles.celda} onPress={() => {
                                setCitaSeleccionada(item);
                                setModoEdicion(true);
                                setModalVisible(true);
                            }}>
                                <Text style={Styles.textoCelda}>{item.nombreEmpleado}</Text>
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
                                {modoEdicion ? "Editar Cita" : "Agregar Cita"}
                            </Text>

                            {citaSeleccionada && (
                                <>
                                    <Button title="Seleccione fecha" onPress={() => setShowDatePicker(true)} />

                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={citaSeleccionada.fecha ? new Date(citaSeleccionada.fecha) : new Date()}
                                            mode="date"
                                            display="calendar"
                                            onChange={(event, selectedDate) => {
                                                setShowDatePicker(false);
                                                if (selectedDate) {
                                                    // Usa moment o una función propia para obtener la fecha local en formato YYYY-MM-DD
                                                    const localDate = moment(selectedDate).format('YYYY-MM-DD');
                                                    setCitaSeleccionada((prev) => ({
                                                        ...prev!,
                                                        fecha: localDate,
                                                    }));
                                                    console.log("Fecha seleccionada (local):", localDate);
                                                    Horarios(localDate);
                                                }
                                            }}
                                        />
                                    )}

                                    <View style={Styles.textPicker}>


                                        {<Picker
                                            style={Styles.Picker}
                                            selectedValue={citaSeleccionada.idHorarios}
                                            onValueChange={(itemValue) =>
                                                setCitaSeleccionada({ ...citaSeleccionada, idHorarios: itemValue })
                                            }
                                        >
                                            <Picker.Item label="Hora de la cita" value={0} />
                                            {horarios.map((horario, index) => (
                                                <Picker.Item key={index} label={horario.hora} value={horario.idHorarios} />
                                            ))}
                                        </Picker>}
                                    </View>


                                    <View style={Styles.textPicker}>


                                        {<Picker
                                            style={Styles.Picker}
                                            selectedValue={citaSeleccionada.tipoConsulta}
                                            onValueChange={(itemValue) =>
                                                setCitaSeleccionada({ ...citaSeleccionada, tipoConsulta: itemValue })
                                            }
                                        >
                                            <Picker.Item label="Tipo de consulta" value={0} />
                                            {consulta.map((consulta, index) => (
                                                <Picker.Item key={index} label={consulta.nombre} value={consulta.idtipoConsulta} />
                                            ))}
                                        </Picker>}
                                    </View>
                                </>
                            )}

                            <View style={Styles.buttonContainer}>
                                < Button
                                    title="Guardar"
                                    color="#FF5757"
                                    onPress={async () => {

                                        console.log(citaSeleccionada?.idHorarios1 ,   citaSeleccionada?.idHorarios);

                                        /* const valid = await validarCampos(personaSeleccionada)
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
                                        } */
                                        alert("Funciona")

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
