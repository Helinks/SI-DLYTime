use dlytime;

/* 1) Listar todas las citas de un cliente específico, junto con el nombre del oftalmólogo asignado:*/

SELECT c.idCita, 
       pCliente.primerNombre AS nombre_cliente, 
       pOftalmologo.primerNombre AS nombre_oftalmologo, 
       c.descripcion
FROM cita c
JOIN cliente cl ON c.clienteNumeroDocumento = cl.numeroDocumento
JOIN persona pCliente ON cl.numeroDocumento = pCliente.numeroDocumento
JOIN oftalmologo o ON c.oftalmologoNumeroDocumento = o.numeroDocumento
JOIN persona pOftalmologo ON o.numeroDocumento = pOftalmologo.numeroDocumento
WHERE pCliente.numeroDocumento = 12345678;

/* 2) Obtener todas las citas programadas para un oftalmólogo específico:*/
SELECT c.idCita, p.primerNombre AS nombre_cliente, c.descripcion, h.fecha, h.hora
FROM cita c
JOIN cliente cl ON c.clienteNumeroDocumento = cl.numeroDocumento
JOIN persona p ON cl.numeroDocumento = p.numeroDocumento
JOIN Horario h ON c.idCita = h.idHorarios
WHERE c.oftalmologoNumeroDocumento = 61452345;

/* 3) Mostrar todas las citas realizadas junto con el estado de la cita y el diagnóstico:*/
SELECT c.idCita, p.primerNombre, d.descripcion AS diagnostico, e.nombre AS estado_cita
FROM cita c
JOIN detalleCita dc ON c.idCita = dc.idCita
JOIN diagnostico d ON dc.idDiagnostico = d.idDiagnostico
JOIN estadosCita e ON dc.idEstadoCita = e.idEstadocita
JOIN persona p ON c.clienteNumeroDocumento = p.numeroDocumento
WHERE e.nombre = 'Realizada';

/* 4) Listar todos los clientes que han solicitado un tipo específico de consulta (e.g., "Gafas y Monturas"):*/

SELECT p.primerNombre, p.primerApellido, tc.nombre AS tipo_consulta
FROM detalleCita dc
JOIN tipoConsulta tc ON dc.idTipoConsulta = tc.idtipoConsulta
JOIN cita c ON dc.idCita = c.idCita
JOIN persona p ON c.clienteNumeroDocumento = p.numeroDocumento
WHERE tc.nombre = 'Gafas y Monturas';

/* 5) Listar todas las citas pendientes con sus horarios y dirección:*/

SELECT p.primerNombre AS cliente, h.fecha, h.hora, dc.direccion
FROM detalleCita dc
JOIN cita c ON dc.idCita = c.idCita
JOIN persona p ON c.clienteNumeroDocumento = p.numeroDocumento
JOIN Horario h ON dc.idHorarios = h.idHorarios
JOIN estadosCita e ON dc.idEstadoCita = e.idEstadocita
WHERE e.nombre = 'Pendiente';

/* 6) Obtener el historial clínico de un cliente junto con su información personal:*/

SELECT p.primerNombre, p.primerApellido, h.numeroDocumento, d.descripcion AS diagnostico
FROM historialClinico h
JOIN persona p ON h.numeroDocumento = p.numeroDocumento
JOIN diagnostico d ON h.numeroDocumento = d.numeroDocumento
WHERE p.numeroDocumento = 12345678;

/* 7) Listar todos los empleados y sus respectivos roles:*/
SELECT p.primerNombre, p.primerApellido, re.nombre AS rol
FROM empleado e
JOIN Empleado_has_rolEmpleado er ON e.numeroDocumento = er.numeroDocumento
JOIN rolEmpleado re ON er.idRol = re.idRol
JOIN persona p ON e.numeroDocumento = p.numeroDocumento;

/* 8) Obtener todas las citas asignadas a un oftalmólogo en una fecha específica:*/

SELECT p.primerNombre AS cliente, h.fecha, h.hora
FROM cita c
JOIN detalleCita dc ON c.idCita = dc.idCita
JOIN Horario h ON dc.idHorarios = h.idHorarios
JOIN persona p ON c.clienteNumeroDocumento = p.numeroDocumento
WHERE c.oftalmologoNumeroDocumento = 61452345 AND h.fecha = '2024-09-21';

/* 9) Obtener los clientes con más de 3 citas agendadas:*/

SELECT p.primerNombre, p.primerApellido, COUNT(c.idCita) AS numero_citas
FROM cita c
JOIN persona p ON c.clienteNumeroDocumento = p.numeroDocumento
GROUP BY p.numeroDocumento
HAVING COUNT(c.idCita) > 3;

/* 10) Mostrar todos los problemas reportados por un cliente y el tipo de problema:*/

