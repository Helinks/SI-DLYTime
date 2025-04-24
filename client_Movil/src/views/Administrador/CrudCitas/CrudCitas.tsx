import { Text, TextInput, View, Button, ScrollView, TouchableOpacity, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import Styles from './Styles';
import useEmpleadoState from '../../../hooks/useCitaState';
import filtro from '../../Administrador/CrudCitas/componentes/filtro';
import { Getcrud } from './controller/Services';
/*import { validarCampos } from ''; */
import { Picker } from '@react-native-picker/picker';
import { formatearFecha } from '../CrudCitas/componentes/dateFormart';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function CrudEmpleados() {

    const {
        modoEdicion, setModoEdicion,
        modalVisible, setModalVisible,
        citas, setCitas,
        citaSeleccionada, setCitaSeleccionada,
        busqueda, setBusqueda
    } = useEmpleadoState();
    const [showDatePicker, setShowDatePicker] = useState(false);

    const Consultas = async () => {
        await Getcrud(setCitas);

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
                        idHorarios: 0
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
                                    <TextInput
                                        style={Styles.inputText}
                                        value={formatearFecha(citaSeleccionada.fecha) || ""}
                                        placeholder="Fecha (YYYY-MM-DD)"
                                        onChangeText={(texto) => formatearFecha(setCitaSeleccionada({ ...citaSeleccionada, fecha: texto }))}
                                        
                                />
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={citaSeleccionada.fecha ? new Date(citaSeleccionada.fecha) : new Date()} // Fecha inicial
                                        mode="date" // Modo de selector (fecha)
                                        display={"calendar"} // Estilo del selector
                                        onChange={(event, selectedDate) => {
                                            setShowDatePicker(false); // Cierra el selector
                                            if (selectedDate) {
                                                const formattedDate = selectedDate.toISOString().split('T')[0]; // Formatea la fecha como YYYY-MM-DD
                                                setCitaSeleccionada({ ...citaSeleccionada, fecha: formattedDate });
                                            }
                                        }}
                                    />
                                )}

                                    <TextInput
                                        style={Styles.inputText}
                                        value={citaSeleccionada.hora}
                                        placeholder="Hora (HH:mm)"
                                        onChangeText={(texto) => setCitaSeleccionada({ ...citaSeleccionada, hora: texto })}
                                    />

                                   
                                    <TextInput
                                        style={Styles.inputText}
                                        value={citaSeleccionada.tipoConsulta}
                                        placeholder="Tipo de Consulta"
                                        onChangeText={(texto) => setCitaSeleccionada({ ...citaSeleccionada, tipoConsulta: texto })}
                                    />

                                    <TextInput
                                        style={Styles.inputText}
                                        value={citaSeleccionada.tipoConsulta}
                                        placeholder="Tipo de Consulta"
                                        onChangeText={(texto) => setCitaSeleccionada({ ...citaSeleccionada, tipoConsulta: texto })}
                                    />

                                    {/* <View style={Styles.textPicker}>


                                        {<Picker
                                            style={Styles.Picker}
                                            selectedValue={citaSeleccionada.idEstadoCita}
                                            onValueChange={(itemValue) =>
                                                setCitaSeleccionada({ ...citaSeleccionada, idEstadoCita: itemValue })
                                            }
                                        >
                                            <Picker.Item label="Estado de la Cita" value={0} />
                                            {estadosCita.map((estado) => (
                                                <Picker.Item key={estado.idEstadoCita} label={estado.nombre} value={estado.idEstadoCita} />
                                            ))}
                                        </Picker>}
                                    </View> */}
                                </>
                            )}

                            <View style={Styles.buttonContainer}>
                                < Button
                                    title="Guardar"
                                    color="#FF5757"
                                    onPress={async () => {

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
