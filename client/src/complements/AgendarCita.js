import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Css/agendarCitas.css';
import Axios from "axios";

function AgendarCita() {
    const today = new Date();
    const id = localStorage.getItem("userId");

    const [mensaje, setMensaje] = useState("");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [horarios, setHorarios] = useState([]);
    const [selectHorario, setSelectHorario] = useState(false);
    const [hora, setHora] = useState();
    const [idHorario, setIdHorario] = useState();
    const [fecha, setFecha] = useState();
    const [consultas, setConsultas] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [tipoConsulta, setTipoConsulta] = useState();
    const [NumeroDocumentoCliente, setDocumentoCliente] = useState(0);
    const [NumeroDocumentoOftalmologo, setDocumentoOftalmologo] = useState(0);

    /* Solicita agregar una nueva cita */
    const addCita = () => {
        if (!idHorario) {
            setMensaje("Por favor seleccione fecha y hora");
            return;
        }

        if (!NumeroDocumentoCliente) {
            setMensaje("Número de documento de cliente inválido");
            return;
        }

        if (!NumeroDocumentoOftalmologo) {
            setMensaje("Debe seleccionar un oftalmólogo");
            return;
        }
        if (!tipoConsulta) {
            setMensaje("Debe seleccionar un tipo de consulta");
            return;
        }



        Axios.post("http://localhost:3001/crudCitas/addCita", {
            idHorario: idHorario,
            fecha: fecha,
            hora: hora,
            NumeroDocumentoCliente: NumeroDocumentoCliente,
            NumeroDocumentoOftalmologo: NumeroDocumentoOftalmologo,
            idTipoConsulta: tipoConsulta,
        })

            .then((response) => {
                setFecha("");
                setHora("");
                setTipoConsulta("");
                setSelectHorario(false);
                setSelectedDate(null);
                // Mostrar mensaje de éxito
                setMensaje("Cita agregada correctamente");

                alert("Cita agendada con exito")
            })
            .catch((error) => {
                console.error("Error al agregar cita:", error);
            });
    };
    const getEmpleado = () => {
        Axios.get("http://localhost:3001/crudCitas/getEmpleados", {})
            .then((empleado) => {
                setEmpleados(empleado.data || []);
            })
            .catch((error) => {
                console.error("Error obteniendo empleados:", error);
            });
    };



    /* SOLICITA LOS HORARIOS DISPONIBLES EN LA BASE DE DATOS */
    const getHorario = (fecha) => {
        if (!fecha) return;

        Axios.get("http://localhost:3001/crudCitas/getHorarios", {
            params: { fecha: fecha },
        })
            .then((horario) => {
                setHorarios(horario.data || []);
            })
            .catch((error) => {
                console.error("Error obteniendo horarios:", error);
            });
    };
    const getConsultas = () => {
        Axios.get("http://localhost:3001/crudCitas/getTipoConsulta", {})
            .then((response) => {
                setConsultas(response.data || []);
            })
            .catch((error) => {
                console.error("Error obteniendo tipos de consulta:", error);
            });
    };


    const months = [
        "Enero", "Febrero", "Marzo", "Abril",
        "Mayo", "Junio", "Julio", "Agosto",
        "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const renderCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Configurar primer y último día del mes
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const days = [];

        // Días del mes anterior
        for (let x = firstDay.getDay(); x > 0; x--) {
            const prevMonthDay = new Date(year, month, -x + 1).getDate();
            days.push({
                day: prevMonthDay,
                type: 'prev'
            });
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            const currentDayDate = new Date(year, month, i);

            let type = 'current';
            if (currentDayDate < today &&
                currentDayDate.getFullYear() === today.getFullYear() &&
                currentDayDate.getMonth() === today.getMonth() &&
                i < today.getDate()) {
                type = 'prev'; // Días anteriores a hoy
            } else if (
                i === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {
                type = ''; // Día actual
            }

            days.push({
                day: i,
                type: type,
                isSelected: selectedDate &&
                    selectedDate.getDate() === i &&
                    selectedDate.getMonth() === month
            });
        }

        // Días del próximo mes
        const remainingSlots = 42 - days.length; // Asegurar 6 filas de días
        for (let j = 1; j <= remainingSlots; j++) {
            days.push({
                day: j,
                type: 'sig'
            });
        }

        return days;
    };

    const handleDayClick = (day, type) => {
        // Solo permitir selección de días del mes actual
        if (type === 'current' || type === 'today') {
            const newSelectedDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
            );
            setSelectedDate(newSelectedDate);
            setFecha(newSelectedDate.toISOString().split("T")[0]);
            console.log(newSelectedDate.toISOString().split("T")[0]);
        }
    };

    const changeMonth = (direction) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + direction);
            return newDate;
        });
    };

    const canGoToPreviousMonth = () => {
        const today = new Date();
        return (
            currentDate.getFullYear() > today.getFullYear() ||
            (currentDate.getFullYear() === today.getFullYear() &&
                currentDate.getMonth() > today.getMonth())
        );
    };

    const goToToday = () => {
        setCurrentDate(new Date());
        setSelectedDate(null);
        setFecha(null);
    };

    /* MUESTRA LOS HORARIOS COMO BOTONES */
    function listaHorario(horarios) {
        return (
            <div className="horarios-container">
                <h4><b>Citas para el {fecha}</b></h4>
                {horarios.map((horario, index) => (
                    <button
                        type="button"
                        className={`seleccionarHorarioCalendario ${selectHorario && horario.hora === hora ? "activo" : ""
                            }`}
                        key={index}
                        onClick={() => {
                            if (!selectHorario) {
                                setHora(horario.hora);
                                setSelectHorario(true);
                                setIdHorario(horario.id);
                            } else {
                                setHora("");
                                setSelectHorario(false);
                                setIdHorario([]);
                            }
                        }}
                    >
                        {horario.hora}
                    </button>
                ))}
            </div>
        );
    }

    function validarFechas(fecha) {
        if (!fecha) return false;

        const fechaActual = new Date();
        const fechaSeleccionada = new Date(fecha);
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaActual.getDate() + 21);

        return fechaSeleccionada > fechaActual && fechaSeleccionada <= fechaLimite;
    }

    function listaTipoConsultas(consulta) {
        return (
            <select
                onChange={(event) => {
                    setTipoConsulta(event.target.value);
                }}
                className="p-2 border rounded"
                required
            >
                <option value="" selected="" disabled="">Seleccione tipo de consulta</option>
                {consulta.map((consultas, index) => (
                    <option value={consultas.idtipoConsulta} key={index}>
                        {consultas.nombre}
                    </option>
                ))}
            </select>
        );
    }
    function listaEmpleados(empleados) {
        return (
            <select
                onChange={(event) => {
                    setDocumentoOftalmologo(event.target.value);
                }}
                type="number"
                className="p-2 border rounded"
                required
            >
                <option value="" selected="" disabled="">Seleccione un empleado</option>
                {empleados.map((empleado, index) => (
                    <option value={empleado.numeroDocumento} key={index}>
                        {empleado.nombre}
                    </option>
                ))}
            </select>
        );
    }

    useEffect(() => {
        getEmpleado();
        setDocumentoCliente(id)
        getConsultas();
        if (fecha) getHorario(fecha);
    }, [fecha, id]);

    return (
        <div>
            <div className='navBar'>
                <nav className="navbar navbar-dark bg-danger">
                    <div className="container-fluid">
                        <Link to="/IndexCliente" className="navbar-toggler">
                            <div className='BackButton'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                </svg>
                            </div>
                        </Link>
                    </div>
                </nav>
            </div>

            <div className='bodyAgendar'>
                <div className='calendar'>
                    <div><h1>Agende su cita</h1>
                        <p>Seleccione el día en el que desea su cita</p>
                    </div>

                    <div className="containerCalendario">
                        <div className="calendario">
                            <div className="header">
                                <div className="mes">
                                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                                </div>
                                <div className="btns">
                                    <div className="btn today-btn" onClick={goToToday}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-event-fill" viewBox="0 0 16 16">
                                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" />
                                        </svg>
                                    </div>

                                    {canGoToPreviousMonth() && (
                                        <div className="btn prev-btn" onClick={() => changeMonth(-1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="btn next-btn" onClick={() => changeMonth(1)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="weekdays">
                                <div className="day">Dom</div>
                                <div className="day">Lun</div>
                                <div className="day">Mar</div>
                                <div className="day">Mie</div>
                                <div className="day">Jue</div>
                                <div className="day">Vie</div>
                                <div className="day">Sab</div>
                            </div>
                            <div className="dias">
                                {renderCalendarDays().map((dayObj, index) => (
                                    <div
                                        key={index}
                                        className={`dia ${dayObj.type} 
                                    ${dayObj.isSelected ? 'selected' : ''} 
                                    ${dayObj.type === 'today' ? 'today' : ''}`}
                                        onClick={() => { handleDayClick(dayObj.day, dayObj.type); }}
                                    >
                                        {dayObj.day}
                                    </div>
                                ))}
                            </div>

                        </div>


                    </div>

                </div>
                <div className="agendar activo" >
                    {fecha ?( horarios.length > 0  ?
                        <form method="POST" role="form" onSubmit={(e) => { e.preventDefault(); addCita(); }}>
                            <div className='horariosCalendario'>
                                {listaHorario(horarios)}
                            </div>

                            <div className='tipoConsultaCalendario'>
                                <h4>Tipo de consulta</h4>
                                <div>
                                    {listaTipoConsultas(consultas)}
                                </div>
                            </div>

                            <div className='tipoConsultaCalendario'>
                                <h4>Tipo de consulta</h4>
                                <div>
                                    {listaEmpleados(empleados)}
                                </div>
                            </div>

                            <button
                                className="btn btn-primary mt-3"
                                type="submit"
                                disabled={!idHorario || !tipoConsulta || !hora || !NumeroDocumentoOftalmologo}
                            >
                                Agendar
                            </button>
                        </form>: "No citas disponibles para el día seleccionado" ): "Porfavor seleccione una cita"}

                </div>
            </div>
        </div>
    );
}

export default AgendarCita;