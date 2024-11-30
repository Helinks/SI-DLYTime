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
    nombre VARCHAR(20) NOT NULL,
    PRIMARY KEY (idRol)
);

CREATE TABLE persona (
    numeroDocumento INT NOT NULL,
    idRol INT NOT NULL,
    idTipoIdentificacion INT NOT NULL,
    Nombres VARCHAR(30) NOT NULL,
    Apellidos VARCHAR(30) NOT NULL,
    idGenero INT NOT NULL,
    correo VARCHAR(50) NOT NULL,
    telefono VARCHAR(15),
    clave varchar (61) NOT NULL,
    fechaNacimiento DATE,
    direccion VARCHAR(40),
    estadoPersona boolean not null,
    reset_code VARCHAR(6),
    reset_expires DATETIME,
    PRIMARY KEY (numeroDocumento),
    FOREIGN KEY (idTipoIdentificacion) REFERENCES tipoIdentificacion(idTipoIdentificacion),
    FOREIGN KEY (idGenero) REFERENCES genero(idGenero),
    FOREIGN KEY (idRol) REFERENCES Rol(idRol)
    
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
FOREIGN KEY (numeroDocumento) REFERENCES persona(numeroDocumento)
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

CREATE TABLE diagnostico (
    idDiagnostico INT NOT NULL,
    descripcion VARCHAR(300) NOT NULL,
    PRIMARY KEY (idDiagnostico)
);

CREATE TABLE historialClinico (
    numeroDocumento INT NOT NULL,
    idDiagnostico int not null,
    PRIMARY KEY (numeroDocumento),
    FOREIGN KEY (numeroDocumento) REFERENCES persona(numeroDocumento),
    foreign key (idDiagnostico) references diagnostico (idDiagnostico)
);

CREATE TABLE cita (
    idCita INT NOT NULL AUTO_INCREMENT,
    NumeroDocumentoCliente INT NOT NULL,
    NumeroDocumentoOftalmologo INT NOT NULL,
   
    PRIMARY KEY (idCita),
    FOREIGN KEY (NumeroDocumentoCliente) REFERENCES persona(numeroDocumento),
    FOREIGN KEY (NumeroDocumentoOftalmologo)REFERENCES persona(numeroDocumento)
);

CREATE TABLE detalleCita (
    idCita INT NOT NULL,
    idDiagnostico INT NULL,
    idTipoConsulta INT NOT NULL,
    idHorarios INT NOT NULL,
    idEstadoCita INT NOT NULL,
    direccion VARCHAR(30),
    PRIMARY KEY (idCita),
    FOREIGN KEY (idDiagnostico) REFERENCES diagnostico(idDiagnostico),
    FOREIGN KEY (idTipoConsulta) REFERENCES tipoConsulta(idtipoConsulta),
    FOREIGN KEY (idHorarios) REFERENCES Horario(idHorarios),
    FOREIGN KEY (idEstadoCita) REFERENCES estadosCita(idEstadocita),
    FOREIGN KEY (idCita) REFERENCES cita(idCita)  -- Relación con la tabla 'cita'
);


-- Insertar datos en tipoIdentificacion
INSERT INTO tipoIdentificacion (idTipoIdentificacion, nombre) VALUES
(1, 'Cédula'),
(2, 'Pasaporte'),
(3, 'RUC');

-- Insertar datos en genero
INSERT INTO genero (idGenero, nombre) VALUES
(1, 'Masculino'),
(2, 'Femenino'),
(3, 'Otro');

-- Insertar datos en Rol
INSERT INTO Rol (idRol, nombre) VALUES
(1, 'Usuario'),
(2, 'Administrador');

-- Insertar datos en persona
INSERT INTO persona (numeroDocumento, idRol, idTipoIdentificacion, Nombres, Apellidos, idGenero, correo, telefono, clave, fechaNacimiento, direccion, estadoPersona) VALUES
(123456789, 1, 1, 'Juan', 'Pérez', 1, 'juan.perez@example.com', '555-1234', 'hashed_password1', '1990-01-01', 'Calle 1', TRUE),
(987654321, 2, 1, 'María', 'Gómez', 2, 'maria.gomez@example.com', '555-5678', 'hashed_password2', '1985-05-05', 'Calle 2', TRUE),
(987653231, 2, 2, 'Natalia', 'Bautista', 2, 'natalia.bautista@example.com', '53123-5678', 'hashed_password3', '1985-06-06', 'Calle 3', TRUE);

-- Insertar datos en tipoProblema
INSERT INTO tipoProblema (idTipoProblema, descripcion) VALUES
(1, 'Problema de software'),
(2, 'Problema de hardware');

-- Insertar datos en soporte
INSERT INTO soporte (idSoporte, idTipoProblema, numeroDocumento, descripcionProblema) VALUES
(1, 1, 123456789, 'El programa no inicia.'),
(2, 2, 987654321, 'El teclado está dañado.');

-- Insertar datos en estadosCita
INSERT INTO estadosCita (idEstadocita, nombre) VALUES
(1, 'Pendiente'),
(2, 'Confirmada'),
(3, 'Cancelada');

-- Insertar datos en Horario
INSERT INTO Horario (idHorarios, fecha, hora) VALUES
(1, '2024-10-25', '09:00:00'),
(2, '2024-10-25', '10:00:00');

-- Insertar datos en tipoConsulta
INSERT INTO tipoConsulta (idtipoConsulta, nombre) VALUES
(1, 'Consulta general'),
(2, 'Chequeo');

-- Insertar datos en diagnostico
INSERT INTO diagnostico (idDiagnostico, descripcion) VALUES
(1, 'Gripe'),
(2, 'Fiebre');

-- Insertar datos en historialClinico
INSERT INTO historialClinico (numeroDocumento, idDiagnostico) VALUES
(123456789, 1),
(987654321, 2);

-- Insertar datos en cita
INSERT INTO cita (idCita, NumeroDocumentoCliente,NumeroDocumentoOftalmologo) VALUES
(1, 123456789,987653231),
(2, 987654321,987653231);

-- Insertar datos en detalleCita
INSERT INTO detalleCita (idCita, idDiagnostico, idTipoConsulta, idHorarios, idEstadoCita, direccion) VALUES
(1, 1, 1, 1, 1, 'Calle 1'),
(2, 2, 2, 2, 2, 'Calle 2');