import Publi from "../models/publi.model.js";
// Obtener estadísticas de mascotas perdidas por comuna

export const getStatsLostPetsByCommune = async (_req, res) => {
  try {
    const stats = await Publi.aggregate([  
        { $match: { tipo: 'perdida' } },
        { $group: { _id: "$ubicacion.comuna", totalPerdidas: { $sum: 1 } } },
        { $project: { comuna: "$_id", totalPerdidas: 1, _id: 0 } }
    ]);
    res.json({ stats });
  } catch (error) {
    console.error("Error al obtener estadísticas de mascotas perdidas por comuna:", error);
    res.status(500).json({ message: "Error al obtener las estadísticas", error: error.message });
  }     
};

