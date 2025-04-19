import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Css/StyleAdminClientes.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { jsPDF } from "jspdf"; // Importamos jsPDF
import { Link } from 'react-router-dom';

function CrudClientes() {
  const [CrudClient, SetcrudClient] = useState([]);
  const [showHistorialModal, setShowHistorialModal] = useState(false);
  const [historialClinico, setHistorialClinico] = useState([]);
  const [numeroDocumentoSeleccionado, setNumeroDocumentoSeleccionado] = useState('');
  
  const [formData, setFormData] = useState({
    numeroHistoria: '',
    telefono: '',
    fecha: '',
    filiacion: '',
    nombres: '',
    edad: '',
    ocupacion: '',
    sexo: '',
    procedencia: '',
    motivoConsulta: '',
    antecedentes: '',
    desarrolloPsicomotriz: '',
    usaRx: '',
    rxUso: '',
    odUso: '',
    oiUso: '',
    ultimaFechaControl: '',
    cirugiasOculares: '',
    otros: '',
    antecedentesFamiliares: '',
    diagnostico1: '',
    cie1: '',
    diagnostico2: '',
    cie2: '',
    observaciones: '',
    planTrabajo: '',
    tratamiento: '',
    recomendaciones: ''
  });

  useEffect(() => {
    getClientes();
  }, []);
  
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
    setNumeroDocumentoSeleccionado(numeroDocumento);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const guardarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Historia Clínica de Optometría", 20, 20);

    // Aquí agregamos cada sección con los datos del formulario
    doc.text(`N° Historia: ${formData.numeroHistoria}`, 20, 30);
    doc.text(`Teléfono: ${formData.telefono}`, 20, 40);
    doc.text(`Fecha: ${formData.fecha}`, 20, 50);
    doc.text(`Filiación: ${formData.filiacion}`, 20, 60);
    doc.text(`Nombres: ${formData.nombres}`, 20, 70);
    doc.text(`Edad: ${formData.edad}`, 20, 80);
    doc.text(`Ocupación: ${formData.ocupacion}`, 20, 90);
    doc.text(`Sexo: ${formData.sexo}`, 20, 100);
    doc.text(`Procedencia: ${formData.procedencia}`, 20, 110);
    doc.text(`Motivo de la consulta: ${formData.motivoConsulta}`, 20, 120);
    doc.text(`Antecedentes: ${formData.antecedentes}`, 20, 130);
    doc.text(`Desarrollo Psicomotriz: ${formData.desarrolloPsicomotriz}`, 20, 140);
    doc.text(`¿Usa Rx?: ${formData.usaRx}`, 20, 150);
    doc.text(`RX en uso: ${formData.rxUso}`, 20, 160);
    doc.text(`OD: ${formData.odUso}`, 20, 170);
    doc.text(`OI: ${formData.oiUso}`, 20, 180);
    doc.text(`Última fecha de control: ${formData.ultimaFechaControl}`, 20, 190);
    doc.text(`Cirugías oculares: ${formData.cirugiasOculares}`, 20, 200);
    doc.text(`Otros: ${formData.otros}`, 20, 210);
    doc.text(`Antecedentes familiares: ${formData.antecedentesFamiliares}`, 20, 220);

    doc.text(`Diagnóstico 1: ${formData.diagnostico1}`, 20, 230);
    doc.text(`CIE 10 (1): ${formData.cie1}`, 20, 240);
    doc.text(`Diagnóstico 2: ${formData.diagnostico2}`, 20, 250);
    doc.text(`CIE 10 (2): ${formData.cie2}`, 20, 260);
    doc.text(`Observaciones: ${formData.observaciones}`, 20, 270);
    doc.text(`Plan de trabajo: ${formData.planTrabajo}`, 20, 280);
    doc.text(`Tratamiento: ${formData.tratamiento}`, 20, 290);
    doc.text(`Recomendaciones: ${formData.recomendaciones}`, 20, 300);

    // Convertir el archivo PDF en un blob
    const pdfOutput = doc.output('blob');

    // Crear un FormData para enviar el archivo al backend
    const formDataPDF = new FormData();
    formDataPDF.append("archivoPDF", pdfOutput, "historia_clinica.pdf");
    formDataPDF.append("numeroDocumento", numeroDocumentoSeleccionado);
    formDataPDF.append("nombres", formData.nombres); // Agregar nombres aquí      
    
    // Enviar el archivo PDF al backend
    Axios.post("http://localhost:3001/crudClientes/agregarHistorialClinico", formDataPDF, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log("PDF guardado correctamente:", response.data);
      alert("Historia clínica guardada exitosamente.");
    })
    .catch((error) => {
      console.error("Error al guardar PDF:", error);
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

      {/* Modal para Historia Clínica */}
      <Modal show={showHistorialModal} onHide={() => setShowHistorialModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Historia Clínica de Optometría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="formularioHistoria" style={{ backgroundColor: '#fff', padding: '10px' }}>
            <h5>Anamnesis</h5>
            {/* Aquí renderizamos todos los campos de texto para la historia clínica */}
            {["N° Historia", "Teléfono", "Fecha", "Filiación", "Nombres", "Edad", "Ocupación", "Sexo", "Procedencia", "Motivo de la consulta", "Antecedentes", "Desarrollo Psicomotriz", "¿Usa Rx?", "RX en uso", "OD", "OI", "Última fecha de control", "Cirugías oculares", "Otros", "Antecedentes familiares"].map(field => (
              <Form.Group key={field} className="mb-3">
                <Form.Label>{field}</Form.Label>
                <Form.Control
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}

            <h5>Diagnóstico y Tratamiento</h5>
            {["Diagnóstico 1", "CIE 10 (1)", "Diagnóstico 2", "CIE 10 (2)", "Observaciones", "Plan de trabajo", "Tratamiento", "Recomendaciones"].map(field => (
              <Form.Group key={field} className="mb-3">
                <Form.Label>{field}</Form.Label>
                <Form.Control
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}
          </div>
          <button onClick={guardarPDF} className="btn btn-success mt-3">Guardar</button>

          <h5 className="mt-4">Historiales Existentes</h5>
          <ul>
            {historialClinico.map((item, i) => (
              <li key={i}>{item.descripcion} - <a href={`http://localhost:3001/uploads/${item.archivoPDF}`} target="_blank" rel="noreferrer">Ver PDF</a></li>
            ))}
          </ul>
        </Modal.Body>

        <Modal.Footer>
          <button onClick={() => setShowHistorialModal(false)} className="btn btn-secondary">Cerrar</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CrudClientes;
