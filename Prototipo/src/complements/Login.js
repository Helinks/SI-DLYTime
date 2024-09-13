import React from 'react';
import './Css/loginStyle.css';
import { Outlet, Link, Route, Routes } from "react-router-dom";
import { correo, password } from './SignIn';
import IndexAdmin from './IndexAdmin';
// import { Route, Routes } from 'react-router-dom';
// import Home from '';
// import Registro from '';
// import IndexEmpleado from '';
// import IndexCliente from '';

const Validar = () => {


    let correoU = document.getElementById("correo_i").value;
    let passwordU = document.getElementById("password_i").value;
    return (
      <>
  
        {(correoU === correo && password === passwordU) ? <Route path="/IndexAdmin" element={<IndexAdmin/>} />: alert("Los datos no son correctos") }
      </>
    )
  
  }
  
function Login() {
  return (
    <div>
    <body background="img/fondo.png" class="body-login">
      <div class="contenedor-formulario">
        <div class="information">
          <div class="izquierda">
            <h2>¿Ya tienes una cuenta?</h2>
            <Link to="SignIn">
              <p><input type="button" value="Registrarme" id="sign-in" /></p>
            </Link>
          </div>
        </div>
        <div class="derecha">
          <form class="form" method="POST" novalidate>
            <h1 id="Titulo"><b>Iniciar Sesión</b></h1>
            <div class="inputs">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input type="email" class="form-control" placeholder="Correo" aria-label="Username" aria-describedby="basic-addon1" id='correo_i' />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">⌘ </span>
                <input type="password" class="form-control" placeholder="password" aria-label="Username" aria-describedby="basic-addon1" id="password_i" />
              </div>
            </div>
          </form>
          <div class="botones-inicio">
            <button type="button" class="iniciar" onClick={Validar}>Iniciar sesión</button>
            <Link to="/SignIn">
              <button type="button" class="olvidar" name="register">Olvidaste tu contraseña</button>
            </Link>
          </div>
        </div>
      </div>
    </body>
    <Outlet />
  </div>  
  )
}

export default Login
