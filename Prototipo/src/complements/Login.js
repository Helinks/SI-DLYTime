
import './Css/loginStyle.css';
import { Outlet, Link , useNavigate} from "react-router-dom";
import {persona} from './SignIn';




function Login() {
  
  
const navigate = useNavigate();
function validar(){
  (persona[0].correo === (document.getElementById("correo_i").value) &&  persona[0].password ===(document.getElementById("password_i").value) 
  ? navigate("/IndexCliente"): 
  ((persona[1].correo === (document.getElementById("correo_i").value) &&  persona[1].password ===(document.getElementById("password_i").value) 
  ? navigate("/IndexAdmin"):
  ((persona[2].correo === (document.getElementById("correo_i").value) &&  persona[2].password ===(document.getElementById("password_i").value) 
  ? navigate("/IndexEmpleado"): navigate("/SignIn")
  )))));
  
}
  
  /* alert(persona[0].nombre+persona[0].apellido+persona[0].correo+persona[0].tipodocumento+persona[0].documento+persona[0].password+persona[0].genero) muestra como funciona el JSON exportado */
  return (
    <div>
        <>
          <div className="body-login" style={{ backgroundImage: 'url(img/fondo.png)' }}>
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
                <form className="form" method="POST" noValidate>
                  <h1 id="Titulo"><b>Iniciar Sesión</b></h1>
                  <div className="inputs">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">@</span>
                      <input type="email" className="form-control" placeholder="Correo" aria-label="Username" aria-describedby="basic-addon1" id="correo_i" />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">⌘</span>
                      <input type="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" id="password_i" />
                    </div>
                  </div>
                </form>
                <div className="botones-inicio">
                  <button type="button" className="iniciar" onClick={validar}>Iniciar sesión</button>
                  <Link to="/SignIn">
                    <button type="button" className="olvidar" name="register">Olvidaste tu contraseña </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      <Outlet />
    </div>
  );
}

export default Login;
