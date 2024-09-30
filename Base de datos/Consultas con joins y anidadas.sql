/*Consultas con INNER JOIN*/

/*Buscar el cliente con su primera cita programada pendiente*/
select p.primerNombre, p.primerApellido, c.idCita, c.idCita, es.nombre AS Estado_Cita
FROM persona p
INNER JOIN cliente ON p.numeroDocumento = cliente.numeroDocumento AND p.idTipoIdentificacion = cliente.idTipoIdentificacion
INNER JOIN cita c ON c.clienteNumeroDocumento = cliente.numeroDocumento
INNER JOIN detallecita ON detallecita.idCita = c.idCita
INNER JOIN estadoscita es ON detallecita.idEstadoCita = es.idEstadocita 
where es.idEstadocita = "1" AND c.clienteNumeroDocumento = "12345678" limit 1;

/*Obtener todos los diagnósticos de un cliente específico*/
select p.primerNombre, p.primerApellido, d.idDiagnostico AS Diagnostico, d.descripcion
FROM persona p
INNER JOIN diagnostico d ON p.numeroDocumento = d.numeroDocumento AND p.idTipoIdentificacion = d.tipoDocumento where d.numeroDocumento like "98742135";

/*Listar todos los empleados y su rol correspondiente*/
SELECT p.primerNombre, p.primerApellido, r.nombre AS rol
FROM empleado e
INNER JOIN persona p ON e.numeroDocumento = p.numeroDocumento AND e.idTipoIdentificacion = p.idTipoIdentificacion
INNER JOIN Empleado_has_rolEmpleado er ON e.numeroDocumento = er.numeroDocumento AND e.idTipoIdentificacion = er.idTipoIdentificacion
INNER JOIN rolEmpleado r ON er.idRol = r.idRol
ORDER BY p.primerNombre;

/*Buscar todos los problemas de soporte para un cliente específico*/
SELECT s.descripcionProblema, tp.descripcion AS Tipo_Problema
FROM soporte s
INNER JOIN tipoProblema tp ON s.idTipoProblema = tp.idTipoProblema
INNER JOIN cliente c ON s.numeroDocumento = c.numeroDocumento
WHERE c.numeroDocumento = 98512478
ORDER BY s.idSoporte;

/*Obtener la cantidad de citas pendientes por oftalmólogo:*/
SELECT o.numeroDocumento, COUNT(ci.idCita) AS cantidadPendientes, ec.nombre AS Estado_citas
FROM oftalmologo o
INNER JOIN cita ci ON o.numeroDocumento = ci.oftalmologoNumeroDocumento
INNER JOIN detallecita dc ON ci.idCita = dc.idCita
INNER JOIN estadosCita ec ON dc.idEstadoCita = ec.idEstadocita
WHERE ec.nombre = 'Pendiente'
GROUP BY o.numeroDocumento
ORDER BY cantidadPendientes DESC;

/*Consultas anidadas*/

/*Obtener el oftalmólogo que ha atendido la mayor cantidad de citas*/
SELECT o.numeroDocumento, p.primerNombre, p.primerApellido
FROM oftalmologo o
INNER JOIN persona p ON o.numeroDocumento = p.numeroDocumento
WHERE o.numeroDocumento = (
        SELECT c.oftalmologoNumeroDocumento
        FROM cita c
        GROUP BY c.oftalmologoNumeroDocumento
        ORDER BY COUNT(c.idCita) DESC
        LIMIT 1
		);


/*Obtener el oftalmólogo que ha atendido la mayor cantidad de citas, junto con sus detalles, 
filtrado por el nombre del oftalmólogo que contenga "Carlos" en su nombre.*/
SELECT p.primerNombre, p.primerApellido, o.numeroDocumento, COUNT(c.idCita) AS totalCitas
FROM oftalmologo o
INNER JOIN persona p ON o.numeroDocumento = p.numeroDocumento
INNER JOIN cita c ON o.numeroDocumento = c.oftalmologoNumeroDocumento
WHERE p.primerNombre LIKE '%Carlos%' AND p.idRol = 2
GROUP BY o.numeroDocumento
ORDER BY totalCitas DESC;

/*Obtener el cliente que ha registrado más problemas de soporte relacionados con "historial clínico"*/
SELECT p.primerNombre, p.primerApellido, s.numeroDocumento, COUNT(s.idSoporte) AS totalSoportes, s.descripcionProblema
FROM soporte s
INNER JOIN persona p ON s.numeroDocumento = p.numeroDocumento
WHERE s.idTipoProblema = (
        SELECT idTipoProblema 
        FROM tipoProblema 
        WHERE descripcion LIKE '%historial clínico%'
		)
GROUP BY s.numeroDocumento
ORDER BY totalSoportes DESC;

/*Obtener las descripciones de diagnósticos realizados para clientes que hayan tenido 
una cita programada con fecha posterior a '2024-09-22'*/
SELECT descripcion
FROM diagnostico
WHERE numeroDocumento IN (
    SELECT clienteNumeroDocumento 
    FROM cita 
    WHERE idCita IN (
        SELECT idCita 
        FROM detalleCita 
        WHERE idHorarios IN (
            SELECT idHorarios 
            FROM Horario 
            WHERE fecha > '2024-09-22'
        )
    )
)
ORDER BY idDiagnostico;

/*Obtener los clientes que tienen más de 1 cita programada, mostrando su número de documento 
y cantidad de citas, y ordenado por el número de citas*/
SELECT clienteNumeroDocumento, COUNT(idCita) AS totalCitas
FROM cita
WHERE clienteNumeroDocumento IN (
    SELECT numeroDocumento 
    FROM cliente
)
GROUP BY clienteNumeroDocumento
HAVING COUNT(idCita) > 1
ORDER BY totalCitas DESC;