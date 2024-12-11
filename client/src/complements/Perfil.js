import React, { useEffect, useState } from 'react'
import './Css/PerfilStyle.css';
import { Link } from 'react-router-dom';
import Axios from "axios";

function Perfil() {

  const [user, setUser] = useState();

  const [nombre, setNombres] = useState();
  const [apellido, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [Fboton, setFboton] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [error, setError] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const id = localStorage.getItem("userId");
  const rol = localStorage.getItem("userRole");

  const datos = () => {
    setFboton(false);
    setValidationMessage("")
    setApellidos("");
    setNombres("");
    setTelefono("");
    setPassword("");
  }

  const getUser = async () => {
    console.log(id)
    Axios.get("http://localhost:3001/perfil/datosUsuario", {
      params: { id: id }
    }).then((datosUser) => {
      setUser(datosUser.data);
    }).catch((err) => {
      console.error("Error al encontrar usuario:", err);
      return null;
    });
  }

  const editarUsuario = () => {
    Axios.patch("http://localhost:3001/Perfil/updateUsuario", {
      numeroDocumento: id,
      nombre: nombre,
      password: password,
      apellido: apellido,
      telefono: telefono,
    }).then(() => {
      getUser();
    });
  }
  const editarUsuarioAdmin = () => {
    Axios.patch("http://localhost:3001/Perfil/updateUsuarioAdmin", {
      numeroDocumento: id,
      password: password,

    }).then(() => {
      setMensaje("Datos Actualizados");
      getUser();
    });
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div>
      {user ? (
        <>
          <div className="contenedor-izquierda">
            <div className="contenedor-izquierda2">
              <div className="imagen_perfil">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
              </div>
              <div className="nombre">
                <b>{
                  user.Nombres + " " +
                  user.Apellidos}</b>
              </div>
            </div>

          </div>
          <div className="contenedor-derecha">
            <div className="titulo">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
              <h2>Cuenta</h2>
            </div>
            <div className="formulario">
              <form>
                <div className="bloque">
                  <div>
                    <b>Nombre</b><br />
                    <input value={user.Nombres} type="text" />
                  </div>
                  <div>
                    <b>Apellido</b><br />
                    <input value={user.Apellidos} type="text" />
                  </div>
                </div>
                <div className="bloque">
                  <div>
                    <b>Correo</b><br />
                    <input value={user.correo} type="text" />
                  </div>
                  <div>
                    <b>Teléfono</b><br />
                    <input value={user.telefono} type="text" />
                  </div>
                </div>
                <div className="bloque">
                  <div>
                    <b>Documento</b><br />
                    <input value={user.numeroDocumento} type="text" />
                  </div>
                  <div>
                    <b>Genero</b><br />
                    <input value={user.genero} type="text" />
                  </div>
                </div>
              </form>
            </div>
            <div className="botones">
              <div>
                <button>Historial Clinico</button>
              </div>
              <p>{mensaje}</p>
              <div>
                <Link to="/IndexEmpleado"><button>Cancelar</button></Link>
                <button type="button" data-bs-toggle="modal" data-bs-target={rol == 1 ? "#modalGeneral":"#modalAdmin"} onClick={() => {
                  setNombres(user.Nombres);
                  setApellidos(user.Apellidos);
                  setTelefono(user.telefono);
                }}>Actualizar</button>
              </div>
            </div>
          </div>

          {/* Modal para editar datos */}
          <div className="modal fade" id="modalGeneral" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Actualizar Datos</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                  <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Nombre</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" defaultValue={nombre} onChange={(e) => setNombres(e.target.value)} />
                  </div>

                  <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Apellidos</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" defaultValue={apellido} onChange={(e) => setApellidos(e.target.value)} />
                  </div>

                  {!Fboton && <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Contraseña</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  }

                  <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Telefono</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" defaultValue={telefono} onChange={(e) => setTelefono(e.target.value)} />
                  </div>

                  {validationMessage && (
                    <p className="texto-errorEmpleado">{validationMessage}</p>
                  )}
                  {error && (
                    <p className="texto-errorEmpleado">
                      Por favor, complete todos los campos.
                    </p>
                  )}
                </div>
                <div className="modal-footer">

                  <button type="button" className="btn btn-outline-danger" onClick={datos} data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
                  <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal" onClick={() => editarUsuario()}>Modificar</button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="modalAdmin" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Actualizar Datos</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                  
                  {!Fboton && <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Contraseña</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  }

                  {validationMessage && (
                    <p className="texto-errorEmpleado">{validationMessage}</p>
                  )}
                  {error && (
                    <p className="texto-errorEmpleado">
                      Por favor, complete todos los campos.
                    </p>
                  )}
                </div>
                <div className="modal-footer">

                  <button type="button" className="btn btn-outline-danger" onClick={datos} data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
                  <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal" onClick={() => editarUsuarioAdmin()}>Modificar</button>
                </div>
              </div>
            </div>
          </div>
          
          
        </>) : (<p>Cargando datos...</p>)
      }
    </div>

  )
}

export default Perfil
