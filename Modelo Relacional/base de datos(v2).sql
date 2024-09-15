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
    telefono VARCHAR(15) NOT NULL,
    clave VARCHAR(30) NOT NULL,
    fechaNacimiento DATE NOT NULL,
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
    nombre VARCHAR(10) NOT NULL,
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
    idDiagnostico INT NOT NULL,
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
