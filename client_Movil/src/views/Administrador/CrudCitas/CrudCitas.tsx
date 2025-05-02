import { Text, TextInput, View, Button, ScrollView, TouchableOpacity, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Styles from './Styles';
import useCitaState from '../../../hooks/useCitaState';
import filtro from '../../Administrador/CrudCitas/componentes/filtro';
import { Getcrud, getHorarios, Getconsulta, actualizarCita, getEmpleado, getCliente, addCliente } from './controller/Services';
/*import { validarCampos } from ''; */
import { Picker } from '@react-native-picker/picker';
import { formatearFecha } from '../CrudCitas/componentes/dateFormart';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CrudCita() {

    const {
        modoEdicion, setModoEdicion,
        modalVisible, setModalVisible,
        citas, setCitas,
        cliente, setCliente,
        empleado, setEmpleado,
        consulta, setConsulta,
        horarios, setHorarios,
        citaSeleccionada, setCitaSeleccionada,
        busqueda, setBusqueda,
        numeroDocumento, setNumeroDocumento,
        numeroCliente, setNumeroCliente
    } = useCitaState();

    const [showDatePicker, setShowDatePicker] = useState(false);

    const Consultas = async () => {
        await Getcrud(setCitas);
        await getEmpleado(setEmpleado);
        await Getconsulta(setConsulta);
        
    };


    const buscarCliente = async (numeroDocumento: string) => {
        await getCliente(numeroDocumento, setCliente);
    };

    const Horarios = async (localDate: any) => {
        await getHorarios(localDate, setHorarios);
    };



    const citasFiltradas = filtro(citas, busqueda);

    useEffect(() => {
        Consultas();

    }, []);


    return (

        <ScrollView style={Styles.container}>
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
                }}><Text style={Styles.encabezado}>ADD</Text>
                </TouchableOpacity>
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
                                setCitaSeleccionada({
                                    ...item,
                                    idHorarios1: item.idHorarios
                                });
                                setModoEdicion(true);
                                setModalVisible(true);
                            }}>
                                <Text style={Styles.textoCelda}>{formatearFecha(item.fecha)}</Text>
                                <Text style={Styles.textoCelda}>{item.hora}</Text>
                                <Text style={Styles.textoCelda}>{item.idHorarios}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={Styles.celda} onPress={() => {
                                console.log(item)
                                setCitaSeleccionada({
                                    ...item,
                                    idHorarios1: item.idHorarios // aquí guardamos el valor original
                                });
                                setModoEdicion(true);
                                setModalVisible(true);
                            }}>
                                <Text style={Styles.textoCelda}>{item.nombreCliente}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={Styles.celda} onPress={() => {
                                console.log(item)
                                setCitaSeleccionada({
                                    ...item,
                                    idHorarios1: item.idHorarios // aquí guardamos el valor original
                                });
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

                                /* {modoEdicion ?
                                        "" :
                                        <TextInput
                                            style={Styles.inputText}
                                            value={modoEdicion ? personaSeleccionada.clave?.toString() : undefined}
                                            placeholder="Clave"
                                            secureTextEntry={true}
                                            onChangeText={(texto) => setPersonaSeleccionada({ ...personaSeleccionada, clave: texto })}
                                        />

                                    } */

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
                                        <Picker
                                            style={Styles.Picker}
                                            selectedValue={citaSeleccionada.idHorarios}
                                            onValueChange={(itemValue) => {

                                                setCitaSeleccionada({ ...citaSeleccionada, idHorarios: itemValue })
                                            }
                                            }
                                        >
                                            <Picker.Item label="Otra hora relacionada" value={0} />
                                            {horarios.map((horario, index) => (
                                                <Picker.Item key={index} label={horario.hora} value={horario.id} />
                                            ))}
                                        </Picker>
                                    </View>

                                    <View style={Styles.textPicker}>
                                        <Picker
                                            style={Styles.Picker}
                                            selectedValue={citaSeleccionada.tipoConsulta}
                                            onValueChange={(itemValue) => {

                                                setCitaSeleccionada({ ...citaSeleccionada, tipoConsulta: itemValue })
                                            }
                                            }
                                        >
                                            <Picker.Item label="Tipo de consulta" value={0} />
                                            {consulta.map((item, index) => (
                                                <Picker.Item key={index} label={item.nombre} value={item.idtipoConsulta} />
                                            ))}
                                        </Picker>
                                    </View>
                                    {!modoEdicion ?
                                        <>
                                            <View style={Styles.textPicker}>
                                                <Picker
                                                    style={Styles.Picker}
                                                    selectedValue={citaSeleccionada.nombreEmpleado}
                                                    onValueChange={(itemValue) => {
                                                        setNumeroCliente(itemValue)
                                                        setCitaSeleccionada({ ...citaSeleccionada, nombreEmpleado: itemValue })
                                                    }
                                                    }
                                                >
                                                    <Picker.Item label="Seleccionar oftalmologo" value={0} />
                                                    {empleado.map((item, index) => (
                                                        <Picker.Item key={index} label={item.Nombres} value={item.numeroDocumento}/>
                                                    ))}
                                                </Picker>
                                            </View>
                                            <View style={Styles.inputText}>
                                                <TextInput
                                                    style={Styles.input}
                                                    placeholder="Digite número de cliente"
                                                    value={numeroDocumento}
                                                    onChangeText={setNumeroDocumento}
                                                />
                                                <Button title='Verificar usuario' onPress={() => buscarCliente(numeroDocumento)} />

                                                {cliente.map((item, index) => (
                                                    <View key={index}>
                                                        <Text >Cliente</Text>
                                                        <Text >Nombres: {item.nombre}</Text>
                                                        <Text >Correo: {item.correo}</Text>
                                                </View>
                                                ))}
                                            </View>
                                        </>
                                        : ""}
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
                                        } */
                                        if (modoEdicion) {
                                            if(!citaSeleccionada?.idCita || !citaSeleccionada?.idHorarios1 || !citaSeleccionada?.idHorarios || !citaSeleccionada?.tipoConsulta){
                                                alert("Por favor, complete todos los campos requeridos.");
                                                return;
                                            }
                                            else{
                                            // Modificar datos
                                            const respuesta = await actualizarCita(citaSeleccionada?.idCita, citaSeleccionada?.idHorarios1, citaSeleccionada?.idHorarios, citaSeleccionada?.tipoConsulta);

                                            // Actualizar la lista
                                            await Getcrud(setCitas);
                                            alert(respuesta.message);

                                            // Cerrar el modal
                                            setModalVisible(false);

                                            // Limpiar el formulario
                                            setCitaSeleccionada(null);
                                            Horarios(null);
                                            }

                                        } else {
                                            if(!numeroDocumento || !numeroCliente || !citaSeleccionada?.idHorarios || !citaSeleccionada?.tipoConsulta){
                                                alert("Por favor, complete todos los campos requeridos.");
                                                return;


                                            }else{
                                            alert(`Número Documento: ${numeroDocumento}, Número Cliente: ${numeroCliente}, ID Horarios: ${citaSeleccionada?.idHorarios}, Tipo Consulta: ${citaSeleccionada?.tipoConsulta}`)
                                             // Agregar datos
                                            const respuesta = addCliente(numeroDocumento,numeroCliente,citaSeleccionada?.idHorarios,citaSeleccionada?.tipoConsulta); 
                                            // Actualizar la lista
                                            await Getcrud(setCitas);

                                             alert("Cita creada con éxito"); 
                                            // Cerrar el modal
                                             setModalVisible(false);
    
                                            // Limpiar el formulario
                                            setCitaSeleccionada(null);
                                            Horarios(null); 
                                            }
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

        </ScrollView >


    );
}
