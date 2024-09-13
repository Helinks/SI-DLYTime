import { Link, Outlet, Route, Routes } from 'react-router-dom';
import './Css/signIn.css'
export let correo = "";
export let password = "";

function Registrar() {

  correo = document.getElementById("correo").value;
  password = document.getElementById("password").value;


  

  return (
    correo,
    password

  )
}

function SignIn() {
  return (

    <div className="body-registro">
      <div className="contenedor-formulario-r">
        <div className="information-r">
          <div className="izquierda-r">
            <h2>¿Ya tienes una cuenta?</h2>
            <p>
              {/* Uso de Link en lugar de a */}
              <Link to="/">
                <input type="button" value="Iniciar Sesión" id="sign-in" />
              </Link>
            </p>
          </div>
        </div>
        <div className="derecha-r">
          <h1 id="Titulo-r"><b>Registrarse</b></h1>
          <form className="form-r" >
            <div class="Contenedor-registros" >
              <div class="row g-2">
                <div class="col-md">
                  <input type="text" class="form-control" id="floatingInputGrid" placeholder="Primer Nombre" />
                </div>
                <div class="col-md">
                  <select class="form-select" id="floatingSelectGrid" aria-label="Floating label select example">
                    <option >Tipo de Documento:</option>
                    <option value="1">C.C</option>
                    <option value="2">T.I</option>
                    <option value="3">C.E</option>
                  </select>
                </div>
              </div>
              <div class="row g-2">
                <div class="col-md">
                  <input type="text" class="form-control" id="floatingInputGrid" placeholder="Primer Apellido" />
                </div>
                <div class="col-md">
                  <input type="Number" class="form-control" id="floatingInputGrid" placeholder="Número de Documento" />
                </div>
              </div>
              <div class="row g-2">
                <div class="col-md">
                  <input type="email" class="form-control" id="correo" placeholder="Correo Electronico" />
                </div>
                <div class="col-md">
                  <input type="password" class="form-control" id="password" placeholder="Password" />
                </div>
              </div>
              <div class="row g-2">
                <div class="col-md">
                  <select class="form-select" id="floatingSelectGrid" aria-label="Floating label select example" >
                    <option >Tipo de Genero</option>
                    <option value="1">Hombre</option>
                    <option value="2">Mujer</option>
                    <option value="3">Otro.</option>
                  </select>
                </div>
                <div class="col-md">
                  <input type="password" class="form-control" id="floatingPassword" placeholder="Confimarción Password" />
                </div>
              </div>
            </div>
          </form>
          <div class="boton-registro" >
            <Link to="/">
              <button className="Registrar-r" onClick={Registrar}>Registrarse</button>
            </Link>

          </div>

          {/* Uso de Link para navegación */}
        </div>
      </div>

      {/* Esto renderizará otros componentes hijos si se usan en rutas */}
      <Outlet />
    </div>

  );
}

export default (SignIn);