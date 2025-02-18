// src/components/AdministrarHorarios.js
import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import './Css/administrarHorarios.css';
import { Link } from "react-router-dom";

const AdministrarHorarios = () => {
  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const fecha = new Date();
  const rol = localStorage.getItem("userRole");

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
              <Link to={rol == 3 ? "/IndexAdmin" : "/IndexEmpleado"}>
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
          <button className="nav-button">
            <ChevronLeft className="icon" />
          </button>
          <h2 className="date-title">
            {`${meses[fecha.getMonth()]} ${fecha.getFullYear()}`}
          </h2>
          <button className="nav-button">
            <ChevronRight className="icon" />
          </button>
        </div>
        <div className="view-options">
          <button className="view-button active">Semanal</button>
          <button className="view-button">Diaria</button>
          <button className="today-button">
            <Calendar className="icon" />
            Hoy
          </button>
        </div>
        <div className="calendar-container">
          <div className="calendar-header">
            {diasSemana.map((dia, index) => (
              <div key={index} className="day-box">
                <div className="day-name">{dia}</div>
                <div className="day-number">--</div>
              </div>
            ))}
          </div>
          <div className="calendar-body">
            <div className="hour-row">
              <div className="hour-label">--:--</div>
              <div className="day-grid">
                <div className="day-cell"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdministrarHorarios;
