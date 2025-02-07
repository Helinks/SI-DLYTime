import Axios from 'axios';
import React, { useState } from 'react';
import './Css/IndexClStyle.css';
import { Link } from "react-router-dom";
import './Css/headerUsersStyle.css';
import CerrarSesion from "./EliminarSesion";
import CerrarSesion from "./EliminarSesion";

function IndexCliente() {

  const [message, setMessage] = useState('');

  const handleSendEmail = async () => {

    try {
      const response = await Axios.post('http://localhost:3001/enviarCorreo/enviar-soporte', {
        to: 'dlytime987@gmail.com',
        subject: 'Soporte desde el sistema',
        message,
      }
      );
      alert(response.data.message); // Notificar al usuario
      setMessage(''); // Limpiar el mensaje

    } catch (error) {
      console.error(error);
      alert('Hubo un error al enviar el mensaje.');
    }
  };

  return (
    <div>
      <nav class="navbarUsers navbar-dark bg-danger">
        <Link to="/Perfil">
          <div class="users">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
            </svg>
          </div>
        </Link>
        <CerrarSesion />
          <CerrarSesion />
      </nav>

      <div class="welcomeCliente"><h1>Bienvenido <i><b></b></i></h1></div>

      <div class="barCliente">
        <div class="bg-danger p-4">
          <div class="optionsCliente">

            <Link to="/AgendarCita" className="btn btn-outline-light"><svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
              <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
            </svg><br /><h5>Agendar Cita</h5></Link>
            <Link to="/ClienteAdCitas" className="btn btn-outline-light"><svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
              <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
              <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
            </svg><br /><h5>Administrar Citas</h5></Link>
            <div class="btn btn-outline-light" id="links" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"><svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" class="bi bi-person-raised-hand" viewBox="0 0 16 16">
              <path d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a1 1 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207" />
              <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
            </svg><br /><h5>Soporte</h5></div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Soporte</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">Recipiente:</label>
                  <input type="text" id="disabledTextInput" class="form-control" value='dlytime987@gmail.com' />
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">Mensage:</label>
                  <textarea class="form-control" id="message-text" value={message}
                  onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" onClick={handleSendEmail}>Enviar mensaje</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default IndexCliente
