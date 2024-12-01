import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Css/StyleAdminClientes.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Emailvalidation from '@everapi/emailvalidation-js'


function Crud_clientes() {
  const [CrudClient, SetcrudClient] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({
    numeroDocumento: '',
    idTipoIdentificacion: '',
    Nombres: '',
    Apellidos: '',
    correo: '',
    telefono: '',
    idGenero: '',
    estadoPersona: true 
  });

  const [error, setError] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const [clienteEditado, setClienteEditado] = useState({
    numeroDocumento: '',
    idTipoIdentificacion: '',
    Nombres: '',
    Apellidos: '',
    correo: '',
    telefono: '',
    idGenero: '',
    estadoPersona: true 
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    getClientes();
  }, []);

  const getClientes = () => {
    Axios.get("http://localhost:3001/crudClientes/consultaCliente")
      .then((response) => {
        console.log("Datos obtenidos:", response.data);
        SetcrudClient(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  };

  const añadirCliente = () => {
    // Validación de Campos Vacíos
    if (!nuevoCliente.numeroDocumento || !nuevoCliente.Nombres || !nuevoCliente.Apellidos || !nuevoCliente.correo || !nuevoCliente.telefono || !nuevoCliente.idGenero) {
      setError(true);
      setValidationMessage("Por favor, complete todos los campos obligatorios.");
      return;
    }
    setError(false);
    setValidationMessage("");
  
    // Define el cliente de Emailvalidation aquí
    const client = new Emailvalidation('ema_live_6WmdRIZwQrF3ji7fd4X89YctsfGTBvGUa9L9JqsX');
  
    // Realizar la verificación de correo
    client.info(nuevoCliente.correo, { catch_all: 0 })
      .then(response => {
        console.log(response);
        console.log(response.smtp_check);
  
        if (response.smtp_check) {
          // Si el correo es válido, se procede con el registro
          setValidationMessage("El correo es válido.");
          setError(false);
          
          Axios.post("http://localhost:3001/crudClientes/agregarCliente", nuevoCliente)
            .then(() => {
              alert("Cliente añadido con éxito");
              getClientes();
              setNuevoCliente({
                numeroDocumento: '',
                idTipoIdentificacion: '',
                Nombres: '',
                Apellidos: '',
                correo: '',
                telefono: '',
                idGenero: '',
                estadoPersona: true
              });
              setShowAddModal(false);
            })
            .catch((error) => {
              console.error("Error adding client:", error);
              alert("Error al añadir cliente. Verifique los datos.");
            });
        } else {
          // Si el correo no es válido, se muestra el mensaje correspondiente
          setValidationMessage("El correo electrónico no es válido.");
          setError(true);
        }
      })
      .catch(error => {
        console.error("Error en la validación de correo:", error);
        setValidationMessage("Hubo un error al verificar el correo. Intenta más tarde.");
        setError(true);
      });
  };
  
  

  const guardarEdicion = () => {
    Axios.put("http://localhost:3001/crudClientes/actualizarCliente", clienteEditado)
      .then(() => {
        alert("Cliente editado con éxito");
        getClientes();
        setClienteEditado({
          numeroDocumento: '',
          idTipoIdentificacion: '',
          Nombres: '',
          Apellidos: '',
          correo: '',
          telefono: '',
          idGenero: '',
          estadoPersona: true
        });
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error("Error editing client:", error);
        alert("Error al editar cliente. Verifique los datos.");
      });
  };

  const editarCliente = (cliente) => {
    setClienteEditado(cliente);
    setShowEditModal(true);
  };

  return (
    <div>

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

      <button className='btn1-move' onClick={() => setShowAddModal(true)}>
        Añadir Cliente
      </button>

    {/* Modal para Añadir Cliente */}
<Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Añadir Cliente</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    {/* Mensaje de Validación */}
    {validationMessage && (
      <div className="alert alert-danger" role="alert">
        {validationMessage}
      </div>
    )}

    <Form>
      {/* Número de Documento */}
      <Form.Group className="mb-3" controlId="formBasicNumeroDocumento">
        <Form.Label>Número de Documento</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese número de documento"
          value={nuevoCliente.numeroDocumento}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, numeroDocumento: e.target.value })}
          isInvalid={error && !nuevoCliente.numeroDocumento}
        />
      </Form.Group>

      {/* Tipo de Identificación */}
      <Form.Group className="mb-3" controlId="formBasicTipoIdentificacion">
        <Form.Label>Tipo de Identificación</Form.Label>
        <Form.Select
          value={nuevoCliente.idTipoIdentificacion}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, idTipoIdentificacion: e.target.value })}
          isInvalid={error && !nuevoCliente.idTipoIdentificacion}
        >
          <option value="">Seleccione tipo de identificación</option>
          <option value="1">C.C</option>
          <option value="2">T.I</option>
          <option value="3">C.E</option>
        </Form.Select>
      </Form.Group>

      {/* Nombres */}
      <Form.Group className="mb-3" controlId="formBasicNombres">
        <Form.Label>Nombres</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese nombres"
          value={nuevoCliente.Nombres}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, Nombres: e.target.value })}
          isInvalid={error && !nuevoCliente.Nombres}
        />
      </Form.Group>

      {/* Apellidos */}
      <Form.Group className="mb-3" controlId="formBasicApellidos">
        <Form.Label>Apellidos</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese apellidos"
          value={nuevoCliente.Apellidos}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, Apellidos: e.target.value })}
          isInvalid={error && !nuevoCliente.Apellidos}
        />
      </Form.Group>

      {/* Género */}
      <Form.Group className="mb-3" controlId="formBasicGenero">
        <Form.Label>Género</Form.Label>
        <Form.Select
          value={nuevoCliente.idGenero}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, idGenero: e.target.value })}
          isInvalid={error && !nuevoCliente.idGenero}
        >
          <option value="">Seleccione género</option>
          <option value="1">Masculino</option>
          <option value="2">Femenino</option>
          <option value="3">Otro</option>
        </Form.Select>
      </Form.Group>

      {/* Correo */}
      <Form.Group className="mb-3" controlId="formBasicCorreo">
        <Form.Label>Correo</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese correo"
          value={nuevoCliente.correo}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, correo: e.target.value })}
          isInvalid={error && !nuevoCliente.correo}
        />
      </Form.Group>

      {/* Teléfono */}
      <Form.Group className="mb-3" controlId="formBasicTelefono">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese teléfono"
          value={nuevoCliente.telefono}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
          isInvalid={error && !nuevoCliente.telefono}
        />
      </Form.Group>

      {/* Estado */}
      <Form.Group className="mb-3" controlId="formBasicEstado">
        <Form.Label>Estado</Form.Label>
        <Form.Select
          value={nuevoCliente.estadoPersona}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, estadoPersona: e.target.value })}
          isInvalid={error && !nuevoCliente.estadoPersona}
        >
          <option value="0">Activo</option>
          <option value="1">Inactivo</option>
        </Form.Select>
      </Form.Group>
    </Form>
  </Modal.Body>

  <Modal.Footer>
    <button className="btn2" onClick={() => setShowAddModal(false)}>
      Cerrar
    </button>
    <button className="btn1" onClick={añadirCliente}>
      Añadir
    </button>
  </Modal.Footer>