SELECT p.primerNombre, p.primerApellido, tp.descripcion AS tipo_problema, s.descripcionProblema
FROM soporte s
JOIN tipoProblema tp ON s.idTipoProblema = tp.idTipoProblema
JOIN cliente c ON s.numeroDocumento = c.numeroDocumento
JOIN persona p ON c.numeroDocumento = p.numeroDocumento
WHERE p.numeroDocumento = 12345678;

-- Consultas aninadas
/* 1) Obtener el número total de citas realizadas por cada oftalmólogo:*/

SELECT p.primerNombre, p.primerApellido, (SELECT COUNT(c.idCita) FROM cita c WHERE c.oftalmologoNumeroDocumento = o.numeroDocumento) AS total_citas
FROM persona p
JOIN oftalmologo o ON p.numeroDocumento = o.numeroDocumento;

/* 2) Obtener el nombre del cliente que más citas ha realizado: */

SELECT p.primerNombre, p.primerApellido
FROM persona p
WHERE p.numeroDocumento = (SELECT c.clienteNumeroDocumento FROM cita c GROUP BY c.clienteNumeroDocumento ORDER BY COUNT(c.idCita) DESC LIMIT 1);

/* 3) Listar todas las citas que están pendientes y fueron agendadas por clientes con más de 2 citas:*/
SELECT c.idCita, p.primerNombre, e.nombre AS estado_cita
FROM cita c
JOIN persona p ON c.clienteNumeroDocumento = p.numeroDocumento
JOIN detalleCita dc ON c.idCita = dc.idCita
JOIN estadosCita e ON dc.idEstadoCita = e.idEstadocita
WHERE e.nombre = 'Pendiente' AND c.clienteNumeroDocumento IN 
(SELECT clienteNumeroDocumento FROM cita GROUP BY clienteNumeroDocumento HAVING COUNT(idCita) > 2);

/* 4) Mostrar la dirección de la última cita agendada para un cliente específico:*/
SELECT dc.direccion
FROM detalleCita dc
WHERE dc.idCita = (SELECT MAX(c.idCita) FROM cita c WHERE c.clienteNumeroDocumento = 12345678);

/* 5) Obtener el promedio de citas realizadas por cliente:*/

SELECT AVG(citas_por_cliente) AS promedio_citas
FROM (SELECT COUNT(c.idCita) AS citas_por_cliente FROM cita c GROUP BY c.clienteNumeroDocumento) AS subquery;

/* 6) Listar todos los empleados que no tienen asignado ningún rol:*/

SELECT p.primerNombre, p.primerApellido
FROM persona p
WHERE p.numeroDocumento IN 
(SELECT e.numeroDocumento FROM empleado e WHERE NOT EXISTS (SELECT * FROM Empleado_has_rolEmpleado er WHERE er.numeroDocumento = e.numeroDocumento));

/* 7) Mostrar el nombre del cliente con la cita más reciente:*/

SELECT p.primerNombre, p.primerApellido
FROM persona p
JOIN cliente cl ON p.numeroDocumento = cl.numeroDocumento
WHERE p.numeroDocumento = (SELECT c.clienteNumeroDocumento FROM cita c ORDER BY c.idCita DESC LIMIT 1);

/* 8)  Obtener los empleados que tienen más de un rol asignado:*/

SELECT p.primerNombre, p.primerApellido
FROM persona p
JOIN empleado e ON p.numeroDocumento = e.numeroDocumento
WHERE (SELECT COUNT(*) FROM Empleado_has_rolEmpleado er WHERE er.numeroDocumento = e.numeroDocumento) > 1;
/* 9) Listar las citas con un diagnóstico específico y su estado:*/
SELECT p.primerNombre, p.primerApellido, e.nombre AS estado_cita
FROM persona p
JOIN cita c ON p.numeroDocumento = c.clienteNumeroDocumento
JOIN detalleCita dc ON c.idCita = dc.idCita
JOIN estadosCita e ON dc.idEstadoCita = e.idEstadocita
WHERE dc.idDiagnostico = (SELECT d.idDiagnostico FROM diagnostico d WHERE d.descripcion LIKE '%miopía%');

/* 10) Obtener el número total de citas canceladas:*/

SELECT COUNT(c.idCita) AS total_canceladas
FROM cita c
JOIN detalleCita dc ON c.idCita = dc.idCita
WHERE dc.idEstadoCita = (SELECT e.idEstadocita FROM estadosCita e WHERE e.nombre = 'Cancelada');

/* 11) Mostrar las citas que han sido asignadas a oftalmólogos que han gestionado más de 2 citas.*/
SELECT * 
FROM cita 
WHERE oftalmologoNumeroDocumento IN (
    SELECT oftalmologoNumeroDocumento 
    FROM cita 
    GROUP BY oftalmologoNumeroDocumento 
    HAVING COUNT(*) > 2
);