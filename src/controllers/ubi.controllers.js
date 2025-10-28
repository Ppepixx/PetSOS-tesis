// Importamos el objeto UBICACIONES que acabamos de definir
import UBICACIONES from '../models/ubicaciones.js';

export const getUbicaciones = (req, res) => {
  try {
    // Enviamos el objeto UBICACIONES como respuesta JSON
    res.json(UBICACIONES);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las ubicaciones', error: error.message });
  }
};