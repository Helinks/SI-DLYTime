

select p.*, td.nombre AS idTipoIdentificacion, ep.nombre AS estadoPersona, g.nombre As idGenero from persona p  
        inner join tipoidentificacion td on p.idTipoIdentificacion = td.idTipoIdentificacion
        inner join estadopersona ep on  ep.idEstado = p.idEstadoPersona 
        inner join genero g on g.idGenero = p.idGenero
        where idrol = 2;

/* //////////////////////// */

SELECT
            detalleCita.idCita,
            horario.fecha,
            horario.hora,
            CONCAT(horario.fecha,' ',horario.hora) AS fechaHora,
            CONCAT(p1.nombres,' ', p1.apellidos) AS nombreCliente,
            CONCAT(p2.nombres,' ', p2.apellidos) AS nombreEmpleado,
            tipoconsulta.nombre AS tipoConsulta,
            detalleCita.direccion,
            estadosCita.nombre AS estadoCita
        FROM cita
        INNER JOIN detallecita ON detallecita.idCita = cita.idCita
        INNER JOIN horario ON horario.idHorarios = detallecita.idHorarios
        INNER JOIN persona p1 ON cita.NumeroDocumentoCliente = p1.numeroDocumento
        INNER JOIN persona p2 ON cita.NumeroDocumentoOftalmologo = p2.numeroDocumento 
        INNER JOIN tipoconsulta ON tipoconsulta.idtipoConsulta = detallecita.idTipoConsulta
        INNER JOIN estadosCita ON estadosCita.idEstadocita = detallecita.idEstadoCita
        WHERE 1=1;


/* //////////////////////// */

SELECT
    detalleCita.idCita,
    horario.fecha,
    horario.hora,
    CONCAT(horario.fecha,' ',horario.hora) AS fechaHora,
    CONCAT(p1.nombres,' ', p1.apellidos) AS nombreCliente,
    CONCAT(p2.nombres,' ', p2.apellidos) AS nombreEmpleado,
    tipoconsulta.nombre AS tipoConsulta,
    detalleCita.direccion,
    estadosCita.nombre AS estadoCita
    FROM cita
    INNER JOIN detallecita ON detallecita.idCita = cita.idCita
    INNER jOIN horario ON horario.idHorarios = detallecita.idHorarios
    INNER JOIN persona p1 ON cita.NumeroDocumentoCliente = p1.numeroDocumento
    INNER JOIN persona p2 ON cita.NumeroDocumentoOftalmologo = p2.numeroDocumento 
    INNER JOIN tipoconsulta ON tipoconsulta.idtipoConsulta = detallecita.idTipoConsulta
    INNER JOIN estadosCita ON estadosCita.idEstadocita = detallecita.idEstadoCita
    WHERE p1.numeroDocumento = ?
    ORDER BY cita.idCita DESC ;

/* //////////////////////// */

SELECT numeroDocumento, correo FROM persona WHERE numeroDocumento = ? or correo = ?;

INSERT INTO persona (numeroDocumento, idRol, idTipoIdentificacion, Nombres, Apellidos, idGenero, correo, telefono , clave, idestadoPersona) VALUES (?,?,?,?,?,?,?,?,?,?);

UPDATE persona SET idTipoIdentificacion = ?, Nombres = ?, Apellidos = ?, idGenero = ?, correo = ?, telefono = ?, idEstadoPersona = ? WHERE numeroDocumento = ?;

/* //////////////////////// */

/*Consultas con INNER JOIN*/

/*Buscar el cliente con su primera cita programada pendiente*/
select p.primerNombre, p.primerApellido, c.clienteNumeroDoc, c.idCita, es.nombre AS Estado_Cita
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

/*LEft  */

/* Contar el número de citas por cliente, incluso si algunos clientes no tienen citas asignadas */
SELECT
    p.primerNombre AS ClienteNombre,
    p.primerApellido AS ClienteApellido,
    COUNT(c.idCita) AS TotalCitas
FROM
    cliente cl
    LEFT JOIN persona p ON cl.numeroDocumento = p.numeroDocumento
    LEFT JOIN cita c ON cl.numeroDocumento = c.clienteNumeroDocumento
GROUP BY
    p.primerNombre,
    p.primerApellido;

/*Obtener la fecha más reciente de una cita por cada cliente */
SELECT
    p.primerNombre AS ClienteNombre,
    p.primerApellido AS ClienteApellido,
    MAX(h.fecha) AS UltimaFechaCita
FROM
    cliente cl
    LEFT JOIN persona p ON cl.numeroDocumento = p.numeroDocumento
    LEFT JOIN cita c ON cl.numeroDocumento = c.clienteNumeroDocumento
    LEFT JOIN detalleCita dc ON c.idCita = dc.idCita
    LEFT JOIN Horario h ON dc.idHorarios = h.idHorarios
GROUP BY
    p.primerNombre,
    p.primerApellido;


/*RIGHT*/

/*Consultar las citas donde su descripción tengan consulta*/
SELECT ct.idCita AS 'ID de Cita', pCliente.primerNombre AS 'Nombre Cliente', pOftalmologo.primerNombre AS 'Nombre Oftalmólogo', ct.descripcion AS 'Descripción de la Cita'
FROM
    cita ct
    RIGHT JOIN persona pCliente ON ct.clienteNumeroDocumento = pCliente.numeroDocumento
    RIGHT JOIN oftalmologo o ON ct.oftalmologoNumeroDocumento = o.numeroDocumento
    JOIN persona pOftalmologo ON o.numeroDocumento = pOftalmologo.numeroDocumento
WHERE
    ct.descripcion LIKE '%consulta%';

/* Se requiere obtener un reporte que incluya todas las citas programadas */
SELECT
    c.idCita AS NumeroCita,
    c.descripcion AS Descripcion,
    d.descripcion AS Diagnostico,
    ec.nombre AS Estado
FROM
    estadosCita ec
    RIGHT JOIN detalleCita dc ON ec.idEstadocita = dc.idEstadoCita
    RIGHT JOIN cita c ON dc.idCita = c.idCita
    LEFT JOIN diagnostico d ON dc.idDiagnostico = d.idDiagnostico;

/* Se requiere visualisar todas las citas que estan en estado "Pendiente" */
SELECT
    c.idCita AS NumeroCita,
    p.primerNombre AS NombrePaciente,
    p.primerApellido AS ApellidoPaciente,
    ec.nombre AS Estado
FROM
    estadosCita ec
    RIGHT JOIN detalleCita dc ON ec.idEstadocita = dc.idEstadoCita
    RIGHT JOIN cita c ON dc.idCita = c.idCita
    RIGHT JOIN cliente cl ON c.clienteNumeroDocumento = cl.numeroDocumento
    RIGHT JOIN persona p ON cl.numeroDocumento = p.numeroDocumento
WHERE
    ec.nombre LIKE 'Pendiente'
    OR ec.nombre IS NULL;

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
