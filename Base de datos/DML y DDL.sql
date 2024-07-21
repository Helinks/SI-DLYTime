CREATE DATABASE DLYtime;
USE DLYtime;

CREATE TABLE Horario (
    idHorarios INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL
);

CREATE TABLE estadoCitas (
    idEstadoCita INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL 
);

CREATE TABLE tipoConsulta (
    idTipoConsulta INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL
);

CREATE TABLE rol (
    idRol INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL
);

CREATE TABLE genero (
    idGenero INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL
);

CREATE TABLE historialClinico (
    idHistorialClinico INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL
);

CREATE TABLE diagnostico (
    idDiagnostico INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descripcion VARBINARY(100), 
    idHistorialClinico INT NOT NULL,
    FOREIGN KEY (idHistorialClinico) REFERENCES historialClinico(idHistorialClinico)
);

CREATE TABLE cita (
    idCita INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL,
    idHorarios INT NOT NULL,
    FOREIGN KEY (idHorarios) REFERENCES Horario(idHorarios)
);

CREATE TABLE tipoIdentificacion(
    idTipoIdentificacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(45)
);

CREATE TABLE empleado(
    noDocumentoEmpleado INT NOT NULL,
    nombre VARCHAR(60),
    apellido VARCHAR(80),
    telefono VARCHAR(15),
    correo VARCHAR(150),
    clave VARCHAR(50),
    idRol INT NOT NULL,
    idGenero INT NOT NULL,
    idTipoIdentificacion INT NOT NULL,
    PRIMARY KEY (noDocumentoEmpleado),
    FOREIGN KEY (idRol) REFERENCES rol(idRol),
    FOREIGN KEY (idGenero) REFERENCES genero(idGenero),
    FOREIGN KEY (idTipoIdentificacion) REFERENCES tipoIdentificacion(idTipoIdentificacion)
);

CREATE TABLE cliente(
    noDocumentoCliente INT NOT NULL,
    nombre VARCHAR(60),
    apellido VARCHAR(80),
    telefono VARCHAR(15),
    direccion VARCHAR(60),
    fechanacimiento DATE,
    correo VARCHAR(150),
    clave VARCHAR(50),
    idGenero INT NOT NULL,
    idTipoIdentificacion INT NOT NULL,
    PRIMARY KEY (noDocumentoCliente),
    FOREIGN KEY (idGenero) REFERENCES genero(idGenero),
    FOREIGN KEY (idTipoIdentificacion) REFERENCES tipoIdentificacion(idTipoIdentificacion)
);

CREATE TABLE detalleCita (
    local VARCHAR(60) NOT NULL,
    idDiagnostico INT NOT NULL,
    idCita INT NOT NULL,
    idTipoConsulta INT NOT NULL,
    idEstadoCita INT NOT NULL,
    noDocumentoEmpleado INT NOT NULL,
    noDocumentoCliente INT NOT NULL,
    PRIMARY KEY (noDocumentoEmpleado, idCita),
    FOREIGN KEY (idDiagnostico) REFERENCES diagnostico(idDiagnostico),
    FOREIGN KEY (idCita) REFERENCES cita(idCita),
    FOREIGN KEY (idTipoConsulta) REFERENCES tipoConsulta(idTipoConsulta),
    FOREIGN KEY (idEstadoCita) REFERENCES estadoCitas(idEstadoCita),
    FOREIGN KEY (noDocumentoEmpleado) REFERENCES empleado(noDocumentoEmpleado),
    FOREIGN KEY (noDocumentoCliente) REFERENCES cliente(noDocumentoCliente)
);




INSERT INTO rol(idRol, nombre) VALUES 
(1, "admin"),
(2, "oftalmologo");


INSERT INTO estadoCitas(idEstadoCita, nombre) VALUES 
(1, "pendiente"),
(2, "terminada"),
(3, "cancelada");


INSERT INTO historialClinico(idHistorialClinico, descripcion) VALUES 
(1031807020, "historialClinico1.PDF"),
(1032806020, "historialClinico2.PDF"),
(538291415, "historialClinico3.PDF"),
(2084653768, "historialClinico4.PDF"),
(917285632, "historialClinico5.PDF"),
(362918487, "historialClinico6.PDF"),
(485179249, "historialClinico7.PDF"),
(629187543, "historialClinico8.PDF"),
(1375928410, "historialClinico9.PDF"),
(845692718, "historialClinico10.PDF"),
(11, "ninguno");


INSERT INTO tipoIdentificacion(idTipoIdentificacion, nombre) VALUES 
(1, "Cedula de Ciudadania"),
(2, "Tarjeta de Identidad"),
(3, "Cedula de Extranjeria");


INSERT INTO genero(idGenero, nombre) VALUES 
(1, "Hombre"),
(2, "Mujer"),
(3, "Otro");


