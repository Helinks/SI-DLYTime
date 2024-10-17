CREATE DATABASE dlytime;

USE dlytime;

CREATE TABLE tipoIdentificacion (
    idTipoIdentificacion INT NOT NULL,
    nombre VARCHAR(35) NOT NULL,
    PRIMARY KEY (idTipoIdentificacion)
);

CREATE TABLE genero (
    idGenero INT NOT NULL,
    nombre VARCHAR(10) NOT NULL,
    PRIMARY KEY (idGenero)
);

CREATE TABLE Rol (
    idRol INT NOT NULL,
    nombre VARCHAR(10) NOT NULL,
    PRIMARY KEY (idRol)
);

CREATE TABLE persona (
    numeroDocumento INT NOT NULL,
    idRol INT NOT NULL,
    idTipoIdentificacion INT NOT NULL,
    primerNombre VARCHAR(15) NOT NULL,
    segundoNombre VARCHAR(15),
    primerApellido VARCHAR(15) NOT NULL,
    segundoApellido VARCHAR(15),
    idGenero INT NOT NULL,
    correo VARCHAR(50) NOT NULL,
    telefono VARCHAR(15),
    clave varchar (61) NOT NULL,
    fechaNacimiento DATE,
    direccion VARCHAR(40),
    PRIMARY KEY (numeroDocumento, idTipoIdentificacion),
    FOREIGN KEY (idTipoIdentificacion) REFERENCES tipoIdentificacion(idTipoIdentificacion),
    FOREIGN KEY (idGenero) REFERENCES genero(idGenero),
    FOREIGN KEY (idRol) REFERENCES Rol(idRol)
);

CREATE TABLE cliente (
    numeroDocumento INT NOT NULL,
    idTipoIdentificacion INT NOT NULL,
    PRIMARY KEY (numeroDocumento, idTipoIdentificacion),
    FOREIGN KEY (numeroDocumento, idTipoIdentificacion) REFERENCES persona(numeroDocumento, idTipoIdentificacion)
);

CREATE TABLE empleado (
    numeroDocumento INT NOT NULL,
    idTipoIdentificacion INT NOT NULL,
    PRIMARY KEY (numeroDocumento, idTipoIdentificacion),
    FOREIGN KEY (numeroDocumento, idTipoIdentificacion) REFERENCES persona(numeroDocumento, idTipoIdentificacion)
);

CREATE TABLE rolEmpleado (
    idRol INT NOT NULL,
    nombre VARCHAR(15) NOT NULL,
    PRIMARY KEY (idRol)
);

CREATE TABLE Empleado_has_rolEmpleado (
    numeroDocumento INT NOT NULL,
    idTipoIdentificacion INT NOT NULL,
    idRol INT NOT NULL,
    PRIMARY KEY (numeroDocumento, idTipoIdentificacion, idRol),
    FOREIGN KEY (numeroDocumento, idTipoIdentificacion) REFERENCES empleado(numeroDocumento, idTipoIdentificacion),
    FOREIGN KEY (idRol) REFERENCES rolEmpleado(idRol)
);

CREATE TABLE oftalmologo (
    numeroDocumento INT NOT NULL,
    idTipoIdentificacion INT NOT NULL,
    PRIMARY KEY (numeroDocumento, idTipoIdentificacion),
    FOREIGN KEY (numeroDocumento, idTipoIdentificacion) REFERENCES empleado(numeroDocumento, idTipoIdentificacion)
);

CREATE TABLE administrador (
    numeroDocumento INT NOT NULL,
    idTipoIdentificacion INT NOT NULL,
    PRIMARY KEY (numeroDocumento, idTipoIdentificacion),
    FOREIGN KEY (numeroDocumento, idTipoIdentificacion) REFERENCES empleado(numeroDocumento, idTipoIdentificacion)
);

CREATE TABLE tipoProblema (
    idTipoProblema INT NOT NULL,
    descripcion VARCHAR(45) NOT NULL,
    PRIMARY KEY (idTipoProblema)
);

