import React from 'react';
import './Css/indexPagina.css';
import { Link } from "react-router-dom";

function AdminClientes() {
  return (
    <div className='pagina'>
      <nav class="navbar navbar-dark bg-danger">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="navbar-brand">
            <h2>Tuslentes shop</h2>
          </div>
          <div class="navbar-nav">
            <div className="d-flex">
              <Link to="/Login" className="nav-link" id="links">Iniciar sesión</Link>
              <Link to="/SignIn" className="nav-link" id="links">Registrarse</Link>
              <Link to="/Soporte" className="nav-link" id="links">Soporte</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className='body-cuerpo' >
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
        </div>
        <div className='Ubicacion' >
          <h2>¿Donde estamos Ubicados?</h2>
          <h2>Cra. 78k #35A - 82sur, Bogotá</h2>
        </div>
        <div className='Contenedor-mapa'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.8265376707536!2d-74.15526952407288!3d4.6250172953497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9e9e99c8c65d%3A0xd258c208c28cee9d!2sCra.%2078k%20%2335D29%2C%20Kennedy%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1728793972225!5m2!1ses!2sco" loading="lazy" title="mapa" className='mapa'></iframe>
        </div>
      </div>
      <div className='piece'>
        <h1>Tus lentes shop</h1>
        <Link to="/Login" className="nav-link text-white mx-2  lin">Inicio</Link>
        <Link to="/Soporte" className="nav-link text-white mx-2 lin">Soporte</Link>
        <Link to="/AcercaDe" className="nav-link text-white mx-2 lin">Acerca de</Link>
        <h2>Ubicacion</h2>
        <h2>Cra. 78k #35A - 82sur, Bogotá</h2>
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
