import Personas from '../../../../types/persona';

const filtro = (personas: Personas[], busqueda: string): Personas[] => {
    const busquedaLower = busqueda?.toLowerCase() || '';

    return personas.filter((persona) =>
        (persona.Nombres?.toLowerCase().includes(busquedaLower) || false) ||
        (persona.Apellidos?.toLowerCase().includes(busquedaLower) || false) ||
        persona.numeroDocumento?.toString().includes(busqueda)
    );
};  

export default filtro;