INSERT INTO Horario (idHorarios, fecha, hora) VALUES 
(1, "2024-07-24", "09:00:00"),
(2, "2024-07-24", "10:00:00"),
(3, "2024-07-24", "11:00:00"),
(4, "2024-07-24", "12:00:00"),
(5, "2024-07-24", "13:00:00"),
(6, "2024-07-24", "14:00:00"),
(7, "2024-07-24", "15:00:00"),
(8, "2024-07-24", "16:00:00"),
(9, "2024-07-24", "17:00:00"),
(10, "2024-07-24", "18:00:00");


INSERT INTO cita(idCita, descripcion, idHorarios) VALUES 
(1, "El paciente se presento para control de sus lentes", 1),
(2, "El cliente requirio de servicio de asesoría para escoger los marcos que mejor sean de su estilo", 2),
(3, "El paciente manifiesta un vista borrosa", 3),
(4, "El paciente desea obtener sus nuevos marcos", 4),
(5, "El paciente manifiesta un dolor leve en el ojo", 5),
(6, "El paciente quiere una asesoria", 6),
(7, "El paciente quiere obtener sus nuevos lentes", 7),
(8, "El paciente quiere una asesoria", 8),
(9, "El paciente se presento para control de sus lentes", 9),
(10, "El paciente se presento para control de sus lentes", 10);


INSERT INTO tipoConsulta(idTipoConsulta, nombre) VALUES 
(1, "Asesoria personalizada"),
(2, "Jornada de salud visual"),
(3, "Lentes y monturas");


INSERT INTO diagnostico(idDiagnostico, descripcion, idHistorialClinico) VALUES 
(1, "diagnostico1.pdf", 1031807020),
(2, "diagnostico2.pdf", 1032806020),
(3, "diagnostico3.pdf", 538291415),
(4, "diagnostico4.pdf", 2084653768),
(5, "diagnostico5.pdf", 917285632),
(6, "diagnostico6.pdf", 362918487),
(7, "diagnostico7.pdf", 485179249),
(8, "ninguno", 11);


INSERT INTO cliente(noDocumentoCliente, nombre, apellido, telefono, direccion, fechanacimiento, correo, clave, idGenero, idTipoIdentificacion) VALUES
(1031807020, "Kevin", "Aroca", "3024953516", "Calle 45 # 34-78", "2006-05-05","….@gmail.com", "********", 1, 1),
(1032806020, "Samuel", "Prieto", "3186690384", "Avenida Calle 127 # 15-40", "2006-05-05","….@gmail.com", "********", 1, 1),
(538291415, "Alberto", "Alberto", "5483197265", "Calle 72 # 15-33", "2006-05-05","….@gmail.com", "********", 1, 3),
(2084653768, "William", "Peña", "6328401579", "Carrera 14 # 58-29", "2006-05-05","….@gmail.com", "********", 1, 1),
(917285632, "Valentina", "Rodriguez", "4159726831", "Avenida Carrera 30 # 45-67", "2006-05-05","….@gmail.com", "********", 2, 1),
(362918487, "Jhon", "Cruz", "7695213486", "Calle 100 # 17-54", "2006-05-05","….@gmail.com", "********", 1, 1),
(485179249, "Brian", "Sanchez", "2834769150", "Avenida Calle 80 # 65-21", "2006-05-05","….@gmail.com", "********", 1, 3),
(629187543, "Pedro", "Torres", "6973145820", "Carrera 7 # 22-15", "2006-05-05","….@gmail.com", "********", 1, 1),
(1375928410, "Natalia", "Pinto", "8345962170", "Calle 63 # 10-43", "2006-05-05","….@gmail.com", "********", 2, 1),
(845692718, "Luisa", "Beltran", "1594278630", "Avenida Carrera 68 # 95-12", "2006-05-05","….@gmail.com", "********", 2, 1);


INSERT INTO empleado(noDocumentoEmpleado, nombre, apellido, telefono, correo, clave, idRol, idGenero, idTipoIdentificacion) VALUES
(254548754, "Jose", "Hernandez", "311144578", "….@gmail.com", "*********", 1, 1, 1),
(365337878, "David", "Beltran", "3154935783", "….@gmail.com", "*********", 2, 1, 1),
(365478965, "Maria", "Martinez", "3009876543", "….@gmail.com", "*********", 2, 2, 1),
(745896321, "Carlos", "Lopez", "3108765432", "….@gmail.com", "*********", 1, 1, 1);


INSERT INTO detalleCita(local, idDiagnostico, idCita, idTipoConsulta, idEstadoCita, noDocumentoEmpleado, noDocumentoCliente) VALUES
("Kennedy", 8, 3, 2, 1, 254548754, 1031807020),
("Kennedy", 2, 2, 1, 1, 254548754, 1032806020),
("Kennedy", 7, 3, 2, 1, 745896321, 845692718),
("Kennedy", 3, 4, 3, 1, 365337878, 538291415),
("Kennedy", 4, 5, 2, 1, 365478965, 2084653768),
("Kennedy", 5, 6, 1, 1, 365337878, 917285632),
("Kennedy", 8, 7, 3, 1, 365478965, 362918487),
("Kennedy", 5, 8, 1, 1, 365478965, 485179249),
("Kennedy", 8, 9, 2, 1, 365337878, 629187543),
("Kennedy", 6, 10, 2, 1, 365478965, 1375928410);



