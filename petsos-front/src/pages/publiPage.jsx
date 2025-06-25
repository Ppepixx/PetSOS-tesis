import { useEffect, useState } from "react";
import ListPubli from "../api/publis";
import Header from "../components/header.jsx"
import { likePublicacion } from "../api/publi.js";
import { useAuth } from "../context/AuthContext.jsx";
const PubliPage = () => {
    const [publicaciones, setPublis] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState("");
    const [publiSeleccionada, setPubliSeleccionada] = useState(null);

    const { user } = useAuth();
    const userId = user?._id;
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white">
                <p className="text-lg text-gray-600">Cargando publicaciones...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white">
                <p className="text-xl font-semibold text-red-600">{error}</p>
            </div>
        );
    }
    const handleFiltro = (tipoSeleccionado) => {
        setFiltro(tipoSeleccionado);
    };
    if (publiSeleccionada) {
        console.log("Autor seleccionado:", publiSeleccionada.autor);
    }

    const handleLike = async (publiId) => {
        try {
            await likePublicacion(publiId);

            setPublis((prevPublis) =>
            prevPublis.map((publi) =>
                publi._id === publiId
                ? {
                    ...publi,
                    likes: publi.likes.includes(userId)
                        ? publi.likes.filter((id) => id !== userId)
                        : [...publi.likes, userId],
                    }
                : publi
            )
            );
        } catch (error) {
            console.error("Error al dar like:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-orange-50">
            <Header/>
            <div className="px-6 py-2">
                <div className="max-w-7xl bg-orange-200 rounded-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3 flex-wrap">
                        <label className="font-semibold text-black">Filtrar por tipo:</label>
                        {["perdida", "rescate", "adopcion"].map((tipo) => (
                            <button
                                key={tipo}
                                onClick={() => handleFiltro(tipo)}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                                    filtro === tipo
                                        ? "bg-pink-600 text-white"
                                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                            >
                                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                            </button>
                        ))}
                        <button
                            onClick={() => handleFiltro("")}
                            className="px-3 py-1 rounded-full bg-gray-200 text-sm hover:bg-gray-300 transition"
                        >
                            Mostrar todos
                        </button>
                    </div>

                    <button
                        className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 m-2 rounded-md text-sm transition"
                        onClick={() => {
                            window.location.href = "/crear-publi";
                        }}
                    >
                        + Crear publicación
                    </button>
                </div>

                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-center text-pink-600 mb-12">
                        🐾 Publicaciones 🐾
                    </h2>

                    <div className="flex flex-wrap">
                        {publicaciones
                            .filter((publi) => !filtro || publi.tipo === filtro)
                            .map((publi) => (
                                <PubliCard key={publi._id} publi={publi} handleLike={handleLike}  onClick={(publi) => setPubliSeleccionada(publi)} />
                        ))}
                    </div>
                </div>
            </div>
            {publiSeleccionada && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        onClick={() => setPubliSeleccionada(null)}
                    >
                        ✖
                    </button>
                    <div className="flex items-center p-4 border-b">
                        <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center text-white font-bold mr-3">
                            {publiSeleccionada.autor?.username?.charAt(0).toUpperCase() || "?"}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-800">{publiSeleccionada.autor?.username || "Usuario desconocido"}</span>
                            <span className="text-sm font-semibold text-blue-600">Correo: {publiSeleccionada.autor?.email || "Correo desconocido"}</span>
                            <span className="text-sm font-semibold text-blue-600">Teléfono: {publiSeleccionada.autor?.telefono || "Telefono desconocido"}</span>
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-pink-600">{publiSeleccionada.titulo}</h3>
                    <p className="text-gray-700 mb-2">{publiSeleccionada.descripcion}</p>
                    {publiSeleccionada.imgURL && (
                        <img
                        src={`http://localhost:4000/uploads/${publiSeleccionada.imgURL}`}
                        alt={publiSeleccionada.titulo}
                        className="w-full h-auto rounded-md mb-2 object-cover max-h-80"
                        />
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                        Tipo: {publiSeleccionada.tipo} | Región: {publiSeleccionada?.ubicacion?.region}
                    </p>
                    <div className="mt-4">
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">💬 Comentarios</h4>
                            {publiSeleccionada.comentarios && publiSeleccionada.comentarios.length > 0 ? (
                                <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                {publiSeleccionada.comentarios.map((comentario) => (
                                    <li key={comentario._id} className="bg-gray-100 p-2 rounded">
                                        <p className="text-sm text-gray-700">{comentario.texto}</p>
                                        <p className="text-xs text-gray-500 text-right">— {comentario.autor?.username || "Anónimo"}</p>
                                    </li>
                                ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500">No hay comentarios aún.</p>
                            )}
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const PubliCard = ({ publi, handleLike, onClick }) => {
    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 p-4">

            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                onClick={()=> onClick(publi)}
            >

                <div className="flex items-center p-4">
                    <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center text-white font-bold mr-3">
                        {publi.autor?.username?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-800">{publi.autor?.username || "Usuario desconocido"}</span>
                    </div>
                </div>

                {publi.imgURL && (
                    <img
                        src={`http://localhost:4000/uploads/${publi.imgURL}`}
                        alt={publi.titulo}
                        className="w-full h-60 object-cover"
                    />
                )}

                <div className="p-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-1">{publi.titulo}</h2>
                    <p className="text-gray-700 text-sm mb-2 line-clamp-2">{publi.descripcion}</p>

                    <div className="text-sm text-gray-600 mb-2">
                        <p><strong>Tipo:</strong> {publi.tipo}</p>
                        <p>
                            <strong>Ubicación:</strong>{" "}
                            {`${publi.ubicacion?.comuna || "-"}, ${publi.ubicacion?.ciudad || "-"}, ${publi.ubicacion?.region || "-"}`}
                        </p>
                    </div>

                    <div className="mt-3 flex justify-between items-center"
                        onClick={(e)=> e.stopPropagation()}
                    >
                        <button
                            onClick={() => handleLike(publi._id)}
                            className="flex items-center space-x-1 px-3 py-1 text-sm bg-pink-600 text-white rounded hover:bg-pink-700 transition"
                        >
                            <span>❤️</span>
                            <span>{publi.likes?.length || 0}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PubliPage;