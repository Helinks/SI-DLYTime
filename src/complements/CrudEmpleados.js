import React, { useState, useEffect,useCallback } from 'react';
import { Link } from "react-router-dom";
import './Css/StyleCrudEmpleados.css';
import Axios from 'axios';
import Emailvalidation from '@everapi/emailvalidation-js'


function CrudEmpleados() {

  const [nombre, setNombres] = useState("");
  const [apellido, setApellidos] = useState("");
  let [tipodocumento, setidTipoIdentificacion] = useState("");
  const [ndocumento, setnumeroDocumento] = useState("");
  const [correo, setcorreo] = useState("");
  const [telefono, settelefono] = useState("");
  const [password, setPassword] = useState("");
  let [genero, setidGenero] = useState("");
  let [estadoPersona, setestadoPersona] = useState("");
  const [Fboton, setFboton] = useState(false);

  const [error, setError] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [CrudEmple, SetcrudEmple] = useState([]);



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
    setestadoPersona(val.idEstadoPersona);
    setError(false)
    

  }


  /* Registrar Empleados  */
  const RegistrarEmpleado = async () => {
    // Validación de campos vacíos
    if (!nombre || !tipodocumento || !apellido || !ndocumento || !correo || !password || !genero || !estadoPersona) {
      setError(true);
      return;
    }
  
    setError(false);
  
    const client = new Emailvalidation('ema_live_7rehNckD3mKmrQKF5f0vJSoj3fbJFUHYbqTlWWRL');
  
    try {
      const response = await client.info(correo, { catch_all: 0 });
  
      if (response.smtp_check) {
        setValidationMessage("El correo es válido.");
        setError(false);
  
        const resultado = await Axios.post("http://localhost:3001/crudEmpleados/agregarEmpleado", {
          numeroDocumento: ndocumento,
          idTipoIdentificacion: tipodocumento,
          Nombres: nombre,
          Apellidos: apellido,
          idGenero: genero,
          correo: correo,
          clave: password,
          telefono: telefono,
          idEstadoPersona: estadoPersona,
        });

        
  
        if (resultado.data.exists) {
          alert(resultado.data.message);
        } else {
          alert("Empleado Registrado");
          getEmpleados();
          setValidationMessage("");
        }
  
      } else {
        setValidationMessage("El correo electrónico no es válido.");
      }
  
    } catch (err) {
      console.error("Error en la validación de correo:", err);
      alert("Hubo un error al verificar el correo. Intenta más tarde.");
    }
  };
  

  /* Modificar Empleados */
  const editarEmpleado = () => {


    if (!nombre || !apellido || !correo || !genero) {
      setError(true);
      return;
    }

    setError(false)

    Axios.patch("http://localhost:3001/crudEmpleados/actualizarEmpleado", {
      numeroDocumento: ndocumento,
      idTipoIdentificacion: tipodocumento,
      Nombres: nombre,
      Apellidos: apellido,
      idGenero: genero,
      correo: correo,
      telefono: telefono,
      idEstadoPersona: estadoPersona,
    }).then((resultado) => {

      if (resultado.data.exists) {
          alert(resultado.data.message);
        } else {
          alert("Empleado Modificado");
          
          getEmpleados();
          setValidationMessage("");
        }

      getEmpleados();

    });
    
  }
  
  
    
  const [results,setResults] = useState([]);
  const [buscar, setBuscar] = useState("");

  const searchFilter = useCallback(async()=>{

    try {
      const response = await Axios.get(`http://localhost:3001/crudEmpleados/consultaEmpleado`, {
        params: {
          q: buscar
        }
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error en búsqueda:", error);
    }
  }, [buscar]);



  useEffect(() => { 
    searchFilter();
        },[searchFilter]);

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

    <input type="text" className="form-control mb-2" placeholder="buscar"
    value={buscar} onChange={(e) => setBuscar(e.target.value)} />

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
          results.map((val, key) => {
            return <tr key={key}>
              <th scope='row'>{val.numeroDocumento}</th>
              <td>{val.idTipoIdentificacion}</td>
              <td>{val.Nombres}</td>
              <td>{val.Apellidos}</td>
              <td>{val.nombreGenero}</td>
              <td>{val.correo}</td>
              <td>{val.telefono}</td>
              <td>{val.nombreEstado}</td>

              
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
            <h5 class="modal-title" id="exampleModalLabel">{Fboton ? "Modificar Usuario" : "Agregar Usuario"}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">

            {/* Formulario */}
            {!Fboton ? 
              <input name="ndocumento" type="text" className="form-control mb-2" placeholder="Número de Documento" value={ndocumento} onChange={(e) => setnumeroDocumento(e.target.value)} />
            : <input name="ndocumento" type="text" className="form-control mb-2" placeholder="Número de Documento" value={ndocumento} />
            }
                <select
                name="tipodocumento"
                className="form-select mb-2"
                value={tipodocumento}
                onChange={(e) => setidTipoIdentificacion(e.target.value)}>
                <option value="" >Tipo de Identificación</option>
                <option value="1">C.C</option>
                <option value="2">T.I</option>
                <option value="3">C.E</option>
              </select>
              <input name="nombre" type="text" className="form-control mb-2" placeholder="Nombre" 
              value={nombre} onChange={(e) => setNombres(e.target.value)} />
          
             <input name="apellido" type="text" className="form-control mb-2" placeholder="Apellido"
             value={apellido} onChange={(e) => setApellidos(e.target.value)} />
          
             <select name="genero" className="form-select mb-2" 
             value={genero} onChange={(e) => setidGenero(e.target.value)}>
                <option>Género</option>
                <option value="1">Masculino</option>
                <option value="2">Femenino</option>
                <option value="3">Otro...</option>
              </select>

            
              <input name="correo" type="email" className="form-control mb-2" placeholder="Correo"
              value={correo} onChange={(e) => setcorreo(e.target.value)} />

             {!Fboton &&
              <input name="password" type="password" className="form-control mb-2" placeholder="Contraseña" 
              value={password} onChange={(e) => setPassword(e.target.value)} />
             }

              <input name="telefono" type="text" className="form-control mb-2" placeholder="Teléfono" 
              value={telefono} onChange={(e) => settelefono(e.target.value)} />

              <select name="estadoPersona" className="form-select mb-2"
               value={estadoPersona} onChange={(e) => setestadoPersona(e.target.value)}>
                <option>Estado</option>
                <option value="1">Activo</option>
                <option value="2">Inactivo</option>
                <option value="3">Bloqueado</option>
              </select>

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