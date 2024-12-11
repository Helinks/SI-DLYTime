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
  const [error, setError] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();

    // Aquí puedes continuar con la verificación de contraseña
    if (password === Confirmar_password) {
      // Lógica de registro
    } else {
      alert("Contraseña no es igual");
      return;
    }

    // Validación de Campos Vacios
    if (nombre === "" || tipodocumento === "" || apellido === "" || ndocumento === "" || correo === "" || password === "" || Confirmar_password === "" || genero === "") {
      setError(true);
      return;
    }

    if (ndocumento.length > 10) {
      alert("El número de documento excede el límite permitido")
      return;
    }



    // Define el cliente aquí
    /* metodo get */
    const client = new Emailvalidation('ema_live_6WmdRIZwQrF3ji7fd4X89YctsfGTBvGUa9L9JqsX');

    client.info(correo, { catch_all: 0 })
      .then(response => {
        console.log(response)
        console.log(response.smtp_check)
        if (response.smtp_check) {
          setValidationMessage("El correo es válido.");
          setError(false);

          /* Validar datos con la base de datos */
          /* Axios.get("http://localhost:3001/autenticacion/consulta", {
            correo: correo,
            numeroDocumento: ndocumento,
          }).then((response) => {
            alert(response);
          }); */

          /* Registro */
          Axios.post("http://localhost:3001/autenticacion/registro", {
            numeroDocumento: ndocumento,
            idRol: 1,
            idTipoIdentificacion: tipodocumento,
            nombre: nombre,
            apellido: apellido,
            idGenero: genero,
            correo: correo,
            clave: password,
          }).then((response) => {

            /* Validación de correo y número de documento */
            if (response.data.exists) {
              alert(response.data.message)
            }
            else {
              alert("Usuario Registrado");
              navigate("/Login"); // Redirige a Login después del registro
            }

          });

        } else {
          setValidationMessage("El correo electrónico no es válido.");
        }
      })
      .catch(err => {
        console.error("Error en la validación de correo:", err);
        alert("Hubo un error al verificar el correo. Intenta más tarde.");
      });

  };



  return (
    /*Formulario*/
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
              <button onClick={add} className="Registrar-r">
                Registrarse
              </button>
            </div>
            {validationMessage && (
              <p className="texto-error">{validationMessage}</p>
            )}
            {error && (
              <p className="texto-error">
                Por favor, complete todos los campos.
              </p>
            )}
          </form>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default SignIn;
