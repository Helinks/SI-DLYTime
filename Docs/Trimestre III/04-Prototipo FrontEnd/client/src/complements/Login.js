import React from 'react';
import './Css/loginStyle.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <div className="body-login" style={{ backgroundImage: "url(img/fondo.png)" }}>
        <div className="contenedor-formulario">
          <div className="information">
            <div className="izquierda">
              <h2>¿Ya tienes una cuenta?</h2>
              <Link to="/SignIn">
                <input type="button" value="Registrarme" id="sign-in" />
              </Link>
            </div>
          </div>
          <div className="derecha">
            <form className="form" noValidate>
              <h1 id="Titulo">
                <b>Iniciar Sesión</b>
              </h1>
              <div className="inputs">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">@</span>
                  <input type="email" className="form-control" placeholder="Correo" />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">⌘</span>
                  <input type="password" className="form-control" placeholder="Password" />
                </div>
              </div>
            </form>
            <div className="botones-inicio">
              <button type="submit" className="iniciar">Iniciar sesión</button>
              <button type="button" className="olvidar">Olvidaste tu contraseña</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
