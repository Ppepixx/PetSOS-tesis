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
