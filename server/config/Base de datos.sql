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

CREATE TABLE estadoPersona(
    idEstado INT NOT NULL,
    nombre VARCHAR(10) NOT NULL,
    PRIMARY KEY (idEstado)
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
    idEstadoPersona INT not null,
    reset_code VARCHAR(6),
    reset_expires DATETIME,
    block_account DATETIME,
    PRIMARY KEY (numeroDocumento),
    FOREIGN KEY (idTipoIdentificacion) REFERENCES tipoIdentificacion(idTipoIdentificacion),
    FOREIGN KEY (idGenero) REFERENCES genero(idGenero),
    FOREIGN KEY (idRol) REFERENCES Rol(idRol),
    FOREIGN KEY (idEstadoPersona) REFERENCES estadoPersona(idEstado)
    
);

CREATE TABLE clientes_historial (
  idHistorial INT AUTO_INCREMENT PRIMARY KEY,
  numeroDocumento INT,  -- Asegúrate de que sea INT si en persona es INT
  descripcion TEXT,
  archivoPDF VARCHAR(255),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (numeroDocumento) REFERENCES persona(numeroDocumento) ON DELETE CASCADE
) ENGINE=InnoDB;

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

CREATE TABLE estadoHorario (
    idEstadoHorario INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY (idEstadoHorario)
);

CREATE TABLE Horario (
    idHorarios INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estadoHorario INT NOT NULL, 
    
    PRIMARY KEY (idHorarios),
    CONSTRAINT horario_fk FOREIGN KEY (estadoHorario) REFERENCES estadoHorario(idEstadoHorario)
);

CREATE TABLE tipoConsulta (
    idtipoConsulta INT NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    PRIMARY KEY (idtipoConsulta)
);

CREATE TABLE diagnostico (
    idDiagnostico INT NOT NULL AUTO_INCREMENT,
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

INSERT INTO estadoPersona (idEstado, nombre) VALUE 
(1, 'Activo'),
(2, 'Inactivo'),
(3, 'Bloqueado');

-- Insertar datos en Rol
INSERT INTO Rol (idRol, nombre) VALUES
(1, 'Usuario'),
(2, 'Empleado'),
(3, 'Administrador');

-- Insertar datos en persona
INSERT INTO persona (numeroDocumento, idRol, idTipoIdentificacion, Nombres, Apellidos, idGenero, correo, telefono, clave, fechaNacimiento, direccion,idEstadoPersona) VALUES
(123456789, 1, 1, 'Juan', 'Pérez', 1, 'foxaga4008@shouxs.com', '555-1234', '$2a$10$KfdeehHgDW4uSxItDtf4JehQGxYt9h/676.R3ii8dGIohU2WTWmV.', '1990-01-01', 'Calle 1', 1),
(987654321, 2, 1, 'María', 'Gómez', 2, 'sidigi1129@shouxs.com', '555-5678', '$2a$10$pTvGp2MVMT0w03HHWIFA1.z/twteCfqu5nUjuS0k6P/hTKy1CQnQq', '1985-05-05', 'Calle 2', 1),
(987653231, 2, 2, 'Natalia', 'Bautista', 2, 'kodebe7783@prorsd.com', '53123-5678', '$2a$10$EP3RQaSq9qIVFBBUjs8uI.Af.UYw0RkD/B3oDm9OLS5Wq36Ifk2Vu', '1985-06-06', 'Calle 3', 1),
(1013110701, 3, 1, 'Sebastian', 'Rodríguez', 1, 'sebitasrodriguez286@gmail.com', '', '$2a$10$egKYynqOpic9RyaOoQft8..N8S8ibk4OASdYri9RhjdIq/PJiMe1O', '1985-06-06', 'Calle 3', 1);

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

-- Insertar datos en estadoHorario
INSERT INTO estadoHorario (idEstadoHorario,nombre) VALUES
(1,'Disponible'),
(2,'No disponible');

-- Insertar datos en Horario
INSERT INTO Horario (idHorarios, fecha, hora,estadoHorario) VALUES
(1, '2024-10-25', '09:00:00', 1),
(2, '2024-10-25', '10:00:00', 1);

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

SET GLOBAL event_scheduler = ON;
SHOW EVENTS FROM dlytime;
DROP EVENT IF EXISTS InsertarHorariosEvento;


DELIMITER //

CREATE PROCEDURE InsertarHorariosTresSemanas()
BEGIN 
    DECLARE fechaObjetivo DATE;
    DECLARE idHorario INT;

    -- Definir la fecha objetivo (21 días después de hoy)
    SET fechaObjetivo = CURDATE() + INTERVAL 21 DAY;
    
    -- Obtener el último ID en la tabla Horario
    SELECT COALESCE(MAX(idHorarios), 0) INTO idHorario FROM Horario;

    -- Solo insertará si no existen horarios para esa fecha
    IF NOT EXISTS (SELECT 1 FROM Horario WHERE fecha = fechaObjetivo) THEN 
        INSERT INTO Horario (idHorarios, fecha, hora, estadoHorario)
        SELECT 
            (idHorario + ROW_NUMBER() OVER(ORDER BY hora)) AS idHorarios,
            fechaObjetivo,
            t.hora,
            1  -- Estado "Disponible"
        FROM (
            SELECT '10:00:00' AS hora UNION ALL
            SELECT '10:30:00' UNION ALL
            SELECT '11:00:00' UNION ALL
            SELECT '11:30:00' UNION ALL
            SELECT '12:00:00' UNION ALL
            SELECT '12:30:00' UNION ALL
            SELECT '13:00:00' UNION ALL
            SELECT '13:30:00' UNION ALL
            SELECT '14:00:00' UNION ALL
            SELECT '14:30:00' UNION ALL
            SELECT '15:00:00' UNION ALL
            SELECT '15:30:00' UNION ALL
            SELECT '16:00:00' UNION ALL
            SELECT '16:30:00' UNION ALL
            SELECT '17:00:00' UNION ALL
            SELECT '17:30:00' UNION ALL
            SELECT '18:00:00' UNION ALL
            SELECT '18:30:00' UNION ALL
            SELECT '19:00:00' 
        ) t
	ORDER BY t.hora;
    END IF;
END //

DELIMITER ;

DELIMITER //

CREATE EVENT IF NOT EXISTS InsertarHorariosEvento
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURRENT_DATE, '00:00:00')

DO 
BEGIN 
CALL InsertarHorariosTresSemanas();
END//
DELIMITER ;

CALL InsertarHorariosTresSemanas();