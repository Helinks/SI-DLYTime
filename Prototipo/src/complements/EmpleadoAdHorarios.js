import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import './Css/administrarHorarios.css';
import { Link } from "react-router-dom";
import { persona } from './SignIn';

const AdministrarHorarios = () => {
  const [fecha, setFecha] = useState(new Date());
  const [vista, setVista] = useState('semanal'); // 'semanal' o 'diaria'
  const [eventosNoDisponibles, setEventosNoDisponibles] = useState(new Set());
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Genera horas de 10:00 a 19:30 en intervalos de 30 minutos
  const horas = Array.from({ length: 19 }, (_, i) => {
    const hora = 10 + Math.floor(i / 2);
    const minutos = (i % 2) * 30;
    return `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
  });

  const obtenerSemana = (date) => {
    const inicio = new Date(date);
    inicio.setDate(inicio.getDate() - inicio.getDay());
    const semana = [];
    for (let i = 0; i < 7; i++) {
      const dia = new Date(inicio);
      dia.setDate(dia.getDate() + i);
      semana.push(dia);
    }
    return semana;
  };

  const cambiarSemana = (delta) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + delta * 7);
    setFecha(nuevaFecha);
  };

  const cambiarDia = (delta) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + delta);
    setFecha(nuevaFecha);
  };

  const irAHoy = () => {
    setFecha(new Date());
  };

  const marcarNoDisponible = () => {
    if (eventoSeleccionado) {
      setEventosNoDisponibles((prev) => new Set(prev).add(eventoSeleccionado));
      setEventoSeleccionado(null);
    }
  };

  const marcarComoDisponible = () => {
    if (eventoSeleccionado) {
      setEventosNoDisponibles((prev) => {
        const newSet = new Set(prev);
        newSet.delete(eventoSeleccionado);
        return newSet;
      });
      setEventoSeleccionado(null);
    }
  };

  const renderizarVistaSemanal = () => {
    const semana = obtenerSemana(fecha);
    return (
      <div className="calendar-container">
        <div className="calendar-header">
          {semana.map((dia, index) => (
            <div key={index} className="day-box">
              <div className="day-name">{diasSemana[dia.getDay()]}</div>
              <div className="day-number">{dia.getDate()}</div>
            </div>
          ))}
        </div>
        <div className="calendar-body">
          {horas.map((hora) => (
            <div key={hora} className="hour-row">
              <div className="hour-label">{hora}</div>
              <div className="day-grid">
                {semana.map((dia, dayIndex) => {
                  const diaSemana = dia.getDay();
                  const esLunes = diaSemana === 1;
                  const esMartes = diaSemana === 2;
                  const esMiercoles = diaSemana === 3;
                  const esJueves = diaSemana === 4;
                  const esViernes = diaSemana === 5;
                  const esSabado = diaSemana === 6;
                  const esDomingo = diaSemana === 0;

                  // Extraer horas y minutos
                  const [horaHora, horaMinutos] = hora.split(':').map(Number);

                  // Solo muestra "Samuel Prieto" en los horarios permitidos
                  const mostrarNombre = (esLunes );

                  const claveEvento = `${dayIndex}-${hora}`;
                  const estaNoDisponible = eventosNoDisponibles.has(claveEvento);

                  const esHoraAzul = hora === "10:00" || hora === "11:00" || hora === "13:00";

                  return (
                    <div key={dayIndex} className="day-cell">
                      {mostrarNombre && (
                        <div
                          className={`event-box ${estaNoDisponible ? 'not-available' : ''} ${esHoraAzul ? 'blue-background' : ''}`}
                          onClick={() => setEventoSeleccionado(claveEvento)}
                        >
                          {persona[2].nombre}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {eventoSeleccionado && (
          <div className="action-container">
            {eventosNoDisponibles.has(eventoSeleccionado) ? (
              <button onClick={marcarComoDisponible}>Marcar como disponible</button>
            ) : (
              <button onClick={marcarNoDisponible}>Marcar como no disponible</button>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderizarVistaDiaria = () => {
    return (
      <div className="daily-view-container">
        <div className="daily-header">
          <div className="day-name-big">{diasSemana[fecha.getDay()]}</div>
          <div className="day-number-big">{fecha.getDate()}</div>
          <div className="month-name">{meses[fecha.getMonth()]}</div>
        </div>
        <div className="daily-body">
          {horas.map((hora) => (
            <React.Fragment key={hora}>
              <div className="hour-label">{hora}</div>
              <div className="hour-slot">
                <div className="event-box">{persona[2].nombre}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className='navBar'>
        <nav className="navbar navbar-dark bg-danger">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <Link to="/IndexEmpleado">
                <div className='BackButton'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                  </svg>
                </div>
              </Link>
            </button>
          </div>
        </nav>
      </div>
      <div className="main-container">
        <div className="nav-bar">
          <button
            onClick={() => vista === 'semanal' ? cambiarSemana(-1) : cambiarDia(-1)}
            className="nav-button"
          >
            <ChevronLeft className="icon" />
          </button>
          <h2 className="date-title">
            {vista === 'semanal'
              ? `${meses[fecha.getMonth()]} ${fecha.getFullYear()}`
              : `${fecha.getDate()} ${meses[fecha.getMonth()]} ${fecha.getFullYear()}`}
          </h2>
          <button
            onClick={() => vista === 'semanal' ? cambiarSemana(1) : cambiarDia(1)}
            className="nav-button"
          >
            <ChevronRight className="icon" />
          </button>
        </div>
        <div className="view-options">
          <button
            onClick={() => setVista('semanal')}
            className={`view-button ${vista === 'semanal' ? 'active' : ''}`}
          >
            Semanal
          </button>
          <button
            onClick={() => setVista('diaria')}
            className={`view-button ${vista === 'diaria' ? 'active' : ''}`}
          >
            Diaria
          </button>
          <button
            onClick={irAHoy}
            className="today-button"
          >
            <Calendar className="icon" />
            Hoy
          </button>
        </div>
        {vista === 'semanal' ? renderizarVistaSemanal() : renderizarVistaDiaria()}
      </div>
    </div>
  );
};

export default AdministrarHorarios;
