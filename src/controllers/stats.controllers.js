import Publi from "../models/publi.model.js";

export const getStatsLostPetsByCommune = async (req, res) => {
    try {
        const stats = await Publi.aggregate([
            {
                // 1. ETAPA DE FILTRADO (NUEVA):
                // Nos aseguramos de solo procesar publicaciones que SÍ TENGAN
                // los campos 'estado' y 'comuna'.
                $match: {
                    estado: { $exists: true, $ne: null, $ne: "" },
                    comuna: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                // 2. Agrupar por ambos campos: estado Y comuna
                $group: {
                    _id: { estado: "$estado", comuna: "$comuna" },
                    count: { $sum: 1 }
                }
            },
            {
                // 3. Ordenar por el contador (de mayor a menor)
                $sort: { count: -1 }
            },
            {
                // 4. Agrupar de nuevo, esta vez solo por el estado
                $group: {
                    _id: "$_id.estado", // Agrupar por "perdido", "rescate", "adopción"
                    comunas: {
                        $push: { // Crear un array con las comunas y sus conteos
                            comuna: "$_id.comuna",
                            count: "$count"
                        }
                    }
                }
            },
            {
                // 5. Renombrar "_id" a "estado" para que sea más claro
                $project: {
                    _id: 0,
                    estado: "$_id",
                    comunas: "$comunas"
                }
            },
            {
                // 6. Ordenar las categorías (opcional)
                $sort: { estado: 1 }
            }
        ]);
        
        // Devolvemos el array dentro de un objeto { stats: [...] }
        res.json({ stats });

    } catch (error) {
        // Esto te ayudará a ver errores en la consola del backend
        console.error("Error en getStatsLostPetsByCommune:", error);
        res.status(500).json({ message: "Error al obtener estadísticas", error: error.message });
    }
};






