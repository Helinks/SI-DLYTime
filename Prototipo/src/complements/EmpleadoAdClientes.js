import React from 'react';
import './Css/StyleAdminClientes.css';
import { persona } from './SignIn';
import { Link } from "react-router-dom";

function AdminClientes() {
  return (
    <div className='Body'>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                  </svg>
                </div>
              </Link>
            </button>
          </div>
        </nav>
      </div>

      <div className='ClientesTable'>
        <table className="table">
          <thead>
            <tr className='tr1'>
              <th scope="col">TipoDocumento</th>
              <th scope="col">NoDocumento</th>
              <th scope="col">Paciente</th>
              <th scope="col">HistorialClinico</th>
            </tr>
          </thead>
          <tbody>
            {persona.map((p, index) => (
              <tr key={index}>
                <th scope="row">{p.tipodocumento === 1 ? 'CC' : p.tipodocumento === 2 ? 'TI' : 'Otro'}</th>
                <td>{p.documento}</td>
                <td>{p.nombre} {p.apellido}</td>
                <td>
                  <button type="button" className="btn1" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Ver Historial</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">HistorialClinico</h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <select class="form-select" multiple aria-label="multiple select example">
                    <option selected>Seleccionar HistorialClinico</option>
                    <option value="1">1.pdf</option>
                    <option value="2">2.pdf</option>
                    <option value="3">3.pdf</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn2" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn1">Abrir</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default AdminClientes;
