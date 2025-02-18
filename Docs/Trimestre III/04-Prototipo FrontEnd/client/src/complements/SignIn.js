import React from 'react';
import './Css/signIn.css';
import { Link } from 'react-router-dom';

function SignIn() {
  return (
    <div className="body-registro">
      <div className="contenedor-formulario-r">
        <div className="information-r">
          <div className="izquierda-r">
            <h2>¿Ya tienes una cuenta?</h2>
            <p>
              <Link to="/Login">
                <input type="button" value="Iniciar Sesión" id="sign-in" />
              </Link>
            </p>
          </div>
        </div>
        <div className="derecha-r">
          <h1 id="Titulo-r">
            <b>Registrarse</b>
          </h1>
          <form className="form-r">
            <div className="Contenedor-registros">
              <div className="row g-2">
                <div className="col-md">
                  <input type="text" className="form-control" placeholder="Nombres" />
                </div>
                <div className="col-md">
                  <select className="form-select" aria-label="Tipo de Documento">
                    <option>Tipo de Documento:</option>
                    <option value="1">C.C</option>
                    <option value="2">T.I</option>
                    <option value="3">C.E</option>
                  </select>
                </div>
              </div>
              <div className="row g-2">
                <div className="col-md">
                  <input type="text" className="form-control" placeholder="Apellidos" />
                </div>
                <div className="col-md">
                  <input type="number" className="form-control" placeholder="Número de Documento" />
                </div>
              </div>
              <div className="row g-2">
                <div className="col-md">
                  <input type="email" className="form-control" placeholder="Correo Electrónico" />
                </div>
                <div className="col-md">
                  <input type="password" className="form-control" placeholder="Contraseña" />
                </div>
              </div>
              <div className="row g-2">
                <div className="col-md">
                  <select className="form-select" aria-label="Género">
                    <option value="">Tipo de Género</option>
                    <option value="1">Hombre</option>
                    <option value="2">Mujer</option>
                    <option value="3">Otro</option>
                  </select>
                </div>
                <div className="col-md">
                  <input type="password" className="form-control" placeholder="Confirmar Contraseña" />
                </div>
              </div>
            </div>
            <div className="boton-registro">
              <button type="button" className="Registrar-r">Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
