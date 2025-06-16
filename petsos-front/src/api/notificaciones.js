import instance from "./axios.js"; // Importa tu instancia configurada

export const obtenerNotificaciones = async (token) => {
  try {
    const response = await instance.get("/petsos/vernoti", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    

    console.log('Respuesta API notificaciones:', response.data); // Para debug
    return response.data;
  } catch (error) {
    console.error('Error en obtenerNotificaciones:', error);
    throw error;
  }
  
};

export const eliminarNotificacion = async ( token, id) => {
  try {
    const response = await instance.delete(`/petsos/eliminarNoti/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Respuesta API eliminarNotificacion:', response.data); // Para debug
    return response.data; 
  } catch (error) {
    console.error("Error al eliminar notificación:", error);
    throw error; // Re-lanzar para que el frontend lo maneje
  }
};