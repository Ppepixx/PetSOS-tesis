import { useEffect, useState } from "react";
import ListPubli from "../api/publis";
import Header from "../components/header.jsx"
import { likePublicacion } from "../api/publi.js";
import { useAuth } from "../context/AuthContext.jsx";
import { comentarPublicacion } from "../api/comentarios.js";
import ReportarPubli from "../components/reportePubli.jsx";
import ReportarComentario from "../components/reporteComentario.jsx";

const PubliPage = () => {
    const [publicaciones, setPublis] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState("");
    const [publiSeleccionada, setPubliSeleccionada] = useState(null);
    const { user } = useAuth();
    const [nuevoComentario, setNuevoComentario] = useState("");
    
const enviarComentario = async () => {
    if (!nuevoComentario.trim()) return;

    try {
        const res = await comentarPublicacion(publiSeleccionada._id, nuevoComentario);
        setPubliSeleccionada(res.data); // Actualiza la publicación con comentarios
        setNuevoComentario("");
    } catch (error) {
        console.error("Error al comentar:", error);
    }
};
    
    // Obtener el ID del usuario autenticado
    // Esto asume que el contexto de autenticación proporciona un objeto `user` con un `_id`
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
        <div className="min-h-screen flex flex-col bg-pink-50">
            <Header />
            {/* Filtro y botón de crear publicación */}
            <div className="px-6 py-2">
                <div className="max-w-7xl bg-pink-200 rounded-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Botones de filtro */}
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

                    {/* Botón crear publicación */}
                    <button
                        className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 m-2 rounded-md text-sm transition"
                        onClick={() => window.location.href = "/crear-publi"}
                    >
                        + Crear publicación
                    </button>
                </div>

                {/* Listado de publicaciones */}
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-center text-pink-600 mb-12">
                        🐾 Publicaciones 🐾
                    </h2>

                    <div className="flex flex-wrap">
                        {publicaciones
                            .filter((publi) => !filtro || publi.tipo === filtro)
                            .map((publi) => (
                                <PubliCard
                                    key={publi._id}
                                    publi={publi}
                                    handleLike={handleLike}
                                    onClick={() => setPubliSeleccionada(publi)}
                                />
                            ))}
                    </div>
                </div>
            </div>

            {/* Modal con detalle de la publicación seleccionada */}
            {publiSeleccionada && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                <div className="relative w-[70vh] max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col h-[70vh]">

                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold z-10"
                    onClick={() => setPubliSeleccionada(null)}
                >
                    ✕
                </button>

                {/* Cabecera */}
                <div className="flex items-center gap-3 p-4 border-b">
                    <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                    {publiSeleccionada.autor?.username?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800">{publiSeleccionada.autor?.username || "Usuario desconocido"}</span>
                        <span className="text-xs text-gray-500">Correo: {publiSeleccionada.autor?.email || "Correo desconocido"}</span>
                        <span className="text-xs text-gray-500">Teléfono: {publiSeleccionada.autor?.telefono || "Teléfono desconocido"}</span>
                    </div>
                </div>

                {/* Contenido */}
                <div className="flex flex-col md:flex-row flex-grow overflow-hidden">

                    {/* Imagen y detalles */}
                    <div className="md:w-1/2 overflow-y-auto p-4 space-y-3">
                        {publiSeleccionada.imgURL && (
                            <img
                            src={`http://localhost:4000/uploads/${publiSeleccionada.imgURL}`}
                            alt={publiSeleccionada.titulo}
                            className="w-full h-60 object-cover rounded-lg shadow"
                            />
                        )}
                        <h2 className="text-xl font-bold text-pink-600">{publiSeleccionada.titulo}</h2>
                        <p className="text-gray-700 text-sm">{publiSeleccionada.descripcion}</p>
                        <div className="text-sm text-gray-500 mt-2">
                            Tipo: <strong>{publiSeleccionada.tipo}</strong> | Región: <strong>{publiSeleccionada?.ubicacion?.region}</strong>
                        </div>
                    </div>

                    {/* Comentarios */}
                    <div className="mt-4 flex flex-col h-120"> 
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">💬 Comentarios</h4>
                        <div className="flex-1 overflow-y-auto space-y-2 pr-2 bg-gray-50 p-2 rounded-md border">
                            {publiSeleccionada.comentarios?.length > 0 ? (
                            publiSeleccionada.comentarios.map((comentario) => (
                                <div key={comentario._id} className="bg-white p-2 rounded shadow-sm flex justify-between items-start gap-2">
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-700">{comentario.texto}</p>
                                        <p className="text-xs text-gray-500 text-right">
                                        — {comentario.autor?.username || "Anónimo"}
                                        </p>
                                    </div>
                                        <ReportarComentario
                                            publicacionId={publiSeleccionada._id}
                                            comentarioId={comentario._id}
                                        />
                                </div>
                            ))
                            ) : (
                            <p className="text-sm text-gray-500">No hay comentarios aún.</p>
                            )}
                        </div>

                        {/* Formulario de nuevo comentario */}
                            <div className="mt-2">
                                <textarea
                                className="w-full border rounded p-2 text-sm"
                                rows="2"
                                placeholder="Escribe un comentario..."
                                value={nuevoComentario}
                                onChange={(e) => setNuevoComentario(e.target.value)}
                                />
                                <button
                                onClick={enviarComentario}
                                className="mt-2 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition text-sm"
                                >
                                Comentar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

const PubliCard = ({ publi, handleLike, onClick, usuarioActual }) => {
    const yaLeDioLike = publi.likes?.includes(usuarioActual?._id);
    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
            <div className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                onClick={() => onClick(publi)}
            >
                <ReportarPubli publiId={publi._id} />

                {/* Info del autor */}
                <div className="flex items-center p-4 pt-8">
                    <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center text-white font-bold mr-3">
                        {publi.autor?.username?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-800">{publi.autor?.username || "Usuario desconocido"}</span>
                    </div>
                </div>

                {/* Imagen */}
                {publi.imgURL && (
                <img
                    src={`http://localhost:4000/uploads/${publi.imgURL}`}
                    alt={publi.titulo}
                    className="w-full h-60 object-cover"
                />
                )}

                {/* Contenido */}
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
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => handleLike(publi._id)}
                            className={`flex items-center space-x-1 px-3 py-1 text-sm ${
                                yaLeDioLike ? "bg-red-100 text-red-600" : "bg-black text-white"
                            } rounded hover:bg-opacity-80 transition`}
                            >
                            <span>
                                {yaLeDioLike ? "❤️" : "🤍"}
                            </span>
                            <span>{publi.likes?.length || 0}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PubliPage;