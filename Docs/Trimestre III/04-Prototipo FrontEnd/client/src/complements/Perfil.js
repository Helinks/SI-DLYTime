import React from 'react';
import './Css/PerfilStyle.css';
import { Link } from 'react-router-dom';

function Perfil() {
  return (
    <div>
      <div className="contenedor-izquierda">
        <div className="contenedor-izquierda2">
          <div className="imagen_perfil">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
            </svg>
          </div>
          <div className="nombre">
            <b>Nombre Apellido</b>
          </div>
        </div>
      </div>
      <div className="contenedor-derecha">
        <div className="titulo">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
          <h2>Cuenta</h2>
        </div>
        <div className="formulario">
          <form>
            <div className="bloque">
              <div>
                <b>Nombre</b><br />
                <input type="text" />
              </div>
              <div>
                <b>Apellido</b><br />
                <input type="text" />
              </div>
            </div>
            <div className="bloque">
              <div>
                <b>Correo</b><br />
                <input type="text" />
              </div>
              <div>
                <b>Teléfono</b><br />
                <input type="text" />
              </div>
            </div>
            <div className="bloque">
              <div>
                <b>Documento</b><br />
                <input type="text" />
              </div>
              <div>
                <b>Genero</b><br />
                <input type="text" />
              </div>
            </div>
          </form>
        </div>
        <div className="botones">
          <div>
            <button>Historial Clinico</button>
          </div>
          <div>
            <Link to="/IndexCliente"><button>Cancelar</button></Link>
            <button type="button">Actualizar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
