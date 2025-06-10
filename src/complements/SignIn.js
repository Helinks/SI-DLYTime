import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Css/signIn.css";
import Emailvalidation from '@everapi/emailvalidation-js'

export function SignIn() {
  const [nombre, setNombre] = useState("");
  const [tipodocumento, setTipoDoc] = useState("");
  const [apellido, setApellido] = useState("");
  const [ndocumento, setDocumento] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmar_password, setConfirmar_password] = useState("");
  const [genero, setGenero] = useState("");
  let [error, setError] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [codigoRe, setCodigoRe] = useState("");

  const navigate = useNavigate();
  let correoVerificado = false;


  const add = (e) => {
    e.preventDefault();
    error = false;
    setError(false);

    // Aquí continua con la verificación de contraseña
    if (password === Confirmar_password) {
    } else {
      setValidationMessage("Contraseña no es igual");
      setError(true);
      return;
    }

    // Validación de Campos Vacios
    if (!nombre || !tipodocumento || !apellido || !ndocumento || !correo || !password || !Confirmar_password || !genero) {
      setValidationMessage("Por favor, complete todos los campos.");
      setError(true);
      return;
    }

    if (ndocumento.length > 10) {
      setValidationMessage("Limite de digitos superado");
      setError(true);
      return;
    }

    const isValidEmail = (correo) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(correo);
    }
    if (!isValidEmail(correo)) {
      setValidationMessage("Por favor cumplir con los requisitos -@- y -.-");
      setError(true);
      return;
    }

    const require = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (require.test(password) === false) {
      setValidationMessage("Contraseña inválida. Debe contener al menos una mayúscula, un número y tener mínimo 8 caracteres.");
      setError(true);
      return;
    }

    /* metodo get */
    const client = new Emailvalidation('ema_live_6WmdRIZwQrF3ji7fd4X89YctsfGTBvGUa9L9JqsX');

    client.info(correo, { catch_all: 0 })
      .then(response => {
        correoVerificado = response.smtp_check;
        console.log(response);
        if (correoVerificado === false) {
          setValidationMessage("El correo electrónico no es válido.");
          setError(true);
        }
      })
      .catch(err => {
        console.error("Error en la validación de correo:", err);
        alert("Hubo un error al verificar el correo. Intenta más tarde.");
      });

    if (error) {
      return
    }
    else {
      /* Envió de correo eléctronico */
      Axios.post("https://backenddlytime-efgpffakcxe2d9e9.brazilsouth-01.azurewebsites.net/enviarCorreo/enviarCorreoRegistro", {
        to: correo,
        subject: "Código para Registro",
      }).then((response) => {
        localStorage.setItem("codeRegister", response.data);

      });
    }

  };

  const codeVericar = async () => {
    let codeRegistro = localStorage.getItem("codeRegister");
  
    if (codeRegistro === codigoRe) {
      try {
        await Axios.post("https://backenddlytime-efgpffakcxe2d9e9.brazilsouth-01.azurewebsites.net/autenticacion/registro", {
          numeroDocumento: ndocumento,
          idRol: 1,
          idTipoIdentificacion: tipodocumento,
          nombre: nombre,
          apellido: apellido,
          idGenero: genero,
          correo: correo,
          clave: password,
        });
  
        localStorage.removeItem("codeRegister");
        alert("Usuario Registrado");
        navigate("/Login");
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setValidationMessage(error.response.data.message);
          setError(true);
        } else {
          setValidationMessage('Ocurrió un error inesperado.');
          setError(true);
        }
      }
    } else {
      setValidationMessage("Código incorrecto, intentelo otra vez");
      setError(true);
      return;
    }
  };



  return (
    /*Formulario*/
    <div>
      <div className='navBar'>
        <nav className="navbar navbar-dark bg-danger">
          <div className="container-fluid">
            <Link to="/" className="navbar-toggler">
              <div className='BackButton'>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                </svg>
              </div>
            </Link>
          </div>
        </nav>
      </div>
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
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombres"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                  <div className="col-md">
                    <select
                      className="form-select"
                      aria-label="Tipo de Documento"
                      value={tipodocumento}
                      onChange={(e) => setTipoDoc(e.target.value)}
                    >
                      <option>Tipo de Documento:</option>
                      <option value="1">C.C</option>
                      <option value="2">T.I</option>
                      <option value="3">C.E</option>
                    </select>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-md">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Apellidos"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                    />
                  </div>
                  <div className="col-md">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Número de Documento"
                      value={ndocumento}
                      onChange={(e) => setDocumento(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-md">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Correo Electrónico"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                  </div>
                  <div className="col-md">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-md">
                    <select
                      className="form-select"
                      aria-label="Género"
                      value={genero}
                      onChange={(e) => setGenero(e.target.value)}
                    >
                      <option value="">Tipo de Género</option>
                      <option value="1">Hombre</option>
                      <option value="2">Mujer</option>
                      <option value="3">Otro</option>
                    </select>
                  </div>
                  <div className="col-md">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirmar Contraseña"
                      value={Confirmar_password}
                      onChange={(e) => setConfirmar_password(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="boton-registro">
                <button type="button" class="Registrar-r" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={add}>
                  Registrarse
                </button>
              </div>
              {validationMessage && (
                <p className="texto-error1">{validationMessage}</p>
              )}
            </form>
          </div>
        </div>
        <Outlet />
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Registro</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="col-auto">
                {error && (
                  <div>
                    <p className="texto-error">
                      {validationMessage}
                    </p>
                  </div>
                )}
                {error === false && (
                  <div>
                    <p className="texto-error">
                      Digitar el código enviado al correo
                    </p>
                    <input
                      type="number"
                      className="codigoRe"
                      id="inputPassword2"
                      placeholder="Código"
                      value={codigoRe}
                      onChange={(e) => setCodigoRe(e.target.value)}
                    />
                    <div className="botonRe">
                      <button type="button" class="Registrar-r" onClick={codeVericar} data-bs-dismiss="modal" aria-label="Close">
                        Registrarse
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;