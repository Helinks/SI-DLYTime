import CitaDetalle from '../../../../types/cita';

const filtro = (citas: CitaDetalle[], busqueda: string): CitaDetalle[] => {
    const busquedaLower = busqueda?.toLowerCase() || '';
    return citas.filter((cita) =>
        cita.nombreCliente?.toLowerCase().includes(busquedaLower) ||
        cita.nombreEmpleado?.toLowerCase().includes(busquedaLower) ||
        cita.tipoConsulta?.toLowerCase().includes(busquedaLower) ||
        cita.direccion?.toLowerCase().includes(busquedaLower) ||
        cita.estadoCita?.toLowerCase().includes(busquedaLower) ||
        cita.fecha?.toLowerCase().includes(busquedaLower) ||
        cita.hora?.toLowerCase().includes(busquedaLower)
    );
};

export default filtro;
