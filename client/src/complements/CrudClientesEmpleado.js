import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Css/StyleAdminClientes.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';


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
    // Verificar los datos capturados en el formulario
    console.log(formData); 
    
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Historia Clínica de Optometría", 20, 20);
  
    let yPosition = 30; 
  
    // Función para añadir texto al PDF
    const addTextToPDF = (text, title = false) => {
      if (yPosition + 10 > doc.internal.pageSize.height) {
        doc.addPage();
        yPosition = 20;
      }
  
      if (title) {
        doc.setFontSize(14);
        doc.text(text, 20, yPosition);
        doc.setFontSize(12);
      } else {
        doc.text(text, 20, yPosition);
      }
  
      yPosition += 10; 
    };
  
    // Datos Personales
    addTextToPDF("Datos Personales:", true);
    const personalData = [
      ["N° Historia", formData.numeroHistoria],
      ["Teléfono", formData.telefono],
      ["Fecha", formData.fecha],
      ["Filiación", formData.filiacion],
      ["Nombres", formData.nombres],
      ["Edad", formData.edad],
      ["Ocupación", formData.ocupacion],
      ["Sexo", formData.sexo],
      ["Procedencia", formData.procedencia]
    ];
  
    autoTable(doc, {
      startY: yPosition,
      body: personalData,
      theme: "striped",
      margin: { top: 1, bottom: 10 },
      styles: { cellPadding: 2, fontSize: 10 },
      didDrawPage: function (data) {
        yPosition = data.cursor.y + 10;
      }
    });
  
    // Motivo de Consulta y Antecedentes
    addTextToPDF("Motivo de la Consulta y Antecedentes:", true);
    const consultationData = [
      ["Motivo de la consulta", formData.motivoConsulta],
      ["Antecedentes", formData.antecedentes],
      ["Desarrollo Psicomotriz", formData.desarrolloPsicomotriz],
      ["¿Usa Rx?", formData.usaRx],
      ["RX en uso", formData.rxUso],
      ["OD", formData.odUso],
      ["OI", formData.oiUso],
      ["Última fecha de control", formData.ultimaFechaControl],
      ["Cirugías oculares", formData.cirugiasOculares],
      ["Otros", formData.otros],
      ["Antecedentes familiares", formData.antecedentesFamiliares]
    ];
  
    autoTable(doc, {
      startY: yPosition,
      body: consultationData,
      theme: "striped",
      margin: { top: 1, bottom: 10 },
      styles: { cellPadding: 2, fontSize: 10 },
      didDrawPage: function (data) {
        yPosition = data.cursor.y + 10;
      }
    });
  
    // Diagnóstico y Tratamiento
    addTextToPDF("Diagnóstico y Tratamiento:", true);
    const treatmentData = [
      ["Diagnóstico 1", formData.diagnostico1],
      ["CIE 10 (1)", formData.cie1],
      ["Diagnóstico 2", formData.diagnostico2],
      ["CIE 10 (2)", formData.cie2],
      ["Observaciones", formData.observaciones],
      ["Plan de trabajo", formData.planTrabajo],
      ["Tratamiento", formData.tratamiento],
      ["Recomendaciones", formData.recomendaciones]
    ];
  
    autoTable(doc, {
      startY: yPosition,
      body: treatmentData,
      theme: "striped",
      margin: { top: 1, bottom: 10 },
      styles: { cellPadding: 2, fontSize: 10 },
      didDrawPage: function (data) {
        yPosition = data.cursor.y + 10;
      }
    });
  
    // Convertir PDF en Blob
    const pdfOutput = doc.output("blob");
    const timestamp = Date.now();
    const nombreArchivo = `${numeroDocumentoSeleccionado}_${timestamp}.pdf`;
  
    const archivoPDF = new File([pdfOutput], nombreArchivo, { type: "application/pdf" });
  
    const formDataPDF = new FormData();
    formDataPDF.append("archivoPDF", archivoPDF);
    formDataPDF.append("numeroDocumento", numeroDocumentoSeleccionado);
  
    // Subir PDF
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
                  onClick={() => abrirHistorialModal(cliente.numeroDocumento)} 
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
            {["numeroHistoria", "telefono", "fecha", "filiacion", "nombres", "edad", "ocupacion", "sexo", "procedencia", "motivoConsulta", "antecedentes", "desarrolloPsicomotriz", "usaRx", "rxUso", "odUso", "oiUso", "ultimaFechaControl", "cirugiasOculares", "otros", "antecedentesFamiliares"].map(field => (
              <Form.Group key={field} className="mb-3">
                <Form.Label>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Form.Label>
                <Form.Control
                  type="text"
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}

            <h5>Diagnóstico y Tratamiento</h5>
            {["diagnostico1", "cie1", "diagnostico2", "cie2", "observaciones", "planTrabajo", "tratamiento", "recomendaciones"].map(field => (
              <Form.Group key={field} className="mb-3">
                <Form.Label>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Form.Label>
                <Form.Control
                  type="text"
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}
          </div>

          <button onClick={guardarPDF} className="btn1">Guardar</button>

          <h5 className="mt-4">Historiales Existentes</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Descripción</th>
                  <th scope="col">Acciones</th> {/* Columna para las acciones */}
                </tr>
              </thead>
              <tbody>
                {historialClinico.map((item, i) => (
                  <tr key={i}>
                    <td>{item.descripcion}</td>
                    <td>
                      {/* Botón para ver el PDF */}
                      <a
                        href={`http://localhost:3001/uploads/${item.archivoPDF}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn1 text-decoration-none" 
                      >
                        Ver PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


        </Modal.Body>

        <Modal.Footer>
          <button onClick={() => setShowHistorialModal(false)} className="btn2">Cerrar</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CrudClientes;
