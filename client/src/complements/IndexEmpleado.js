import React from 'react';
import './Css/IndexEmStyle.css';
import { Link } from "react-router-dom";
import './Css/headerUsersStyle.css';
import CerrarSesion from "./EliminarSesion";
import img1 from "../img/10.jpg"

function IndexEmpleado() {

  return (
    <div>
      <div class="collapse" id="navbarToggleExternalContent">
        <div class="bg-dark p-4">
          <Link to="/Perfil"><h5 class="text-white h4">Perfíl</h5></Link>
          <h5 class="text-white h4"><CerrarSesion /></h5>
        </div>
      </div>
      <nav class="navbar navbar-dark bg-danger">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div class="barEmpleado">
        <div class="bg-light p-4">
          <div class="optionsEmpleado">

            <div className='img-1C'>
              <img src={img1} className="custom-img1" alt="Imagen 1" />
            </div>

            <div className='option1'>
              <Link to="/CrudClientes_Empleado" className="btn btn-outline-custom">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                </svg>
              </Link>
              <Link to="/CrudClientes_Empleado" className='btn btn-outline-custom1'>
                Gestionar Clientes
              </Link>
            </div>

            <div className='option2'>
              <Link to="/CrudCita" className="btn btn-outline-custom">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                  <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                  <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                </svg>
              </Link>
              <Link to="/CrudCita" className='btn btn-outline-custom1'>
                Administrar Citas
              </Link>
            </div>

            <div className='option3'>
              <Link to="/AdministrarHorarios" className="btn btn-outline-custom">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                </svg>
              </Link>
              <Link to="/AdministrarHorarios" className='btn btn-outline-custom1'>
                Administrar Horarios
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexEmpleado;
