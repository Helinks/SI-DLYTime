import React from 'react';
import './Css/StyleAdminClientes.css';
import { persona } from './SignIn';
import { Link } from "react-router-dom";

function AdminEmpleados() {
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
              <Link to="/IndexAdmin">
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

      <div className='ClientesTable'>
        <table className="table">
          <thead>
            <tr className='tr1'>
              <th scope="col">Tipo Documento</th>
              <th scope="col">No. Documento</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Correo</th>
              <th scope="col">Género</th>
              <th scope="col">Contraseña</th> {/* Añadimos columna de contraseña */}
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {persona[2] && (
              <tr>
                <th scope="row">{persona[2].tipodocumento === 1 ? 'CC' : persona[2].tipodocumento === 2 ? 'TI' : 'Otro'}</th>
                <td>{persona[2].documento}</td>
                <td>{persona[2].nombre}</td>
                <td>{persona[2].apellido}</td>
                <td>{persona[2].correo}</td>
                <td>{persona[2].genero === "1" ? 'Masculino' : persona[2].genero === "2" ? 'Femenino' : 'Otro'}</td>
                <td>{persona[2].password}</td>
                <td>
                  <button type="button" className="btn1" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Modificar</button>
                  <button type="button" className="btn2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Eliminar</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modificar</h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <select className="form-select" aria-label="Tipo de Documento">
                    <option value="">Tipo de Documento</option>
                    <option value="1">CC</option>
                    <option value="2">TI</option>
                    <option value="3">Otro</option>
                  </select>
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder='NoDocumento' />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder='Nombre' />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder='Apellido' />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder='Correo' />
                </div>
                <div className="mb-3">
                  <select className="form-select" aria-label="Género">
                    <option value="">Género</option>
                    <option value="1">Masculino</option>
                    <option value="2">Femenino</option>
                    <option value="3">Otro</option>
                  </select>
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" placeholder='Contraseña' />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn2" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn1">Modificar</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Eliminar</h5>
            </div>
            <div className="modal-body">
              ¿Está seguro de realizar este Cliente?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn2" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn1">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminEmpleados