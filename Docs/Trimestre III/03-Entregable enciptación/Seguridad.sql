create role desarollador ;
create role usuario;

GRANT ALL PRIVILEGES ON dlytime.  TO 'desarollador';
grant select,update on dlytime. to usuario;

CREATE USER 'joan'@'localhost' IDENTIFIED BY '123';
CREATE USER kevin@localhost IDENTIFIED BY kevin;

GRANT 'desarollador' TO 'joan'@'localhost';
grant usuario to kevin@localhost;

/*REPAIR TABLE mysql.db;*/

/*Encriptación -----------*/

INSERT INTO persona (numeroDocumento, idRol, idTipoIdentificacion, primerNombre, segundoNombre, primerApellido, segundoApellido, idGenero, correo, telefono, clave, fechaNacimiento, direccion) VALUES
(12345678, 1, 1, 'Juan', 'Carlos', 'Rodriguez', 'Perez', 1, 'juan.rodriguez@example.com', '3001234567', AES_ENCRYPT('contrasena123', 'MiClaveSecreta'), '1985-06-15', 'Calle 123 #45-67'),
(61452345, 2, 1, 'Maria', NULL, 'Gomez', 'Lopez', 2, 'maria.gomez@example.com', '3107654321', AES_ENCRYPT('contrasena321', 'MiClaveSecreta'), '1990-11-25', 'Carrera 45 #12-34');