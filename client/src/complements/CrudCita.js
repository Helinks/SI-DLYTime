import Axios from 'axios';
import './Css/StyleAdminClientes.css';
import React, { useEffect, useState } from 'react';

function CrudCita() {
  const [fecha, setFecha] = useState();
  const [hora, setHora] = useState("00:00:00");
  const [NumeroDocumentoCliente, setDocumentoCliente] = useState(0);
  const [NumeroDocumentoOftalmologo, setDocumentoOftalmologo] = useState(0);
  const [tipoConsulta, setTipoConsulta] = useState("0");
  const [estadoCita, setEstadoCita] = useState(0);
  const [citaSeleccionada, setCitaSeleccionada] = useState([]);
  const [CrudCita, setcrudCitas] = useState([]);
  const [mensaje, setMensaje] = useState();



  /* MANEJO DE FECHAS */

  const formatearFecha = (fecha) => {

    try {
      if (!fecha) return null;
      const date = new Date(fecha);

      if (isNaN(date.getTime())) return null; // Verifica si la fecha es válida
      return date.toISOString().split('T')[0];
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return null;
    }
  }

  const validarFechas = (fecha) => {

    if (!fecha) return false;
    const fechaActual = new Date();
    const fechaSeleccionada = new Date(fecha);
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaActual.getDate() + 21);


    return (fechaSeleccionada > fechaActual &&
      fechaSeleccionada <= fechaLimite)
  }


  const getCita = () => {

    Axios.get("http://localhost:3001/crudCita").then((cita) => {
      setcrudCitas(cita.data);
    })
  }

  const addCita = () => {
    const fechaFormateada = formatearFecha(fecha);
    Axios.post("http://localhost:3001/crudCita", {
      fecha: fechaFormateada,
      hora: hora,
      NumeroDocumentoCliente: NumeroDocumentoCliente,
      NumeroDocumentoOftalmologo: NumeroDocumentoOftalmologo,
      tipoConsulta: tipoConsulta
    })
  }
  const detallesCita = (cita) => {
    console.log("Cita seleccionada:", cita);
    setCitaSeleccionada(cita)
  }

  const changeEstado = (id) => {

    Axios.patch("http://localhost:3001/updateCita", {

      estadoCita: estadoCita,
      idCita: id


    }).then(() => {
      setMensaje("Estado Cambiado");
      getCita();
    });

  }

  useEffect(() => {
    getCita();

  }, []);




  return (<div>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
      Agregar cita
    </button>



    <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Agregar Cita</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label >Fecha: <input type='date'
              onChange={(event) => {
                setFecha(event.target.value)
              }
              }></input></label><br />
            {
              validarFechas(fecha) ? (
                <div>
                  <div>10:00</div>
                </div>) :
                (<p>No hay citas diponibles</p>)
            }
            <label>Documento cliente: <input
              onChange={(event) => {
                setDocumentoCliente(event.target.value)
              }
              }
              type='number' /></label>
            <label>Documento oftalmologo: <input
              onChange={(event) => {
                setDocumentoOftalmologo(event.target.value)
              }
              }
              type='number' /></label>
            <label>Tipo de consulta: <select
              onChange={(event) => {
                setTipoConsulta(event.target.value)
              }
              }>
              <option value="1">Consulta general</option>
              <option value="2">Chequeo</option>
            </select>
            </label><br />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" onClick={addCita}>Confirmar</button>
          </div>
        </div>
      </div>
    </div>



    {mensaje && (<h2>{mensaje}</h2>)}
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope='row'>Fecha/Hora</th>
          <th>Nombre cliente</th>
          <th>Nombre oftalmologo</th>
          <th>Tipo de consulta</th>
          <th>Acción</th>

        </tr>
      </thead>
      <tbody>
        {
          CrudCita.map((val, key) => {
            return <tr key={key}>
              <th scope='row'>{val.fechaHora}</th>
              <td>{val.nombreCliente}</td>
              <td>{val.nombreEmpleado}</td>
              <td>{val.tipoConsulta}</td>
              <td>
                {val.estadoCita === "Cancelada" ?
                  (<p><i> Cancelada </i></p>) :
                  (<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => detallesCita(val)}>Cambiar estado</button>)}


                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => detallesCita(val)}>
                  Detalles
                </button>
              </td>

            </tr>

          })
        }
      </tbody>
    </table>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Detalles</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            {
              detallesCita ? <>
                <p><strong>Fecha: </strong> {citaSeleccionada?.fecha ? formatearFecha(citaSeleccionada.fecha) : 'N/A'}</p>
                <p><strong>Hora: </strong> {citaSeleccionada.hora}</p>
                <p><strong>Nombre del paciente: </strong> {citaSeleccionada.nombreCliente}</p>
                <p><strong>Nombre del oftalmologo: </strong> {citaSeleccionada.nombreEmpleado}</p>
                <p><strong>Tipo de consulta: </strong> {citaSeleccionada.tipoConsulta}</p>
                <p><strong>Direccion: </strong> {citaSeleccionada.direccion}</p>
                <p><strong>Estado: </strong> {citaSeleccionada.estadoCita}</p>
              </>
                : (<p>No hay datos</p>)
            }

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Cambiar Estado</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <select name="select" onChange={(event) => {
              setEstadoCita(event.target.value)
            }
            }>
              <option value="1" defaultValue={citaSeleccionada.estadoCita}>{citaSeleccionada.estadoCita}</option>
              <option value="3" >Cancelar </option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => changeEstado(citaSeleccionada.idCita)}>Confirmar</button>
          </div>
        </div>
      </div>
    </div>

  </div>
  )

}

export default CrudCita