CREATE TABLE soporte (
    idSoporte INT NOT NULL,
    idTipoProblema INT NOT NULL,
    numeroDocumento INT NOT NULL,
    descripcionProblema VARCHAR(250) NOT NULL,
    PRIMARY KEY (idSoporte),
    FOREIGN KEY (idTipoProblema) REFERENCES tipoProblema(idTipoProblema),
    FOREIGN KEY (numeroDocumento) REFERENCES cliente(numeroDocumento)
);

CREATE TABLE cita (
    idCita INT NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR(45) NOT NULL,
    clienteNumeroDocumento INT NOT NULL,
    oftalmologoNumeroDocumento INT NOT NULL,
    PRIMARY KEY (idCita),
    FOREIGN KEY (clienteNumeroDocumento) REFERENCES cliente(numeroDocumento),
    FOREIGN KEY (oftalmologoNumeroDocumento) REFERENCES oftalmologo(numeroDocumento)
);

CREATE TABLE estadosCita (
    idEstadocita INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY (idEstadocita)
);

CREATE TABLE Horario (
    idHorarios INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    PRIMARY KEY (idHorarios)
);

CREATE TABLE tipoConsulta (
    idtipoConsulta INT NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    PRIMARY KEY (idtipoConsulta)
);

CREATE TABLE historialClinico (
    tipoDocumento INT NOT NULL,
    numeroDocumento INT NOT NULL,
    PRIMARY KEY (numeroDocumento, tipoDocumento),
    FOREIGN KEY (numeroDocumento, tipoDocumento) REFERENCES cliente(numeroDocumento, idTipoIdentificacion)
);

CREATE TABLE diagnostico (
    idDiagnostico INT NOT NULL,
    numeroDocumento INT NOT NULL,
    tipoDocumento INT NOT NULL,
    descripcion VARCHAR(300) NOT NULL,
    PRIMARY KEY (idDiagnostico),
    FOREIGN KEY (numeroDocumento, tipoDocumento) REFERENCES historialClinico(numeroDocumento, tipoDocumento)
);

CREATE TABLE detalleCita (
    idCita INT NOT NULL,
    idDiagnostico INT NULL,
    idTipoConsulta INT NOT NULL,
    idHorarios INT NOT NULL,
    idEstadoCita INT NOT NULL,
    direccion VARCHAR(30),
    PRIMARY KEY (idCita, idDiagnostico),
    FOREIGN KEY (idCita) REFERENCES cita(idCita),
    FOREIGN KEY (idDiagnostico) REFERENCES diagnostico(idDiagnostico),
    FOREIGN KEY (idTipoConsulta) REFERENCES tipoConsulta(idtipoConsulta),
    FOREIGN KEY (idHorarios) REFERENCES Horario(idHorarios),
    FOREIGN KEY (idEstadoCita) REFERENCES estadosCita(idEstadocita)
);

INSERT INTO tipoIdentificacion (idTipoIdentificacion, nombre) VALUES
(1, 'Cedula de Ciudadanía'),
(2, 'Pasaporte'),
(3, 'Cédula de Extranjería');

INSERT INTO genero (idGenero, nombre) VALUES
(1, 'Masculino'),
(2, 'Femenino'),
(3, 'Otro');

INSERT INTO Rol (idRol,nombre) VALUE 
(1,"Cliente"),
(2,"Empleado");

