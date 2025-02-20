import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Css/loginStyle.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Simulación de roles basados en el correo
  const userRoles = {
    'admin@gmail.com': 'admin',
    'cliente@gmail.com': 'cliente',
    'oftalmologo@gmail.com': 'oftalmologo',
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const role = userRoles[email];

    if (role) {
      switch (role) {
        case 'admin':
          navigate('/indexAdmin');
          break;
        case 'cliente':
          navigate('/indexCliente');
          break;
        case 'oftalmologo':
          navigate('/indexEmpleado');
          break;
        default:
          alert('Rol no reconocido');
      }
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
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
          <form className="form" onSubmit={handleLogin} noValidate>
            <h1 id="Titulo"><b>Iniciar Sesión</b></h1>
            <div className="inputs">
              <div className="input-group mb-3">
                <span className="input-group-text">@</span>
                <input type="email" className="form-control" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">⌘</span>
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>
            <div className="botones-inicio">
              <button type="submit" className="iniciar">Iniciar sesión</button>
              <button type="button" className="olvidar">Olvidaste tu contraseña</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
