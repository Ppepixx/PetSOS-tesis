import { useEffect, useState } from "react";
import ListPubli from "../api/publis"

const PubliPage = () =>{
    const [publicaciones, setPublis] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const loadPublis = async () => {
            try {
                const data = await ListPubli();
                setPublis(data);
                setError(null);
            } catch (error) {
                console.error("Error al cargar publicaciones:", error);
                setError("No se pudieron cargar las publicaciones. Por favor, inténtalo más tarde.");
            } finally {
                setLoading(false);
            }
        };
        loadPublis();
    }, []);

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p className="text-xl font-semibold text-red-600">{error}</p>
            </div>
        );
    }
    return (
        <div>
            <h2 className="py-2 text-4xl font-extrabold text-red-500 text-center w-full mb-10">Publicaciones</h2>
            {publicaciones.map((publi) => (
                    <PubliCard
                    key={publi._id}
                    publi={publi}
                />
            ))}
        </div>
    )
}

const PubliCard = ({ publi, onLike }) => {
    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 p-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img
                    src={publi.imgURL}
                    alt={publi.titulo}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-800">{publi.titulo}</h2>
                    <p className="text-gray-700 mt-1">{publi.descripcion}</p>

                    <div className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold">Tipo:</span> {publi.tipo}
                    </div>
                    
                    <div className="mt-1 text-sm text-gray-600">
                        <span className="font-semibold">Ubicación:</span>{" "}
                        {`${publi.ubicacion?.comuna || "-"}, ${publi.ubicacion?.ciudad || "-"}, ${publi.ubicacion?.region || "-"}`}
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={() => onLike(publi._id)}
                            className="px-3 py-1 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
                        >
                            ❤️ {publi.likes?.length || 0}
                        </button>

                        <button
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Ver comentarios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PubliPage