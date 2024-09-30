import "./Css/loginStyle.css";
import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { alfabeto, invertidos, persona } from "./SignIn";

function Login() {

  /* Desencriptación de la password */
  let rest = "";
  function Desencriptar() {
    let respt = persona[0].password;
    const arreglo = respt.split("");
    for (let i = 0; i < alfabeto.length; i++) {
      const index = alfabeto.indexOf(arreglo[i]);
      if (index === -1) {
        break;
      } else {
        rest += invertidos[index];
      }
    }
  }

  /* Mensaje de errores*/
  const [error, setError] = useState(false);
  function mensaje() {
    let ExCorreo = false;
    let ExPassword = false;
    let i;
    /* Valida si existen los datos ingresados */
    for (i = 0; i < persona.length; i++) {
      if (persona[i].correo === document.getElementById("correo_i").value) {
        ExCorreo = true;
      }
      if (persona[i].password === document.getElementById("password_i").value) {
        ExPassword = true;
      }
    }
    if (ExCorreo || ExPassword) {
      alert("Usuario o Contraseña incorrecto");
    } else {
      alert("Usuario o Contraseña incorrecto");
      navigate("/SignIn");
    }
  }
  const navigate = useNavigate();

  function validar() {
    Desencriptar();
    /*Se valida los campos si estan vacios*/
    if (
      document.getElementById("correo_i").value === "" ||
      document.getElementById("password_i").value === ""
    ) {
      setError(true);
      return;
    }
    setError(false);



    /* Verifica que usuario ingresará */
    persona[0].correo === document.getElementById("correo_i").value &&
      rest === document.getElementById("password_i").value
      ? navigate("/IndexCliente")
      : persona[1].correo === document.getElementById("correo_i").value &&
        persona[1].password === document.getElementById("password_i").value
        ? navigate("/IndexAdmin")
        : persona[2].correo === document.getElementById("correo_i").value &&
          persona[2].password === document.getElementById("password_i").value
          ? navigate("/IndexEmpleado")
          : mensaje();
  }

  return (
    /* Formulario y más.. */
    <div>
      <>
        <div
          className="body-login"
          style={{ backgroundImage: "url(img/fondo.png)" }}
        >
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
                <h1 id="Titulo">
                  <b>Iniciar Sesión</b>
                </h1>
                <div className="inputs">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      @
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Correo"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      id="correo_i"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      ⌘
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      id="password_i"
                    />
                  </div>
                </div>
              </form>
              <div className="botones-inicio">
                <button type="submit" className="iniciar" onClick={validar}>
                  Iniciar sesión
                </button>
                <Link to="/CambiarPass">
                  <button type="button" className="olvidar" name="register">
                    Olvidaste tu contraseña
                  </button>
                </Link>

                {/* Mensaje */}
                {error && (
                  <p className="texto-error">
                    Por favor, complete todos los campos.
                  </p>
                )}

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
