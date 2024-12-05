import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/crudCita.css';
import React, { useEffect, useState, useCallback } from 'react';


function CrudCita  () {
  const [fecha,setFecha] = useState();
  const [hora,setHora] = useState();
  const [NumeroDocumentoCliente,setDocumentoCliente] = useState(0);
  const [NumeroDocumentoOftalmologo,setDocumentoOftalmologo] = useState(0);
  const [tipoConsulta,setTipoConsulta] = useState();
  const [estadoCita,setEstadoCita] = useState(0);
  const [citaSeleccionada,setCitaSeleccionada] = useState([]);
  const [CrudCita, setcrudCitas] = useState([]);
  const [mensaje,setMensaje] = useState("");
  const [horarios,setHorarios] = useState([]);
  const [idHorario,setIdHorario] = useState();
  const [empleados,setEmpleados] = useState([]);
  const [clientes,setClientes] = useState([]);
  const [consultas,setConsultas] = useState([]);
  const [selectHorario,setSelectHorario] =useState(false);

  

 /* MANEJO DE FECHAS */

 /* Formatea las fechas */
 const formatearFecha =(fecha)=>{

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

 

 /* SOLICITUDES */

 /* Solicita la lista de las citas disponibles */ 
  const getCita = () => {

    Axios.get("http://localhost:3001/crudCitas/crudCita").then((cita) => {
      setcrudCitas(cita.data);
    })
  }

  /* Solicita agregar una nueva cita */
  const addCita = () =>{

    const fechaFormateada = formatearFecha(fecha);
    if (!idHorario) {
      setMensaje("Por favor seleccione fecha y hora");
      return;
    }
  
    if (!NumeroDocumentoCliente) {
      setMensaje("Número de documento de cliente inválido");
      return;
    }
  
    if (!NumeroDocumentoOftalmologo) {
      setMensaje("Debe seleccionar un oftalmólogo");
      return;
    }
    if (!tipoConsulta) {
      setMensaje("Debe seleccionar un tipo de consulta");
      return;
    }
    if (!fechaFormateada || !hora) {
      setMensaje("Fecha u hora inválidas");
      return;
    }

    console.log("lllllll");
      
      Axios.post("http://localhost:3001/crudCitas/addCita",{
      idHorario:idHorario,
      fecha:fechaFormateada,
      hora:hora,
      NumeroDocumentoCliente:NumeroDocumentoCliente,
      NumeroDocumentoOftalmologo:NumeroDocumentoOftalmologo,
      idTipoConsulta:tipoConsulta
    })

    .then((response) => {
      // Limpiar campos
      setFecha("");
      setHora("");
      setDocumentoCliente("");
      setDocumentoOftalmologo("");
      setTipoConsulta("");
      setSelectHorario(false);
      
      // Mostrar mensaje de éxito
      setMensaje("Cita agregada correctamente");
      
      // Recargar lista de citas
      getCita();
    }).catch((error) =>{
      console.error("Error al agregar cita:", error);
    })
  }
  

  /* Establece la cita seleccionada */
  const detallesCita =(cita) =>{
    console.log("Cita seleccionada:", cita);
    setCitaSeleccionada(cita)
  }

  /* Solicita y cambia el estado de la cita a cancelada */
  const changeEstado=(id)=>{
    
    Axios.patch("http://localhost:3001/crudCitas/updateCita",{

      estadoCita:estadoCita,
      idCita:id

      
    }).then(() => {
      setMensaje("Estado Cambiado");
      getCita();
    });

  }

  /* Solicita los horarios de la base de datos */
  const getHorario =(fecha)=>{
    if (!fecha) return;

    Axios.get("http://localhost:3001/crudCitas/getHorarios",{
      params: { fecha: fecha },

    }).then((horario)=>{
    setHorarios(horario.data || []);
    })
    .catch((error) => {
      console.error("Error obteniendo horarios:", error);
    });
  }
  /* Solicita los empleados de la base de datos */
  
  const getEmpleado =()=>{

    Axios.get("http://localhost:3001/crudCitas/getEmpleados",{
    }).then((empleado)=>{
    setEmpleados(empleado.data || []);
    })
    .catch((error) => {
      console.error("Error obteniendo empleados:", error);
    });
  }
  /* Solicitar clientes de la base de datos */
  const getCliente = useCallback((cliente)=>{
    if(!cliente) return;

    Axios.get("http://localhost:3001/crudCitas/getClientes",{
      params:{NumeroDocumentoCliente:cliente},
    }).then((response)=>{
      if(response.data && response.data.length>0){
        setMensaje("")
        setClientes(response.data);
      }
     else{
      setMensaje("Cliente no encontrado")
      setClientes([])
     }
    })
    .catch((error) => {
      console.error("Error obteniendo cliente:", error);
      setMensaje("Hubo un error al buscar el cliente. Intenta nuevamente.");
    });
  },[]);

  const getConsultas =()=>{

    Axios.get("http://localhost:3001/crudCitas/getTipoConsulta",{
    }).then((response)=>{
    setConsultas(response.data || []);
    })
    .catch((error) => {
      console.error("Error obteniendo tipos de consulta:", error);
    });
  }
  

  /* FUNCIONES */

  /* function horarioEscogido(){
    
    setSelectHorario(!selectHorario)
  } */

  /* Pone un condicional para establecer un rango de fechas para las citas disponibles */
 function validarFechas (fecha) {

  if  (!fecha) return false;
  const fechaActual = new Date();
  const fechaSeleccionada = new Date(fecha);
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaActual.getDate()+21);
  

  return(fechaSeleccionada > fechaActual && 
    fechaSeleccionada <= fechaLimite)
 }

  /* Muestra una lista de los horarios que esten disponibles */
  function listaHorario(horarios) {
    return (
      <div className="horarios-container">
        {horarios.map((horario, index) => (
          <button  className={`seleccionarHorario ${selectHorario && horario.hora===hora?'activo':''}`} key={index}
          onClick={()=> {if (!selectHorario){setHora(horario.hora);setSelectHorario(true);setIdHorario(horario.id)}else{setHora("");setSelectHorario(false);setIdHorario([])}}}>
            {horario.hora}
          </button>
        ))}
      </div>
    );
  }

  /* Muestra los empleados registrados */
  function listaEmpleados(empleados) {
    return (
      <select 
      onChange={(event)=>{
        setDocumentoOftalmologo(event.target.value)
      }
      }
      type='number'>
        {empleados.map((empleado, index) => (
          <option value={empleado.numeroDocumento} key={index}>
            {empleado.nombre}
          </option>
        ))}
        </select>

    );
  }
  function listaTipoConsultas(consulta) {
    return (
      <select 
      onChange={(event)=>{
        setTipoConsulta(event.target.value)
      }
      }
      type='number'>
        {consulta.map((consultas, index) => (
          <option value={consultas.idtipoConsulta} key={index}>
            {consultas.nombre}
          </option>
        ))}
        </select>

    );
  }

  useEffect(() => {
    getCita();
    getEmpleado();
    getConsultas();
    if (fecha) getHorario(fecha);
  }, [fecha]);

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
        onChange={(event)=>{
          setFecha(event.target.value)
        }
        } ></input></label><br/>
        {
          validarFechas(fecha)? (
            listaHorario(horarios)
              )
            :
            (<p>No hay citas diponibles</p>)
        }
        <label>Documento cliente: <input
    onChange={(event) => setDocumentoCliente(event.target.value)}
    type="number"
    value={NumeroDocumentoCliente}
  />
</label>
<button
  className=""
  onClick={() => getCliente(NumeroDocumentoCliente)}
  disabled={!NumeroDocumentoCliente} 
>
  Buscar Cliente
</button>
<div>{clientes.map((val,key)=>{
  return(
  <h6>{val.nombre}</h6>);
})}</div>

        <label>Documento oftalmologo: {listaEmpleados(empleados)}</label>
        <label>Tipo de consulta: {listaTipoConsultas(consultas)}
        </label><br/>
      </div>
      <div class="modal-footer">
      <p className="text-danger">{mensaje}</p>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" onClick={()=>{addCita()}}>Confirmar</button>
      </div>
    </div>
  </div>
</div>
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
          CrudCita.map((val,key) => {
            return <tr key={key}>
              <th scope='row'>{val.fechaHora}</th>
              <td>{val.nombreCliente}</td>
              <td>{val.nombreEmpleado}</td>
              <td>{val.tipoConsulta}</td>
              <td>
                {val.estadoCita==="Cancelada" ?
                (<p><i> Cancelada </i></p>): 
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
          :(<p>No hay datos</p>)
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
      <select name="select" onChange={(event)=>{
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