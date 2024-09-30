/*Buscar el cliente con su primera cita programada pendiente*/
select p.primerNombre, p.primerApellido, c.idCita, c.idCita, es.nombre AS Estado_Cita
from persona p
inner join cliente on p.numeroDocumento = cliente.numeroDocumento and p.idTipoIdentificacion = cliente.idTipoIdentificacion
inner join cita c on c.clienteNumeroDocumento = cliente.numeroDocumento
inner join detallecita on detallecita.idCita = c.idCita
inner join estadoscita es on detallecita.idEstadoCita = es.idEstadocita 
where es.idEstadocita = "1" and c.clienteNumeroDocumento = "12345678" limit 1;

/*Obtener todos los diagnósticos de un cliente específico*/
select p.primerNombre, p.primerApellido, d.idDiagnostico AS Diagnostico, d.descripcion
from persona p
inner join diagnostico d on p.numeroDocumento = d.numeroDocumento and p.idTipoIdentificacion = d.tipoDocumento where d.numeroDocumento like "98742135";

/*Listar todos los empleados y su rol correspondiente*/
SELECT p.primerNombre, p.primerApellido, r.nombre AS rol
FROM empleado e
inner join persona p on e.numeroDocumento = p.numeroDocumento AND e.idTipoIdentificacion = p.idTipoIdentificacion
inner join Empleado_has_rolEmpleado er on e.numeroDocumento = er.numeroDocumento AND e.idTipoIdentificacion = er.idTipoIdentificacion
inner join rolEmpleado r on er.idRol = r.idRol
ORDER BY p.primerNombre;

/*Buscar todos los problemas de soporte para un cliente específico*/
SELECT s.descripcionProblema, tp.descripcion AS Tipo_Problema
FROM soporte s
inner join tipoProblema tp on s.idTipoProblema = tp.idTipoProblema
inner join cliente c on s.numeroDocumento = c.numeroDocumento
WHERE c.numeroDocumento = 98512478
ORDER BY s.idSoporte;

/*Obtener la cantidad de citas pendientes por oftalmólogo:*/
SELECT o.numeroDocumento, COUNT(ci.idCita) AS cantidadPendientes, ec.nombre AS Estado_citas
FROM oftalmologo o
inner join cita ci on o.numeroDocumento = ci.oftalmologoNumeroDocumento
inner join detallecita dc on ci.idCita = dc.idCita
inner join estadosCita ec on dc.idEstadoCita = ec.idEstadocita
WHERE ec.nombre = 'Pendiente'
GROUP BY o.numeroDocumento
ORDER BY cantidadPendientes DESC;

/*Consultas anidadas*/

/*Obtener el oftalmólogo que ha atendido la mayor cantidad de citas*/
SELECT o.numeroDocumento, p.primerNombre, p.primerApellido
FROM oftalmologo o
inner join persona p on o.numeroDocumento = p.numeroDocumento
WHERE o.numeroDocumento = (
        SELECT c.oftalmologoNumeroDocumento
        FROM cita c
        GROUP BY c.oftalmologoNumeroDocumento
        ORDER BY COUNT(c.idCita) DESC
        LIMIT 1
		);