</Modal>


{/* Modal para Editar Cliente */}
<Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Editar Cliente</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      {/* Número de Documento */}
      <Form.Group className="mb-3" controlId="formBasicNumeroDocumento">
        <Form.Label>Número de Documento</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese número de documento"
          value={clienteEditado.numeroDocumento}
          onChange={(e) => setClienteEditado({ ...clienteEditado, numeroDocumento: e.target.value })}
        />
      </Form.Group>

      {/* Tipo de Identificación */}
      <Form.Group className="mb-3" controlId="formBasicTipoIdentificacion">
        <Form.Label>Tipo de Identificación</Form.Label>
        <Form.Select
          value={clienteEditado.idTipoIdentificacion}
          onChange={(e) => setClienteEditado({ ...clienteEditado, idTipoIdentificacion: e.target.value })}
        >
          <option value="">Seleccione tipo de identificación</option>
          <option value="1">C.C</option>
          <option value="2">T.I</option>
          <option value="3">C.E</option>
        </Form.Select>
      </Form.Group>

      {/* Nombres */}
      <Form.Group className="mb-3" controlId="formBasicNombres">
        <Form.Label>Nombres</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese nombres"
          value={clienteEditado.Nombres}
          onChange={(e) => setClienteEditado({ ...clienteEditado, Nombres: e.target.value })}
        />
      </Form.Group>

      {/* Apellidos */}
      <Form.Group className="mb-3" controlId="formBasicApellidos">
        <Form.Label>Apellidos</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese apellidos"
          value={clienteEditado.Apellidos}
          onChange={(e) => setClienteEditado({ ...clienteEditado, Apellidos: e.target.value })}
        />
      </Form.Group>

      {/* Género */}
      <Form.Group className="mb-3" controlId="formBasicGenero">
        <Form.Label>Género</Form.Label>
        <Form.Select
          value={clienteEditado.idGenero}
          onChange={(e) => setClienteEditado({ ...clienteEditado, idGenero: e.target.value })}
        >
          <option value="">Seleccione género</option>
          <option value="1">Masculino</option>
          <option value="2">Femenino</option>
          <option value="3">Otro</option>
        </Form.Select>
      </Form.Group>

      {/* Correo */}
      <Form.Group className="mb-3" controlId="formBasicCorreo">
        <Form.Label>Correo</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese correo"
          value={clienteEditado.correo}
          onChange={(e) => setClienteEditado({ ...clienteEditado, correo: e.target.value })}
        />
      </Form.Group>

      {/* Teléfono */}
      <Form.Group className="mb-3" controlId="formBasicTelefono">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese teléfono"
          value={clienteEditado.telefono}
          onChange={(e) => setClienteEditado({ ...clienteEditado, telefono: e.target.value })}
        />
      </Form.Group>

      {/* Estado */}
      <Form.Group className="mb-3" controlId="formBasicEstado">
        <Form.Label>Estado</Form.Label>
        <Form.Select
          value={clienteEditado.estadoPersona}
          onChange={(e) => setClienteEditado({ ...clienteEditado, estadoPersona: e.target.value })}
        >
          <option value="0">Activo</option>
          <option value="1">Inactivo</option>
        </Form.Select>
      </Form.Group>
    </Form>
  </Modal.Body>

  <Modal.Footer>
    <button className="btn2" onClick={() => setShowEditModal(false)}>
      Cerrar
    </button>
    <button className="btn1" onClick={guardarEdicion}>
      Guardar
    </button>
  </Modal.Footer>
</Modal>


          <table className="table table-striped" id="TablaClientes">
            <thead>
              <tr>
                <th scope="row">Documento</th>
                <th>Tipo Identificación</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Género</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {CrudClient.map((cliente, key) => (
                <tr key={key}>
                  <th scope="row">{cliente.numeroDocumento}</th>
                  <td>{cliente.idTipoIdentificacion}</td>
                  <td>{cliente.Nombres}</td>
                  <td>{cliente.Apellidos}</td>
                  <td>{cliente.idGenero}</td>
                  <td>{cliente.correo}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.estadoPersona}</td> {/* Nuevo campo "Estado" */}
                  <td>
                    <button
                      type="button"
                      className="btn1"
                      onClick={() => editarCliente(cliente)}
                    >
                      Modificar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

    </div>
  );
}

export default Crud_clientes;
