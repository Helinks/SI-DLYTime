import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Css/StyleAdminClientes.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';


function CrudClientes() {
  const [CrudClient, SetcrudClient] = useState([]);
  const [clienteEditado, setClienteEditado] = useState({
    estadoPersona: true
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showHistorialModal, setShowHistorialModal] = useState(false);
  const [descripcionHistorial, setDescripcionHistorial] = useState('');
  const [archivoPDF, setArchivoPDF] = useState(null);  // Guardar archivo PDF
  const [historialClinico, setHistorialClinico] = useState([]);
  const [numeroDocumentoSeleccionado, setNumeroDocumentoSeleccionado] = useState('');

  useEffect(() => {
    getClientes();
  }, []);
    //
  const getClientes = () => {
    Axios.get("http://localhost:3001/crudClientes/consultaCliente")
      .then((response) => {
        SetcrudClient(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  };

  const abrirHistorialModal = (numeroDocumento) => {
    setNumeroDocumentoSeleccionado(numeroDocumento); // Guardar el numeroDocumento seleccionado
    setHistorialClinico([]);
    Axios.get(`http://localhost:3001/crudClientes/consultaHistorialClinico/${numeroDocumento}`)
      .then((response) => {
        setHistorialClinico(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener historial clínico:", error);
      });
    setShowHistorialModal(true);
  };

  const agregarHistorialClinico = () => {
    if (!descripcionHistorial || !archivoPDF) {
      alert("Por favor, ingresa todos los campos.");
      return;
    }

    const formData = new FormData();
    formData.append("numeroDocumento", numeroDocumentoSeleccionado); // Usar el numeroDocumento seleccionado
    formData.append("descripcion", descripcionHistorial);
    formData.append("archivoPDF", archivoPDF);

    Axios.post("http://localhost:3001/crudClientes/agregarHistorialClinico", formData)
      .then(() => {
        alert("Historial clínico agregado con éxito");
        setShowHistorialModal(false);
        setDescripcionHistorial('');
        setArchivoPDF(null);
        getClientes(); // Refrescar lista de clientes después de agregar el historial
      })
      .catch((error) => {
        console.error("Error al agregar historial clínico:", error);
        alert("Error al agregar historial clínico.");
      });
  };

  return (
    <div>
      <div className='barra-head'>
        <nav className="navbar navbar-dark bg-danger">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="navbar-brand">
              <Link to="/IndexEmpleado">
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
              <td>{cliente.estadoPersona ? 'Activo' : 'Inactivo'}</td>
              <td>
                <button
                  type="button"
                  className="btn1"
                  onClick={() => abrirHistorialModal(cliente.numeroDocumento)} // Abrir modal con datos del cliente
                >
                  Ver Historial
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para Agregar/Ver Historial Clínico */}
      <Modal show={showHistorialModal} onHide={() => setShowHistorialModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Historial Clínico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Agregar Nuevo Historial Clínico</h5>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={descripcionHistorial}
                onChange={(e) => setDescripcionHistorial(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Archivo PDF</Form.Label>
              <Form.Control
                type="file"
                accept="application/pdf"
                onChange={(e) => setArchivoPDF(e.target.files[0])}
              />
            </Form.Group>
          </Form>

          <h5>Historiales Clínicos Existentes</h5>
          <ul>
            {historialClinico.map((item, index) => (
              <li key={index}>
                {item.descripcion} - 
                <a href={`http://localhost:3001/uploads/${item.archivoPDF}`} target="_blank" rel="noopener noreferrer">
                  Ver PDF
                </a>
              </li>
            ))}
          </ul>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn2" onClick={() => setShowHistorialModal(false)}>
            Cerrar
          </button>
          <button className="btn1" onClick={agregarHistorialClinico}>
            Guardar Historial
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CrudClientes;
