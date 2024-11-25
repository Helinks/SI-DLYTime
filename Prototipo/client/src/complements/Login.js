import "./Css/loginStyle.css";
import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Login() {
  const navigate = useNavigate();

  const [correo_i, setCorreo] = useState("");
  const [password_i, setPassword_i] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmar_password, setConfirmar_password] = useState("");
  const [error, setError] = useState(false);
  const [errorU, setErrorU] = useState(["", false]);

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [codigoValidar, setcodigoValidar] = useState(false);
  const [codigoV, setCodigoV] = useState("");
  const [establecerPass, setEstablecerPass] = useState(false);

  const consulta = (e) => {
    e.preventDefault();

    if (correo_i === "" || password_i === "") {
      setError(true);
      return;
    }

    setError(false);
    Axios.post("http://localhost:3001/login", {
      correo_i: correo_i,
      password_i: password_i,
    })
      .then(() => {
        obtenerDatos();
      })
      .catch((error) => {
        setErrorU([error.response.data.message, true]);
      });
  };

  const obtenerDatos = () => {
    Axios.get("http://localhost:3001/login/rol").then((respuestass) => {
      guardar(respuestass.data);
    });
  };

  async function guardar(data) {
    const rol = data[0].idRol;
    rol === 1
      ? navigate("/IndexCliente")
      : rol === 2
      ? navigate("/IndexAdmin")
      : navigate("/IndexEmpleado");
  }

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:3001/Enviar-correo", {
        to: forgotEmail,
        subject: "Restablecimiento de Contraseña",
      });
      setForgotMessage(
        "Por favor, ingresa el código temporal que te hemos enviado."
      );
      setcodigoValidar(true);
      if (codigoValidar) {
      }
    } catch (error) {
      setForgotMessage("Hubo un error enviando el correo.");
    }
  };

  const validarCodigo = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:3001/validar-codigo",
        {
          correo: forgotEmail,
          code: codigoV,
        }
      );

      // Puedes usar `response.data` si el servidor envía datos adicionales
      if (response.data) {
        setEstablecerPass(true);
      }

      alert("Código válido. Ahora puedes cambiar tu contraseña.");
    } catch (error) {
      alert(error.response?.data || "Error al validar el código.");
    }
  };

  const restablecer = async () => {
    await Axios.patch("http://localhost:3001/CambiaContrasena", {
      correo: forgotEmail,
      password: password,
      codigo: codigoV,
    });
  };

  return (
    <div>
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
                    value={correo_i}
                    onChange={(e) => setCorreo(e.target.value)}
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
                    value={password_i}
                    onChange={(e) => setPassword_i(e.target.value)}
                  />
                </div>
              </div>
            </form>
            <div className="botones-inicio">
              <button
                type="submit"
                className="iniciar" // Aplicamos clase de estilo CSS personalizada
                onClick={consulta}
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                className="olvidar" // Aplicamos clase de estilo CSS personalizada
                onClick={() => setShowForgotModal(true)}
              >
                Olvidaste tu contraseña
              </button>
              {error && (
                <p className="texto-error">
                  Por favor, complete todos los campos.
                </p>
              )}
              {errorU[1] && <p className="texto-error">{errorU[0]}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Recuperar Contraseña */}
      <Modal show={showForgotModal} onHide={() => setShowForgotModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Recuperar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleForgotPasswordSubmit}>
            <Form.Group className="mb-3" controlId="formForgotEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
            </Form.Group>
            <button className="olvidar" type="submit">
              Enviar
            </button>
          </Form>

          {forgotMessage && <p className="mensajeCorreo">{forgotMessage}</p>}
          {codigoValidar && (
            <div>
              <form className="row g-3">
                <div className="col-auto">
                  <label for="inputPassword6" className="col-form-label">
                    Código
                  </label>
                </div>
                <div className="col-auto">
                  <label for="inputPassword2" className="visually-hidden">
                    Password
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="inputPassword2"
                    placeholder="Código"
                    value={codigoV}
                    onChange={(e) => setCodigoV(e.target.value)}
                  />
                </div>
                <div className="col-auto"></div>
                <button type="button" class="olvidar" onClick={validarCodigo}>
                  {" "}
                  Verificar identidad
                </button>
              </form>
            </div>
          )}
          {establecerPass && (
            <div className="mensajeCorreo">
              <p>Ingresa Nueva Contraseña</p>
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">
                  Contraseña
                </span>
                <input
                  type="password"
                  class="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">
                  Confirmar Contraseña
                </span>
                <input
                  type="password"
                  class="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  value={Confirmar_password}
                  onChange={(e) => setConfirmar_password(e.target.value)}
                />
              </div>
              <div style={{ textAlign: "right" }}>
                <button type="button" class="olvidar" onClick={restablecer}>
                  Aceptar
                </button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Outlet />
    </div>
  );
}

export default Login;
