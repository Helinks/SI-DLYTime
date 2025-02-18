// src/components/AgendarCita.js
import React from 'react';
import { Link } from "react-router-dom";
import './Css/agendarCitas.css';

function AgendarCita() {
  const currentDate = new Date();
  const months = [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

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

      <div className="containerCalendario">
        <div className="calendario">
          <div className="header">
            <div className="mes">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </div>
            <div className="btns">
              <div className="btn today-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-event-fill" viewBox="0 0 16 16">
                  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" />
                </svg>
              </div>
              <div className="btn prev-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>
              </div>
              <div className="btn next-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="weekdays">
            {diasSemana.map((dia, index) => (
              <div key={index} className="day">{dia}</div>
            ))}
          </div>
          <div className="dias">
            {[...Array(42)].map((_, index) => (
              <div key={index} className="dia">--</div>
            ))}
          </div>
        </div>
      </div>

      <div className='horariosCalendario'>
        <h4>Horarios disponibles</h4>
        <button className="seleccionarHorarioCalendario">--:--</button>
      </div>

      <div className='tipoConsultaCalendario'>
        <h4>Tipo de consulta</h4>
        <select className="form-control">
          <option>-- Seleccione --</option>
        </select>
      </div>

      <button className="agendar-btn" disabled>Agendar</button>
    </div>
  );
}

export default AgendarCita;
