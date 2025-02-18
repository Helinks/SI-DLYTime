import React from 'react';
import './Css/StyleCrudEmpleados.css';
import { Link } from 'react-router-dom';

function CrudEmpleados() {
  return (
    <div>
      <div className='barra-head'>
        <nav className="navbar navbar-dark bg-danger">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="navbar-brand">
              <Link to="/IndexAdmin">
                <div className='BackButton'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5.5 0 0 0 9.5 2h-8A1.5.5 0 0 0 0 3.5v9A1.5.5 0 0 0 1.5 14h8a1.5.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <table className="table table-striped" id="TablaEmpleados">
        <thead>
          <tr>
            <th scope="row">Documento</th>
            <th>Tipo Identificación</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Género</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>11223344</td>
            <td>Cédula</td>
            <td>Carlos</td>
            <td>Ramírez</td>
            <td>Masculino</td>
            <td>carlos.ramirez@example.com</td>
            <td>555-7890</td>
            <td>Activo</td>
            <td>
              <button className='btn btn-warning'>Editar</button>
              <button className='btn btn-danger'>Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CrudEmpleados;