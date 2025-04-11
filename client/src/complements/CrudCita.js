import React, { useEffect, useState, useCallback } from "react";
import "./Css/StyleAdminCitas.css";
import { Link } from "react-router-dom";

import Axios from "axios";

function CrudCita() {
  const [clienteBuscado, setClienteBuscado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [mensajeModal, setMensajeModal] = useState("");
  const [idHorario, setIdHorario] = useState();
  const [citaSeleccionada, setCitaSeleccionada] = useState([]);
  const [fecha, setFecha] = useState("");
  const [fechaFilter, setFechaFilter] = useState("");
  const [hora, setHora] = useState();
  const [selectHorario, setSelectHorario] = useState(false);
  const [horarios, setHorarios] = useState([]);
  const [tipoConsulta, setTipoConsulta] = useState("");
  const [tipoConsultaFilter, setTipoConsultaFilter] = useState("");
  const [consultas, setConsultas] = useState([]);
  const [NumeroDocumentoCliente, setDocumentoCliente] = useState("");
  const [NumeroDocumentoOftalmologo, setDocumentoOftalmologo] = useState("");
  const [empleados, setEmpleados] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);


  const formatearFecha = (fecha) => {
    try {
      if (!fecha) return null;
      const date = new Date(fecha);

      if (isNaN(date.getTime())) return null; // Verifica si la fecha es válida
      return date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Error al formatear fecha:", error);
      return null;
    }
  };
  /* SELECCIONA CITA */
  const detallesCita = (cita) => {
    console.log("Cita seleccionada:", cita);
    setCitaSeleccionada(cita);
  };

  /* SOLICITUDES */

  // Filtra los datos por la barra de busqueda
  const searchFilter = useCallback(async () => {

    try {
      const response = await Axios.get(`http://localhost:3001/crudCitas/crudCita`, {
        params: {
          q: search,
          fecha: fechaFilter,
          idTipoConsulta: tipoConsultaFilter
        }
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error en búsqueda:", error);
    }
  }, [search, fechaFilter, tipoConsultaFilter]);


  /* Solicita agregar una nueva cita */
  const addCita = () => {
    const fechaFormateada = formatearFecha(fecha);
    if (!idHorario) {
      setMensajeModal("Por favor seleccione fecha y hora");
      return;
    }

    if (!NumeroDocumentoCliente) {
      setMensajeModal("Número de documento de cliente inválido");
      return;
    }

    if (!NumeroDocumentoOftalmologo) {
      setMensajeModal("Debe seleccionar un oftalmólogo");
      return;
    }
    if (!tipoConsulta) {
      setMensajeModal("Debe seleccionar un tipo de consulta");
      return;
    }
    if (!fechaFormateada || !hora) {
      setMensajeModal("Fecha u hora inválidas");
      return;
    }


    Axios.post("http://localhost:3001/crudCitas/addCita", {
      idHorario: idHorario,
      fecha: fechaFormateada,
      hora: hora,
      NumeroDocumentoCliente: NumeroDocumentoCliente,
      NumeroDocumentoOftalmologo: NumeroDocumentoOftalmologo,
      idTipoConsulta: tipoConsulta,
    })

      .then((response) => {
        // Limpiar campos
        setFecha("");
        setHora("");
        setDocumentoCliente("");
        setDocumentoOftalmologo("");
        setSelectHorario(false);
        setTipoConsulta("");

        setClientes([]);
        setEmpleados([]);
        setConsultas([]);
        setHorarios([]);

        // Mostrar mensaje de éxito
        setMensajeModal("Cita agregada correctamente");

      })
      .catch((error) => {
        console.error("Error al agregar cita:", error);
      });
  };



  /* SOLICITA LOS HORARIOS DISPONIBLES EN LA BASE DE DATOS */
  const getHorario = (fecha) => {
    if (!fecha) return;

    Axios.get("http://localhost:3001/crudCitas/getHorarios", {
      params: { fecha: fecha },
    })
      .then((horario) => {
        setHorarios(horario.data || []);
      })
      .catch((error) => {
        console.error("Error obteniendo horarios:", error);
      });
  };

  /* SOLICITA LOS TIPOS DE CONSULTA EN LA BASE DE DATOS */
  const getConsultas = () => {
    Axios.get("http://localhost:3001/crudCitas/getTipoConsulta", {})
      .then((response) => {
        setConsultas(response.data || []);
      })
      .catch((error) => {
        console.error("Error obteniendo tipos de consulta:", error);
      });
  };

  /* Solicita los empleados de la base de datos */

  const getEmpleado = () => {
    Axios.get("http://localhost:3001/crudCitas/getEmpleados", {})
      .then((empleado) => {
        setEmpleados(empleado.data || []);
      })
      .catch((error) => {
        console.error("Error obteniendo empleados:", error);
      });
  };
  /* Solicitar clientes de la base de datos */
  const getCliente = useCallback((cliente) => {
    if (!cliente) return;

    Axios.get("http://localhost:3001/crudCitas/getClientes", {
      params: { NumeroDocumentoCliente: cliente },
    })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setMensaje("");
          setClientes(response.data);
          setClienteBuscado(true);
        } else {
          setMensaje("Cliente no encontrado");
          setClientes([]);
        }
      })
      .catch((error) => {
        console.error("Error obteniendo cliente:", error);
        setMensaje("Hubo un error al buscar el cliente. Intenta nuevamente.");
      });
  }, []);



  /* SOLICITUD PARA CANCELAR CITA */
  const changeEstado = (id,identificadorHorario,idEstado,idEstadoH) => {


    Axios.patch("http://localhost:3001/crudCitas/cancelCita", {
      idCita:id,
      idEstadoCita: idEstado,
      idHorario: identificadorHorario,
      idEstadoHorario:idEstadoH,
    }).then((response) => {
      
      if(!response.data.message) {
      if(idEstado === 1){
        setMensaje("Cita cancelada");
      }else if(idEstado=== 3){
        setMensaje("Cita activada");
      }}else{
        setMensaje(response.data.message);
      }
      searchFilter();

    });
  };

  const updateCita = (id,idEstadoH,idHorario1) => {
    const fechaFormateada = formatearFecha(fecha);
    if (!idHorario) {
      setMensaje("Por favor seleccione fecha y hora");
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

    Axios.patch("http://localhost:3001/crudCitas/updateCita", {
      idCita: id,
      estadoHorario: idEstadoH,
      idHorario1: idHorario1,
      idHorario: idHorario,
      idTipoConsulta: tipoConsulta,
    })

      .then((response) => {
        // Limpiar campos
        setFecha("");
        setHora("");
        setTipoConsulta("");
        setSelectHorario(false);

        setConsultas([]);

        // Mostrar mensaje de éxito
        setMensaje("Cita actualizada correctamente");

        setSearch();

      })
      .catch((error) => {
        console.error("Error al agregar cita:", error);
      });
  };


  /* FUNCIONES */

  function limpiarCampos(){
    setFecha("");
    setHora("");
    setDocumentoCliente("");
    setDocumentoOftalmologo("");
    setTipoConsulta("");
    setSelectHorario(false);

    setClientes([]);
    setEmpleados([]);
    setConsultas([]);
    setHorarios([]);
  }

  function limpiarCamposFiltro(){
    setSearch("");
    setTipoConsultaFilter("");
    setFechaFilter("");
    
    setConsultas([]);
  }

  /* Muestra los empleados registrados */
  function listaEmpleados(empleados) {
    return (
      <select
        onChange={(event) => {
          setDocumentoOftalmologo(event.target.value);
        }}
        type="number"
        className="p-2 border rounded"
        required
      >
        <option value="" selected="" disabled="">Seleccione un empleado</option>
        {empleados.map((empleado, index) => (
          <option value={empleado.numeroDocumento} key={index}>
            {empleado.nombre}
          </option>
        ))}
      </select>
    );
  }


  /* MUESTRA LOS HORARIOS COMO BOTONES */
  function listaHorario(horarios) {
    return (
      <div className="horarios-container">
        {horarios.map((horario, index) => (
          <button
          type="button"
            className={`seleccionarHorario ${selectHorario && horario.hora === hora ? "activo" : ""
              }`}
            key={index}
            onClick={() => {
              if (!selectHorario) {
                setHora(horario.hora);
                setSelectHorario(true);
                setIdHorario(horario.id);
              } else {
                setHora("");
                setSelectHorario(false);
                setIdHorario([]);
              }
            }}
          >
            {horario.hora}
          </button>
        ))}
      </div>
    );
  }

  /* LIMITA EL RANGO DE FECHAS DONDE HAY CITAS DISPONIBLES (no hay citas disponibles desde antes de hoy y despues de tres semanas a partir de hoy) */
  function validarFechas(fecha) {
    if (!fecha) return false;
    const fechaActual = new Date();
    const fechaSeleccionada = new Date(fecha);
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaActual.getDate() + 21);

    return fechaSeleccionada > fechaActual && fechaSeleccionada <= fechaLimite;
  }

  /* MUESTRA LOS TIPO DE CONSULTAS DISPONIBLES */
  function listaTipoConsultas(consulta) {
    return (
      <select
        onChange={(event) => {
          setTipoConsulta(event.target.value);
        }}
        className="p-2 border rounded"
        required
      >
        <option value="" selected="" disabled="">Seleccione tipo de consulta</option>
        {consulta.map((consultas, index) => (
          <option value={consultas.idtipoConsulta} key={index}>
            {consultas.nombre}
          </option>
        ))}
      </select>
    );
  }

  function listaTipoConsultasFilter(consulta) {
    return (
      <select
      onClick={() => {getEmpleado(); getConsultas();}}
        onChange={(event) => {
          setTipoConsultaFilter(event.target.value);
        }}
        className="p-2 border rounded"
      >
        <option value="" selected="" disabled="">Seleccione tipo de consulta</option>
        {consulta.map((consultas, index) => (
          <option value={consultas.idtipoConsulta} key={index}>
            {consultas.nombre}
          </option>
        ))}
      </select>
    );
  }



  const RutaEstablecida = (rol) => {
    if (rol === '2') return '/IndexEmpleado';
    if (rol === '3') return '/IndexAdmin';
  };


  useEffect(() => {
    searchFilter();
    getEmpleado();
    getConsultas();
    if (fecha) getHorario(fecha);
  }, [fecha, search, searchFilter, fechaFilter]);

  return (
    <div className="Body">
      <div className="navBar">
        <nav className="navbar navbar-dark bg-danger">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <Link to={RutaEstablecida(localStorage.getItem("userRole"))}>
                <div className="BackButton">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    className="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    />
                  </svg>
                </div>
              </Link>
            </button>
          </div>
        </nav>
      </div>


      <div className="ClientesTable">
        <h4>{mensaje}</h4>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#agendar"
          onClick={() => {getEmpleado(); getConsultas();}}
        >
          Agendar Cita
        </button>
        <button
          type="button"
          class="btn btn-secundary"
          onClick={() => limpiarCamposFiltro()}
        >
          Limpiar campos
        </button>
        <input type="text" placeholder="Ingrese documento de cliente o del oftalmmologo"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded mb-4"></input>
        <input
          type="date"
          value={fechaFilter}
          className="w-full p-2 border rounded  m-4"
          onChange={(e) => setFechaFilter(e.target.value)}
        ></input>
        {listaTipoConsultasFilter(consultas)}

        <div
          class="modal fade"
          id="agendar"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          {/* MODAL PARA AGREGAR CITA */}

          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  Agendar Cita
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  onClick={() =>limpiarCampos()}
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form method="POST" role="form" onSubmit={(e) => { e.preventDefault(); addCita(); }}>
                  <div>
                    <div className="mb-3">
                      <label htmlFor="fechaHora" className="form-label">
                        Fecha:
                        <input
                          type="date"
                          className="form-control"
                          id="fechaHora"
                          name="fechaHora"
                          value={fecha}
                          onChange={(event) => {
                            setFecha(event.target.value);
                          }}
                          required
                        ></input>
                      </label>
                    </div>
                    {fecha==="" ? "":(validarFechas(fecha) ? (
                      listaHorario(horarios)
                    ) : (
                      <p>No hay citas diponibles</p>
                    ))}
                    <div className="mb-3">
                      <label htmlFor="fechaHora" className="form-label">
                        Documento cliente:
                        <input
                          type="number"
                          className="form-control"
                          id="documentoCliente"
                          name="documentoCliente"
                          required
                          value={NumeroDocumentoCliente}
                          onChange={(event) => {setDocumentoCliente(event.target.value);
                            setClienteBuscado(false);
                          }}
                        />
                      </label>
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => getCliente(NumeroDocumentoCliente)}
                      disabled={!NumeroDocumentoCliente}
                    >
                      Buscar Cliente
                    </button>
                    <div>
                      {clientes.map((val, key) => {
                        return <div><h6>{val.nombre}</h6>
                        <h6>{val.correo}</h6></div>;
                      })}
                    </div>

                    <div className="mb-3">
                      <label>
                        Documento oftalmologo:
                        {listaEmpleados(empleados)}
                      </label>
                    </div>
                    <br />
                    <div className="mb-3">
                      <label htmlFor="tipoConsulta" className="form-label">
                        Tipo de consulta:
                        {listaTipoConsultas(consultas)}
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    disabled={clientes.length === 0 || !clienteBuscado || !NumeroDocumentoOftalmologo || !tipoConsulta}
                  >
                    Agendar
                  </button>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="reset"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() =>limpiarCampos()}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr className="tr1">
              <th scope="col">Fecha/Hora</th>
              <th scope="col">Paciente</th>
              <th scope="col">Profesional</th>
              <th scope="col">TipoConsulta</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {results.map((cita, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{cita.fechaHora}</th>
                  <td>{cita.nombreCliente}</td>
                  <td>{cita.nombreEmpleado}</td>
                  <td>{cita.tipoConsulta}</td>
                  <td>
                    <div className="actions">
                      {cita.idEstadoCita === 3 ? "":
                      <button
                        type="button"
                        className="btn1"
                        data-bs-toggle="modal"
                        data-bs-target="#Modificar"
                        onClick={() => {setCitaSeleccionada(cita); getConsultas()}}
                      >
                        Modificar
                      </button>}  
                      <button
                        type="button"
                        class="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#Detalles"
                        onClick={() => detallesCita(cita)}
                      >
                        Detalles
                      </button>
                      {cita.idEstadoCita === 3 ? (
                        <p className="txt1">
                          <i
                          data-bs-toggle="modal"
                          data-bs-target="#activar" 
                          onClick={() => setCitaSeleccionada(cita)}> Cancelada </i>
                        </p>
                      ) : (
                        <button
                          type="button"
                          className="btn2"
                          data-bs-toggle="modal"
                          data-bs-target="#cancelar"
                          onClick={() => setCitaSeleccionada(cita)}
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        className="modal fade"
        id="Modificar"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Editar Cita
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() =>limpiarCampos()}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form method="POST" role="form" onSubmit={(e) => { e.preventDefault(); updateCita(citaSeleccionada.idCita,citaSeleccionada.idEstadoHorario,citaSeleccionada.idHorarios); }}>
              <div>
                <div className="mb-3">
                  <label htmlFor="fechaHora" className="form-label">
                    Fecha/Hora
                  </label>
                  <input
                    type="date"
                    value={fecha}
                    className="form-control"
                    required
                    onChange={(event) => {
                      setFecha(event.target.value);
                    }}
                  />
                </div>
                {fecha==="" ? "":(validarFechas(fecha) ? (
                      listaHorario(horarios)
                    ) : (
                      <p>No hay citas diponibles</p>
                    ))}
                <div className="mb-3">
                  <label htmlFor="tipoConsulta" className="form-label">
                  </label>

                  {listaTipoConsultas(consultas)}
                </div>
              </div>
              <button type="submit" className="btn btn btn-danger" data-bs-dismiss="modal" disabled={!tipoConsulta || !hora}>
                Guardar Cambios
              </button>
              </form>
            </div>
            <div className="modal-footer">

              <button type="button" className="btn2" data-bs-dismiss="modal" onClick={() =>limpiarCampos()}>
                Cancelar
              </button>
              
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="activar"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                activar
              </h5>
            </div>
            <div className="modal-body">
              ¿Está seguro que desea activar esta cita?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn2" data-bs-dismiss="modal"
                onClick={() => setMensaje("")}
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn1"
                data-bs-dismiss="modal"
                onClick={() => changeEstado(citaSeleccionada.idCita,citaSeleccionada.idHorarios,citaSeleccionada.idEstadoCita, citaSeleccionada.estadoHorario)}
              >
                Activar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="cancelar"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Eliminar
              </h5>
            </div>
            <div className="modal-body">
              ¿Está seguro que desea cancelar esta cita?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn2" data-bs-dismiss="modal"
                onClick={() => setMensaje("")}
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn1"
                data-bs-dismiss="modal"
                onClick={() => changeEstado(citaSeleccionada.idCita,citaSeleccionada.idHorarios,citaSeleccionada.idEstadoCita, citaSeleccionada.estadoHorario)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="Detalles"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Detalles
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {detallesCita ? (
                <>
                  <p>
                    <strong>Fecha: </strong>{" "}
                    {citaSeleccionada?.fecha
                      ? formatearFecha(citaSeleccionada.fecha)
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Hora: </strong> {citaSeleccionada.hora}
                  </p>
                  <p>
                    <strong>Nombre del paciente: </strong>{" "}
                    {citaSeleccionada.nombreCliente}
                  </p>
                  <p>
                    <strong>Nombre del oftalmologo: </strong>{" "}
                    {citaSeleccionada.nombreEmpleado}
                  </p>
                  <p>
                    <strong>Tipo de consulta: </strong>{" "}
                    {citaSeleccionada.tipoConsulta}
                  </p>
                  <p>
                    <strong>Direccion: </strong> {citaSeleccionada.direccion}
                  </p>
                  <p>
                    <strong>Estado: </strong> {citaSeleccionada.estadoCita}
                  </p>
                </>
              ) : (
                <p>No hay datos</p>
              )}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrudCita;