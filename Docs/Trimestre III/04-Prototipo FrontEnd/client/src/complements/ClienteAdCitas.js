// src/components/ClienteAdCitas.js
import React from "react";
import "./Css/StyleAdminCitas.css";
import { Link } from "react-router-dom";

function ClienteAdCitas() {
  return (
    <div className="Body">
      <div className="navBar">
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
                <div className="BackButton">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    className="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    />
                  </svg>
                </div>
              </Link>
            </button>
          </div>
        </nav>
      </div>

      <div className="ClientesTable">
        <h4>Mensaje de información aquí</h4>
        <table className="table">
          <thead>
            <tr className="tr1">
              <th scope="col">Fecha/Hora</th>
              <th scope="col">Paciente</th>
              <th scope="col">Oftalmologo</th>
              <th scope="col">TipoConsulta</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">--/--/----</th>
              <td>Nombre Cliente</td>
              <td>Nombre Oftalmologo</td>
              <td>Tipo de Consulta</td>
              <td>
                <div className="actions">
                  <button
                    type="button"
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal2"
                  >
                    Detalles
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Detalles
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Fecha: </strong> --/--/----
              </p>
              <p>
                <strong>Hora: </strong> --:--
              </p>
              <p>
                <strong>Nombre del paciente: </strong> Nombre Cliente
              </p>
              <p>
                <strong>Nombre del oftalmologo: </strong> Nombre Oftalmologo
              </p>
              <p>
                <strong>Tipo de consulta: </strong> Tipo de Consulta
              </p>
              <p>
                <strong>Direccion: </strong> Dirección aquí
              </p>
              <p>
                <strong>Estado: </strong> Estado de la Cita
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClienteAdCitas;