INSERT INTO persona (numeroDocumento, idRol, idTipoIdentificacion, primerNombre, segundoNombre, primerApellido, segundoApellido, idGenero, correo, telefono, clave, fechaNacimiento, direccion) VALUES
(12345678, 1, 1, 'Juan', 'Carlos', 'Rodriguez', 'Perez', 1, 'juan.rodriguez@example.com', '3001234567',  'MiClaveSecreta', '1985-06-15', 'Calle 123 #45-67'),
(61452345, 2, 1, 'Maria', NULL, 'Gomez', 'Lopez', 2, 'maria.gomez@example.com', '3107654321', 'MiClaveSecreta', '1990-11-25', 'Carrera 45 #12-34'),
(87841125, 1, 2, 'Pedro', 'Antonio', 'Martinez', 'Torres', 1, 'pedro.martinez@example.com', '3008765432','MiClaveSecreta', '1978-03-22', 'Avenida 56 #23-89'),
(98742135, 1, 1, 'Laura', 'Patricia', 'Lopez', 'Gomez', 2, 'laura.lopez@example.com', '3201236789',  'MiClaveSecreta', '1992-07-13', 'Calle 87 #32-21'),
(68742178, 2, 1, 'Carlos', 'Andres', 'Diaz', 'Perez', 1, 'carlos.diaz@example.com', '3009871234', 'MiClaveSecreta', '1983-11-30', 'Calle 45 #12-67'),
(98512478, 1, 2, 'Sandra', 'Milena', 'Vargas', 'Lopez', 2, 'sandra.vargas@example.com', '3102348765',  'MiClaveSecreta', '1995-09-15', 'Carrera 90 #45-32'),
(79514687, 2, 1, 'Luis', 'Miguel', 'Ramirez', 'Torres', 1, 'luis.ramirez@example.com', '3123450987', 'MiClaveSecreta', '1988-12-05', 'Avenida 60 #23-65'),
(12015687, 1, 3, 'Ana', 'Lucia', 'Fernandez', 'Rodriguez', 2, 'ana.fernandez@example.com', '3203456789','MiClaveSecreta', '1991-02-17', 'Calle 77 #43-21'),
(79214778, 1, 1, 'Diego', 'Armando', 'Gonzalez', 'Martinez', 1, 'diego.gonzalez@example.com', '3124567890', 'MiClaveSecreta', '1986-10-12', 'Carrera 50 #34-22'),
(61479875, 2, 1, 'Natalia', 'Andrea', 'Mendoza', 'Gomez', 2, 'natalia.mendoza@example.com', '3152345678',  'MiClaveSecreta', '1993-04-22', 'Avenida 35 #14-56');

INSERT INTO cliente (numeroDocumento, idTipoIdentificacion) VALUES
(12345678, 1),
(87841125, 2),
(98742135, 1),
(98512478, 2),
(12015687, 3),
(79214778, 1);

INSERT INTO empleado (numeroDocumento, idTipoIdentificacion) VALUES
(61452345, 1),
(68742178, 1),
(79514687, 1),
(61479875, 1);

INSERT INTO rolEmpleado (idRol, nombre) VALUES
(1, 'Oftalmolgo'),
(2, 'Administrador');

INSERT INTO Empleado_has_rolEmpleado (numeroDocumento, idTipoIdentificacion, idRol) VALUES
(61452345, 1,1),
(68742178, 1,1),
(79514687, 1,1),
(61479875, 1,1),
(61479875, 1,2);

INSERT INTO oftalmologo (numeroDocumento, idTipoIdentificacion) VALUES
(61452345, 1),
(68742178, 1),
(79514687, 1),
(61479875, 1);

INSERT INTO administrador (numeroDocumento, idTipoIdentificacion) VALUES
(61479875, 1);

INSERT INTO tipoProblema (idTipoProblema, descripcion) VALUES
(1, 'Problemas con la cita'),
(2, 'Problemas con el sistema'),
(3, 'Dudas sobre el diagnóstico'),
(4, 'Problemas de acceso al portal'),
(5, 'Consulta sobre historial clínico');

INSERT INTO soporte (idSoporte, idTipoProblema, numeroDocumento, descripcionProblema) VALUES
(1, 1, 12345678, 'Problema al agendar cita, la fecha seleccionada no está disponible.'),
(2, 2, 87841125, 'El sistema no permite ingresar con el usuario correcto.'),
(3, 3, 98742135, 'Dudas sobre el diagnóstico recibido durante la última consulta.'),
(4, 4, 98512478, 'Problemas de acceso al portal del paciente, no se puede iniciar sesión.'),
(5, 5, 12015687, 'Consulta sobre el historial clínico no actualizado.'),
(6, 1, 79214778, 'Problema al modificar la cita existente, la opción no está habilitada.'),
(7, 2, 12345678, 'El sistema muestra un error al intentar guardar los cambios.'),
(8, 3, 87841125, 'Necesito aclarar el diagnóstico relacionado con la última revisión ocular.'),
(9, 4, 98742135, 'No puedo acceder al portal desde mi dispositivo móvil.'),
(10, 5, 98512478, 'Requiero información actualizada sobre mi historial clínico.');

