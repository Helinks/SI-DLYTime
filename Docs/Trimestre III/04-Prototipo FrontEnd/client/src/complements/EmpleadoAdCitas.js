import React from 'react';
import './Css/StyleAdminCitas.css';
import { Link } from 'react-router-dom';

function EmpleadoAdCitas() {
  return (
    <div className='Body'>
      <div className='navBar'>
        <nav className="navbar navbar-dark bg-danger">
          <div className="container-fluid">
            <Link to="/IndexEmpleado">
              <div className='BackButton'>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5.5 0 0 0 9.5 2h-8A1.5.5 0 0 0 0 3.5v9A1.5.5 0 0 0 1.5 14h8a1.5.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                </svg>
              </div>
            </Link>
          </div>
        </nav>
      </div>

      <div className='ClientesTable'>
        <table className="table">
          <thead>
            <tr className='tr1'>
              <th scope="col">Fecha/Hora</th>
              <th scope="col">NoDocumento</th>
              <th scope="col">Paciente</th>
              <th scope="col">TipoConsulta</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-03-15 10:30 AM</td>
              <td>12345678</td>
              <td>Juan Pérez</td>
              <td>General</td>
              <td>
                <button className='btn btn-warning'>Editar</button>
                <button className='btn btn-danger'>Cancelar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmpleadoAdCitas;
