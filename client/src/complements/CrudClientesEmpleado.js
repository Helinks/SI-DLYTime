import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Css/StyleAdminClientes.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { jsPDF } from "jspdf";
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
    
    let yPosition = 30; // Posición inicial para el texto
  
    // Función para agregar texto y controlar el salto de página
    const addTextToPDF = (text, title = false) => {
      if (yPosition + 10 > doc.internal.pageSize.height) { // Verifica si el texto se sale de la página
        doc.addPage(); // Agrega una nueva página
        yPosition = 20; // Reinicia la posición vertical
      }
  
      if (title) {
        doc.setFontSize(14);
        doc.text(text, 20, yPosition);
        doc.setFontSize(12);
      } else {
        doc.text(text, 20, yPosition);
      }
      yPosition += 10; // Espacio para la siguiente línea de texto
    };
  
    // Sección de Datos Personales
    addTextToPDF("Datos Personales:", true);
    addTextToPDF(`N° Historia: ${formData.numeroHistoria}`);
    addTextToPDF(`Teléfono: ${formData.telefono}`);
    addTextToPDF(`Fecha: ${formData.fecha}`);
    addTextToPDF(`Filiación: ${formData.filiacion}`);
    addTextToPDF(`Nombres: ${formData.nombres}`);
    addTextToPDF(`Edad: ${formData.edad}`);
    addTextToPDF(`Ocupación: ${formData.ocupacion}`);
    addTextToPDF(`Sexo: ${formData.sexo}`);
    addTextToPDF(`Procedencia: ${formData.procedencia}`);
    
    // Sección de Motivo de Consulta y Antecedentes
    addTextToPDF("Motivo de la Consulta y Antecedentes:", true);
    addTextToPDF(`Motivo de la consulta: ${formData.motivoConsulta}`);
    addTextToPDF(`Antecedentes: ${formData.antecedentes}`);
    addTextToPDF(`Desarrollo Psicomotriz: ${formData.desarrolloPsicomotriz}`);
    addTextToPDF(`¿Usa Rx?: ${formData.usaRx}`);
    addTextToPDF(`RX en uso: ${formData.rxUso}`);
    addTextToPDF(`OD: ${formData.odUso}`);
    addTextToPDF(`OI: ${formData.oiUso}`);
    addTextToPDF(`Última fecha de control: ${formData.ultimaFechaControl}`);
    addTextToPDF(`Cirugías oculares: ${formData.cirugiasOculares}`);
    addTextToPDF(`Otros: ${formData.otros}`);
    addTextToPDF(`Antecedentes familiares: ${formData.antecedentesFamiliares}`);
    
    // Sección de Diagnóstico y Tratamiento
    addTextToPDF("Diagnóstico y Tratamiento:", true);
    addTextToPDF(`Diagnóstico 1: ${formData.diagnostico1}`);
    addTextToPDF(`CIE 10 (1): ${formData.cie1}`);
    addTextToPDF(`Diagnóstico 2: ${formData.diagnostico2}`);
    addTextToPDF(`CIE 10 (2): ${formData.cie2}`);
    addTextToPDF(`Observaciones: ${formData.observaciones}`);
    addTextToPDF(`Plan de trabajo: ${formData.planTrabajo}`);
    addTextToPDF(`Tratamiento: ${formData.tratamiento}`);
    addTextToPDF(`Recomendaciones: ${formData.recomendaciones}`);
  
    // Convertir el archivo PDF en un blob
    const pdfOutput = doc.output("blob");
  
    // Crear el nombre del archivo con el número de documento
    const timestamp = Date.now();
    const nombreArchivo = `${numeroDocumentoSeleccionado}_${timestamp}.pdf`;
  
    const archivoPDF = new File([pdfOutput], nombreArchivo, { type: "application/pdf" });
  
    const formDataPDF = new FormData();
    formDataPDF.append("archivoPDF", archivoPDF);
    formDataPDF.append("numeroDocumento", numeroDocumentoSeleccionado);
  
    Axios.post("http://localhost:3001/crudClientes/agregarHistorialClinico", formDataPDF, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
