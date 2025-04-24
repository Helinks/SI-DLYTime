
export const formatearFecha = (fecha: any) => {
    try {
      if (!fecha) return null;
      const date = new Date(fecha);

      if (isNaN(date.getTime())) return null; // Verifica si la fecha es válida
      return date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Error al formatear fecha:", error);
      return null;
    }
  };