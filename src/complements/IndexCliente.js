import Axios from 'axios';
import React, { useState } from 'react';
import './Css/IndexClStyle.css';
import { Link } from "react-router-dom";
import './Css/headerUsersStyle.css';
import CerrarSesion from "./EliminarSesion";
import img1 from "../img/15.jpg"

function IndexCliente() {

  const [message, setMessage] = useState('');
  const [mNull, setMNull] = useState('');
  const [email, setEmail] = useState('');
  const [problem, setProblem] = useState('');

  const cleanMessage = async () => {
    setMNull('');
  }

  const handleSendEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setMNull('Por favor ingresa tu correo')
    } else if (!emailRegex.test(email)) {
      setMNull('Por favor ingresa un correo valido')
    } else if (!message || !problem) {
      setMNull('Por favor llena todos los campos')
    }
    else {
      setMNull('')
      try {
        const response = await Axios.post('https://backenddlytime-efgpffakcxe2d9e9.brazilsouth-01.azurewebsites.net/enviarCorreo/enviar-soporte', {
          to: 'aroca3282@gmail.com',
          subject: 'Soporte desde el sistema',
          message,
          email,
          problem
        }
        );
        alert(response.data.message); // Notificar al usuario
        setMessage(''); // Limpiar el mensaje

      } catch (error) {
        console.error(error);
        alert('Hubo un error al enviar el mensaje.');
      }
    }
  };

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

      <div class="barCliente">
        <div class="bg-light p-4">
          <div class="optionsCliente">

            <div className='img-1C'>
              <img src={img1} className="custom-img1" alt="Imagen 1" />
            </div>

            <div className='option1'>
              <Link to="/AgendarCita" className="btn btn-outline-custom">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
                  <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>
              </Link>
              <Link to="/AgendarCita" className='btn btn-outline-custom1'>
                Agendar Cita
              </Link>
            </div>
            <div className='option2'>
              <Link to="/ClienteAdCitas" className="btn btn-outline-custom">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                  <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                  <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                </svg>
              </Link>
              <Link to="/ClienteAdCitas" className='btn btn-outline-custom1'>
                Administrar Citas
              </Link>
            </div>
            <div className='option3'>
              <div class="btn btn-outline-custom" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-bs-whatever="@mdo">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" class="bi bi-person-raised-hand" viewBox="0 0 16 16">
                  <path d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a1 1 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207" />
                  <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                </svg>
              </div>
              <button className='btn btn-outline-custom1' id="links" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-bs-whatever="@mdo">
                Soporte
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Soporte</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={cleanMessage}></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">Digita un correo al que te podamos contactar:</label>
                  <input type="email" id="TextInputEmail" class="form-control"
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">Tipo de problema:</label>
                  <select class="form-control" id="message-text"
                    onChange={(e) => setProblem(e.target.value)}
                  >
                    <option></option>
                    <option>Problema al iniciar sesión</option>
                    <option>Problema al agendar una cita</option>
                    <option>Problema con mis datos</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">Mensaje:</label>
                  <textarea class="form-control" id="message-text" value={message}
                    onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>

                <h5>{mNull}</h5>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={cleanMessage}>Cerrar</button>
              <button type="button" class="btn btn-primary" onClick={handleSendEmail}>Enviar</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default IndexCliente
