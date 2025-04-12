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
  const [errorMessage, setErrorMessage] = useState("");
  const [currentView, setCurrentView] = useState("email");


  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [codigoValidar, setcodigoValidar] = useState(false);
  const [codigoV, setCodigoV] = useState("");


  const consulta = (e) => {
    e.preventDefault();
    if (correo_i === "" || password_i === "") { //Valida los campos 
      setErrorMessage("Por favor completar los campos")
      return;
    }

    if (!correo_i.includes("@") && correo_i.length > 0) {
      setErrorMessage("Por favor completar los requisitos")
      return;
    }

    /* Envió de datos para la autenticación */
    Axios.post("http://localhost:3001/autenticacion/login", {
      correo_i: correo_i,
      password_i: password_i,
    })
      .then((response) => {

        const { token, rol, id } = response.data;

        // Opcional: Limpiar mensajes de error
        setErrorMessage("");

        // Opcional: Mostrar mensaje de éxito
        alert("Inicio de sesión exitoso");

        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", rol);
        localStorage.setItem("userId", id);

        // Redirigir al usuario según su rol
        if (rol === 1) {
          navigate("/IndexCliente");
        } else if (rol === 2) {
          navigate("/IndexEmpleado");
        } else if (rol === 3) {
          navigate("/IndexAdmin");
        }

      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message || "Error al iniciar sesión");
      });
  };

  /* Compara los datos para validar el rol del usuario */


  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {

      /* Envió de correo eléctronico */
      await Axios.post("http://localhost:3001/enviarCorreo/enviarCorreoPassword", {
        to: forgotEmail,
        subject: "Restablecimiento de Contraseña",
      });
      setCurrentView("codigo");
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
        "http://localhost:3001/recuperarPassword/validarCodigo",
        {
          correo: forgotEmail,
          code: codigoV,
        });

      if (response.data) {
        setcodigoValidar(false);
      }

      setCurrentView("password")
    } catch (error) {
      if (error.response?.status === 400) {
        setForgotMessage("Código inválido");
      }
    }
  };

  const restablecer = async () => {

    if (password === "" || Confirmar_password === "") {
      alert("Por favor completar los campos");
      return;
    }

    if (password !== Confirmar_password) {
      alert("contraseñas no coincidentes");
      return;
    }

    const require = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (require.test(password) === false) {
      alert("Contraseña inválida. Debe contener al menos una mayúscula, un número y tener mínimo 8 caracteres.");
      return;
    }

    setShowForgotModal(false);
    await Axios.patch("http://localhost:3001/recuperarPassword/cambiarPassword", {
      correo: forgotEmail,
      password: password,
      codigo: codigoV,
    }).then((response) => {
      alert(response.data)
      setCurrentView("email")
      setForgotEmail("")
      setCodigoV("")
      setPassword("")
      setConfirmar_password("")
    });


  };


  return (
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

            <h1 id="Titulo">
              <b>Iniciar Sesión</b>
            </h1>
            <form onSubmit={(e) => { consulta(e); }}>
              <div className="inputs">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">@</span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Correo"
                    value={correo_i}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </div>

                {!correo_i.includes("@") && correo_i.length > 0 && (
                  <p style={{ color: "white" }}>Debe incluir "@"</p>
                )}

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
              {errorMessage && <p className="texto-error1">{errorMessage}</p>}
              <div className="botones-inicio">


                <button
                  type="submit"
                  className="iniciar" // Aplicamos clase de estilo CSS personalizada
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
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal para Recuperar Contraseña */}
      <Modal show={showForgotModal} onHide={() => setShowForgotModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Recuperar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentView === "email" && (
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
              {forgotMessage}
              <button className="olvidar" type="submit">
                Enviar
              </button>
            </Form>
          )}

          {currentView === "codigo" && (
            <div>
              <form className="row g-3">
                <div className="col-auto">
                  <label htmlFor="inputPassword6" className="col-form-label">
                    Ingresar Código enviado
                  </label>
                </div>
                <div className="col-auto">
                  <input
                    type="number"
                    className="form-control"
                    id="inputPassword2"
                    placeholder="Código"
                    value={codigoV}
                    onChange={(e) => setCodigoV(e.target.value)}
                  />
                </div>
                {forgotMessage}
                <button
                  type="button"
                  className="olvidar"
                  onClick={validarCodigo}>
                  Verificar identidad
                </button>
              </form>
            </div>
          )}

          {currentView === "password" && (
            <div className="mensajeCorreo">
              <p>Ingresa Nueva Contraseña</p>
              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  Contraseña
                </span>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  Confirmar Contraseña
                </span>
                <input
                  type="password"
                  className="form-control"
                  value={Confirmar_password}
                  onChange={(e) => setConfirmar_password(e.target.value)}
                />

              </div>
              <div style={{ textAlign: "right" }}>
                <button type="button" className="olvidar" onClick={restablecer} >
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