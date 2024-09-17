import React, { useState } from 'react';
import { Link, Outlet, useNavigate} from 'react-router-dom';
import './Css/signIn.css';


export const persona = [
  {
  nombre: "",
  apellido: "",
  documento: 0,
  tipodocumento: 0,
  correo: "",
  password: "",
  genero: "",
  },
  {
  nombre: "Sebas",
  apellido: "Rodríguez",
  documento: 1013110701,
  tipodocumento: 1,
  correo: "sebitas@gmail.com",
  password: "12345",
  genero: "2",
  },
  {
  nombre: "Samuel",
  apellido: "Fabian",
  documento: 58668424,
  tipodocumento: 2,
  correo: "empleado@gmail.com",
  password: "jose",
  genero: "1",
  }
];

export function SignIn() {
  const [apellido, setApellido] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipodocumento, setTipoDoc] = useState("");
  const [ndocumento, setDocumento] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmar_password, setConfirmar_password] = useState("");
  const [genero, setGenero] = useState(""); 
  const [error, setError] = useState(false);

  
  const navigate = useNavigate();

  persona[0].nombre = nombre;
  persona[0].apellido = apellido;
  persona[0].correo = correo;
  persona[0].tipodocumento = tipodocumento;
  persona[0].documento = ndocumento;
  persona[0].password = password;
  persona[0].genero = genero;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (correo === "" || password === "" ) {
      setError(true);
      return;
    }

    setError(false);
    navigate('/Login'); // Redirige a Login después del registro
  };

  return (
  
    

    <div className="body-registro">
      <div className="contenedor-formulario-r">
        <div className="information-r">
          <div className="izquierda-r">
            <h2>¿Ya tienes una cuenta?</h2>
            <p>
            <Link to="/">
                <input type="button" value="Iniciar Sesión" id="sign-in" />
              </Link>

            </p>
          </div>
        </div>
        <div className="derecha-r">
          <h1 id="Titulo-r"><b>Registrarse</b></h1>
          <form className="form-r" onSubmit={handleSubmit}>
            <div className="Contenedor-registros">
              <div className="row g-2">
                <div className="col-md">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Primer Nombre"
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
                    placeholder="Primer Apellido"
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
              <button type="submit" className="Registrar-r">Registrarse</button>
            </div>
            {error && <p className="texto-error">Por favor, complete todos los campos.</p>}
          </form>
        </div>
      </div>
      <Outlet />
    </div>
  );

  
}

export default SignIn;