INSERT INTO cita (idCita, descripcion, clienteNumeroDocumento, oftalmologoNumeroDocumento) VALUES
(1, 'Revisión de visión', 12345678, 61452345),
(2, 'Examen de retina', 87841125, 68742178),
(3, 'Consulta por miopía', 98742135, 79514687),
(4, 'Control post-operatorio', 98512478, 61479875),
(5, 'Evaluación de lentes', 12015687, 61452345),
(6, 'Revisión de astigmatismo', 87841125, 68742178),
(7, 'Chequeo anual', 98742135, 79514687),
(8, 'Consulta para lentes de contacto', 98512478, 61479875),
(9, 'Diagnóstico de cataratas', 12345678, 61452345),
(10, 'Revisión de cirugía láser', 12015687, 68742178);

INSERT INTO estadosCita (idEstadocita, nombre) VALUES
(1, 'Pendiente'),
(2, 'Realizada'),
(3, 'Cancelada'),
(4, 'Reagendada');

INSERT INTO Horario (idHorarios, fecha, hora) VALUES
(1, '2024-09-20', '10:30:00'),
(2, '2024-09-21', '11:00:00'),
(3, '2024-09-22', '14:30:00'),
(4, '2024-09-23', '09:00:00'),
(5, '2024-09-24', '15:00:00'),
(6, '2024-09-25', '10:00:00'),
(7, '2024-09-26', '13:00:00'),
(8, '2024-09-27', '11:30:00'),
(9, '2024-09-28', '16:00:00'),
(10, '2024-09-29', '12:00:00');

INSERT INTO tipoConsulta (idtipoConsulta, nombre) VALUES
(1, 'Gafas y Monturas'),
(2, 'Asesoria Personalizada'),
(3, 'Jornada de Salud Visual');

INSERT INTO historialClinico(numeroDocumento,tipoDocumento) VALUES 
(12345678, 1),
(87841125, 2),
(98742135, 1),
(98512478, 2),
(12015687, 3),
(79214778, 1);

INSERT INTO diagnostico (idDiagnostico, numeroDocumento, tipoDocumento, descripcion) VALUES
(1, 12345678, 1, 'Diagnóstico de miopía leve. Se recomienda el uso de gafas para visión de cerca.'),
(2, 87841125, 2, 'Se realizó un examen completo con resultados normales. Sin cambios necesarios.'),
(3, 98742135, 1, 'Prescripción de lentes para corrección de astigmatismo. Revisión en 6 meses.'),
(4, 98512478, 2, 'Evaluación ocular muestra una mejora en la visión desde la última cita. Mantener tratamiento.'),
(5, 12015687, 3, 'Revisión de glaucoma, prescripción de gotas para reducir la presión ocular.'),
(6, 79214778, 1, 'Examen ocular sin hallazgos significativos. Se recomienda seguimiento anual.'),
(7, 12345678, 1, 'Se observó un leve aumento en la hipermetropía. Ajuste en receta óptica realizado.'),
(8, 87841125, 2, 'No se encontraron problemas significativos en la evaluación visual. Revisar en un año.'),
(9, 98742135, 1, 'Recomendación de lentes progresivos debido a cambios en la visión de cerca y de lejos.'),
(10, 98512478, 2, 'El diagnóstico muestra estabilidad en la visión. Continuar con el tratamiento actual.');

INSERT INTO detalleCita (idCita, idDiagnostico, idTipoConsulta, idHorarios, idEstadoCita, direccion) VALUES
(1, 1, 1, 1, 1, 'Calle 123 #45-67'),
(2, 2, 2, 2, 2, 'Carrera 45 #12-34'),
(3, 3, 3, 3, 1, 'Avenida 56 #23-89'),
(4, 4, 1, 4, 2, 'Calle 87 #32-21'),
(5, 5, 2, 5, 1, 'Calle 77 #43-21'),
(6, 6, 3, 6, 2, 'Carrera 50 #34-22'),
(7, 7, 1, 7, 1, 'Avenida 35 #14-56'),
(8, 8, 2, 8, 2, 'Calle 45 #12-67'),
(9, 9, 3, 9, 1, 'Calle 123 #45-67'),
(10, 10, 1, 10, 2, 'Carrera 90 #45-32');

select * from persona ;