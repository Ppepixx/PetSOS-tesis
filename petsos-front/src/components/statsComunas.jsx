import { useEffect, useState } from "react";
import { getStatsComunasRequest } from "../api/publi";


// Función para poner la primera letra en mayúscula (ej: "perdido" -> "Perdido")
const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

function StatsComunas() {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadStats() {
            try {
                const res = await getStatsComunasRequest();
                
                // Esta línea espera un objeto { stats: [...] }
                if (res.data && Array.isArray(res.data.stats)) {
                    setStats(res.data.stats);
                } else {
                    console.error("La respuesta de la API no tiene el formato esperado:", res.data);
                    setStats([]);
                }
            } catch (error) {
                console.error("Error cargando stats", error);
                setError("No se pudieron cargar las estadísticas.");
            } finally {
                setLoading(false);
            }
        }
        loadStats();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Cargando estadísticas...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Estadísticas por Comuna
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
                
                {stats.map((categoria) => (
                    <div key={categoria.estado} className="p-4 border rounded-lg bg-white shadow-sm">
                        
                        <h4 className="text-xl font-semibold text-pink-700 mb-3 text-center">
                            {capitalize(categoria.estado)}
                        </h4>
                        
                        {categoria.comunas.length === 0 ? (
                            <p className="text-center text-gray-500 text-sm">Sin datos.</p>
                        ) : (
                            <ol className="list-decimal list-inside space-y-2">
                                {categoria.comunas.map((item) => (
                                    <li key={item.comuna} className="text-gray-700">
                                        <span className="font-medium">{item.comuna}:</span> 
                                        <span className="font-bold ml-2">
                                            {item.count} {item.count > 1 ? 'casos' : 'caso'}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </div>
                ))}

                {stats.length === 0 && !loading && (
                    <p className="text-center text-gray-500 md:col-span-3">
                        No hay datos de publicaciones para mostrar.
                    </p>
                )}
            </div>
        </div>
    );
}

export default StatsComunas;