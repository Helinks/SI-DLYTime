import './Css/indexPagina.css';
import { Link } from "react-router-dom";
import Axios from 'axios';
import React, { useState } from 'react';
import img1 from "../img/9.jpg"



function AdminClientes() {
  const [mNull, setMNull] = useState('');
  const [message, setMessage] = useState('');
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
        const response = await Axios.post('http://localhost:3001/enviarCorreo/enviar-soporte', {
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
  }
    ;



  return (
    <div className='pagina'>
      <div class="collapse" id="navbarToggleExternalContent">
        <div class="bg-dark p-4">
          <Link to="/Login" className="boton-Index" id="links">Iniciar sesión</Link>
          <Link to="/SignIn" className="boton-Index" id="links">Registrarse</Link>
          <button className="boton-Index" id="links" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-bs-whatever="@mdo">Soporte</button>
        </div>
      </div>
      <nav class="navbar navbar-dark bg-danger">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

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

      <div className='cuerpo-Index1'>
        <img src={img1} className="custom-img1-Index" alt="Imagen 1" />
        <p className="texto-superpuesto">TusLentesShop</p>
      </div>

      <div className='body-cuerpo2' >
        <div className='horarios'>
          <br></br>
          <h1 style={{ margin: 0 }}>Horarios de Atención</h1>
          <br />
          <div class="horarios-row">
            <h5>Lunes:</h5>
            <h5>10a.m - 7:30p.m</h5>
          </div>
          <div class="horarios-row">
            <h5>Martes:</h5>
            <h5>10a.m - 7:30p.m</h5>
          </div>
          <div class="horarios-row">
            <h5>Miércoles:</h5>
            <h5>10a.m - 7:30p.m</h5>
          </div>
          <div class="horarios-row">
            <h5>Jueves:</h5>
            <h5>10a.m - 7:30p.m</h5>
          </div>
          <div class="horarios-row">
            <h5>Viernes:</h5>
            <h5>10a.m - 7:30p.m</h5>
          </div>
          <div class="horarios-row">
            <h5>Sábado:</h5>
            <h5>10a.m - 7:30p.m</h5>
          </div>
          <div class="horarios-row">
            <h5>Domingo:</h5>
            <h5>10a.m - 7:30p.m</h5>
          </div>
        </div>
        <div className='ayuda'>
          <br></br>
          <h1>Como podemos Ayudarte </h1>
          <div className='ayuda-options'>
            <button className="boton-Index1"><h5>Asesoria Personalizada</h5></button>
            <button className="boton-Index1"><h5>Jornadas de Salud Visual</h5></button>
            <button className="boton-Index1"><h5>Lentes y Monturas</h5></button>
          </div>
        </div>
      </div>
      <div className='Ubicacion' >
        <h2>Cra. 78k #35A - 82sur, Bogotá</h2>
      </div>
      <div className='contenedor-mapa-cuerpo3'>
        <div className='Contenedor-mapa'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.8265376707536!2d-74.15526952407288!3d4.6250172953497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9e9e99c8c65d%3A0xd258c208c28cee9d!2sCra.%2078k%20%2335D29%2C%20Kennedy%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1728793972225!5m2!1ses!2sco" loading="lazy" title="mapa" className='mapa'></iframe>
        </div>
        <div className='cuerpo-Index3'>
          <br />
          <br />
          <br />
          <br />
          <br /><h1>¿Algun problema?</h1>
          <br />
          <br />
          <br />
          Si tienes algún problema o necesitas ayuda, no dudes en contactar <br /> con nuestro equipo de soporte. ¡Estamos aquí para ayudarte!
          <div className='boton-soporte2'>
            <button className="boton-Index" id="links" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-bs-whatever="@mdo">Soporte</button>
          </div>
        </div>
      </div>

      <div className='piece'>
        <div className='iconos'>
          {/* icono de instagram */}
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="60" viewBox="0 0 50 50">
            <a href='https://www.instagram.com/tuslentesshop/' target='_blank' rel="noopener noreferrer">
              <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
            </a>
          </svg>
          {/* icono de facebook */}
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="60" viewBox="0 0 50 50">
            <a href='https://www.facebook.com/tuslentesshop' target='_blank' rel="noopener noreferrer">
              <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
            </a>
          </svg>
        </div>
      </div>
    </div>

  );
}

export default AdminClientes;
