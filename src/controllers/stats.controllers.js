import Publi from '../models/publi.model.js';

// Esta función ya existe y está perfecta
export const getPublicacionesPorComuna = async (req, res) => {
  try {
    const stats = await Publi.aggregate([
      {
        $group: {
          _id: '$ubicacion.comuna', // Agrupa por la comuna
          count: { $sum: 1 },      // Cuenta cuántas publicaciones hay
        },
      },
      {
        $project: {
          _id: 0,
          comuna: '$_id', // Renombra _id a 'comuna'
          count: 1,
        },
      },
      {
        $sort: { count: -1 }, // Ordena de mayor a menor
      },
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estadísticas', error });
  }
};

export const getPublicacionesPorTipo = async (req, res) => {
  try {
    const stats = await Publi.aggregate([
      {
        $group: {
          _id: '$tipo', // Agrupamos por el campo 'tipo'
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          tipo: '$_id', // Renombramos _id a 'tipo'
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estadísticas por tipo', error });
  }
};




