import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Css/StyleCrudEmpleados.css';
import Axios from 'axios';
import Emailvalidation from '@everapi/emailvalidation-js'

function CrudEmpleados() {

  const [nombre, setNombres] = useState("");
  const [apellido, setApellidos] = useState("");
  const [tipodocumento, setidTipoIdentificacion] = useState("");
  const [ndocumento, setnumeroDocumento] = useState("");
  const [correo, setcorreo] = useState("");
  const [telefono, settelefono] = useState("");
  const [password, setPassword] = useState("");
  const [genero, setidGenero] = useState("");
  const [estadoPersona, setestadoPersona] = useState(0);
  const [Fboton, setFboton] = useState(false);

  const [error, setError] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [CrudEmple, SetcrudEmple] = useState([]);




  useEffect(() => {
    getEmpleados();
  }, []);

  const datos = () => {
    setFboton(false);
    setValidationMessage("")
    setApellidos("");
    setNombres("");
    setidTipoIdentificacion("");
    setnumeroDocumento("");
    setcorreo("");
    settelefono("");
    setidGenero("");
    setestadoPersona("");
    setPassword("");
    setestadoPersona(true);
    setError(false)
  }


  const getEmpleados = () => {
    Axios.get("http://localhost:3001/crudEmpleados/consultaEmpleado").then((empleados) => {
      SetcrudEmple(empleados.data);
    })
  }


  const MostrarEmpleado = (val) => {
    setFboton(true)
    setnumeroDocumento(val.numeroDocumento);
    setidTipoIdentificacion(val.idTipoIdentificacion);
    setNombres(val.Nombres);
    setApellidos(val.Apellidos);
    setidGenero(val.idGenero);
    setcorreo(val.correo);
    settelefono(val.telefono);
    setestadoPersona(val.estadoPersona);
    setError(false)
  }


  /* Registrar Empleados  */
  const RegistrarEmpleado = () => {

    // Validación de Campos Vacios
    if (nombre === "" || tipodocumento === "" || apellido === "" || ndocumento === "" || correo === "" || password === "" || genero === "") {
      setError(true);
      return;
    }
    setError(false)
    
    const client = new Emailvalidation('ema_live_6WmdRIZwQrF3ji7fd4X89YctsfGTBvGUa9L9JqsX');

    client.info(correo, { catch_all: 0 })
      .then(response => {

        console.log(response)
        console.log(response.smtp_check)

        if (response.smtp_check) {
          setValidationMessage("El correo es válido.");
          setError(false);
          Axios.post("http://localhost:3001/crudEmpleados/agregarEmpleado", {
            numeroDocumento: ndocumento,
            idRol: 2,
            idTipoIdentificacion: tipodocumento,
            nombre: nombre,
            apellido: apellido,
            idGenero: genero,
            correo: correo,
            clave: password,
            telefono: telefono,
            estadoPersona: estadoPersona,
          }).then((response) => {
            /* Validación de correo y número de documento */
            if (response.data.exists) {
              alert(response.data.message)
            }
            else {
              alert("Empleado Registrado");
              getEmpleados();
              setValidationMessage("");
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


  }

  /* Modificar Empleados */
  const editarEmpleado = () => {

    if (nombre === "" || apellido === "" || correo === "" || genero === "") {
      setError(true);
      return;
    }

    setError(false)


    Axios.patch("http://localhost:3001/crudEmpleados/actualizarEmpleado", {
      numeroDocumento: ndocumento,
      idRol: 2,
      idTipoIdentificacion: tipodocumento,
      nombre: nombre,
      apellido: apellido,
      idGenero: genero,
      correo: correo,
      telefono: telefono,
      estadoPersona: estadoPersona,
    }).then(() => {
      getEmpleados();

    });
  }


  return (<div>
    <div className='barra-head'>
      <nav className="navbar navbar-dark bg-danger">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="navbar-brand">
            <Link to="/IndexAdmin">
              <div className='BackButton'>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </div>



    <div className="botones-acciones">

      <button type="button" data-bs-toggle="modal" data-bs-target="#F" className="btn btn-outline-success" onClick={datos} >Agregar Usuario</button>

    </div>

    <table className="table table-striped" id="TablaEmpleados">
      <thead>
        <tr>
          <th scope='row'>Documento</th>
          <th>TipoIdentificacion</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Genero</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          CrudEmple.map((val, key) => {
            return <tr key={key}>
              <th scope='row'>{val.numeroDocumento}</th>
              <td>{val.idTipoIdentificacion}</td>
              <td>{val.Nombres}</td>
              <td>{val.Apellidos}</td>
              <td>{val.idGenero}</td>
              <td>{val.correo}</td>
              <td>{val.telefono}</td>
              <td>{val.estadoPersona}</td>
              <td>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#F" onClick={() => { MostrarEmpleado(val) }}>
                  Modificar
                </button>
              </td>
            </tr>

          })
        }
      </tbody>
    </table>



    <div class="modal fade" id="F" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">

            {/* Formulario */}
            {!Fboton ? <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Numero de ID</span>
              <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={ndocumento} onChange={(e) => setnumeroDocumento(e.target.value)} />
            </div> :

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Numero de ID</span>
              <input type="text" id="disabledTextInput" class="form-control" value={ndocumento} />
            </div>}

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Tipo de Identificacion</span>
              <select
                className="form-select"
                aria-label="Tipo de Documento"
                value={tipodocumento}
                onChange={(e) => setidTipoIdentificacion(e.target.value)}
              >
                <option></option>
                <option value="1">C.C</option>
                <option value="2">T.I</option>
                <option value="3">C.E</option>
              </select>
            </div>

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">Nombre</span>
              <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={nombre} onChange={(e) => setNombres(e.target.value)} />
            </div>

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">Apellido</span>
              <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={apellido} onChange={(e) => setApellidos(e.target.value)} />
            </div>

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">Genero</span>
              <select
                className="form-select"
                aria-label="Genero"
                value={genero}
                onChange={(e) => setidGenero(e.target.value)}>
                <option></option>
                <option value="1">Masculino</option>
                <option value="2">Femenino</option>
                <option value="3">Otro...</option>
              </select>
            </div>

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">Correo</span>
              <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={correo} onChange={(e) => setcorreo(e.target.value)} />
            </div>

            {!Fboton && <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">Contraseña</span>
              <input type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            }

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">Telefono</span>
              <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={telefono} onChange={(e) => settelefono(e.target.value)} />
            </div>

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">Estado</span>
              <select
                className="form-select"
                aria-label="estadoPersona"
                value={estadoPersona}
                onChange={(e) => setestadoPersona(e.target.value)}>
                <option value="0">Activo</option>
                <option value="1">Inactivo</option>
              </select>
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
          <div class="modal-footer">

            <button type="button" className="btn btn-outline-danger" onClick={datos} data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
            <button type="button" className="btn btn-outline-success" data-bs-dismiss={validationMessage === false || error === false ? "" : "modal"} onClick={Fboton ? editarEmpleado : RegistrarEmpleado}>{Fboton ? "Modificar" : "Registrar"}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )

}

export default CrudEmpleados