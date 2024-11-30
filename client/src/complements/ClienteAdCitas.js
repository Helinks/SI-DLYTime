import React from 'react'
import './Css/StyleAdminCitas.css'
import { Link } from "react-router-dom";

function ClienteAdCitas() {
  const citas = [
    {
      fechaHora: '2024-09-30 10:00 AM',
      tipoConsulta: 'Lentes y Monturas',
    }
  ];

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
              <Link to="/IndexCliente">
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
              <th scope="col">Fecha/Hora</th>
              <th scope="col">TipoConsulta</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita, index) => (
              <tr key={index}>
                <td>{cita.fechaHora}</td>
                <td>{cita.tipoConsulta}</td>
                <td>
                  <button type="button" className="btn1" data-bs-toggle="modal" data-bs-target="#exampleModal">Solicitar Cambio</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Editar Cita</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="fechaHora" className="form-label">Fecha/Hora</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="fechaHora"
                    name="fechaHora"
                    value="2024-09-15T10:00"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tipoConsulta" className="form-label">Tipo de Consulta</label>
                  <select className="form-select" id="tipoConsulta" name="tipoConsulta">
                    <option value="Lentes y Monturas">Tipos de Consulta</option>
                    <option value="Lentes y Monturas">Lentes y Monturas</option>
                    <option value="Accesoría Personalizada">Accesoría Personalizada</option>
                    <option value="Jornada de Salud Visual">Jornada de Salud Visual</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn2" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn1">Solicitar Cambio</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClienteAdCitas;
