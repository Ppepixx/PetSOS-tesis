import { useState } from "react";
import { reportarContenido } from "../api/reportar";
import { useAuth } from "../context/AuthContext";
import { usePubli } from "../context/PublicacionContext";

const motivosComentario = [
    "Lenguaje ofensivo",
    "Acoso o bullying",
    "Spam o publicidad",
    "Contenido inapropiado",
    "Información falsa",
    "Violencia o amenazas"
];

const ReportarComentario = ({ publiId, comentarioId }) => {
    const [mostrarMenu, setMostrarMenu] = useState(false);
    const [motivoSeleccionado, setMotivoSeleccionado] = useState(null);
    // OBTÉN EL ESTADO DE ADMIN Y LA FUNCIÓN DE ELIMINAR
    const { isAdmin } = useAuth();
    const { eliminarComentarioAdmin } = usePubli(); // (Exportado desde el Context)

    const enviarReporte = async () => {
        try {
            await reportarContenido({
                tipo: "comentario",
                motivo: motivoSeleccionado,
                publicacion: publiId,
                comentario: comentarioId,
            });
        setMostrarMenu(false);
        } catch (error) {
            console.error("Error al reportar el comentario:", error);
        }
    };

    // FUNCIÓN PARA MANEJAR EL CLICK DE ELIMINAR (ADMIN)
    const handleAdminDelete = (e) => {
        e.stopPropagation(); // Evita que se activen otros clicks
        if (window.confirm("¿Seguro que quieres eliminar este comentario?")) {
            eliminarComentarioAdmin(publiId, comentarioId);
            setMostrarMenu(false); // Ocultar menú
        }
    };
    
    // Función auxiliar para verificar si el usuario es Admin.
    // Asume que isAdmin es una función que devuelve un booleano (true si es admin).
    const isCurrentUserAdmin = isAdmin();


    return (
        <div className="relative inline-block text-left">
        {/* Botón tres puntos */}
        <button
            onClick={(e) => {
            e.stopPropagation();
            setMostrarMenu(!mostrarMenu);
            }}
            className="text-gray-600 hover:text-gray-800 text-xl"
        >
            <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="6" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="18" r="2" />
            </svg>
        </button>

        {mostrarMenu && (
            <div
            onClick={(e) => e.stopPropagation()}
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
            >
            <div className="py-1">
                {/* ELIMINADA LA LÓGICA DE REPORTE DUPLICADA AL INICIO (LÍNEAS 33-46 ORIGINALES) 
                  Y REEMPLAZADA POR UN ÚNICO TERNARIO QUE DECIDE EL CONTENIDO DEL MENÚ.
                */}

                {isCurrentUserAdmin ? (
                    // === VISTA DE ADMINISTRADOR ===
                    <div>
                        <p className="text-sm text-gray-700 font-semibold mb-2 px-4">Acción de Admin:</p>
                        <button
                            onClick={handleAdminDelete}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-pink-100 font-bold"
                        >
                            Eliminar Comentario
                        </button>
                    </div>
                ) : (
                    // === VISTA DE USUARIO NORMAL (REPORTE) ===
                    <>
                        <p className="text-sm text-gray-700 font-semibold mb-2 px-4">Motivo del reporte:</p>
                        {motivosComentario.map((motivo) => (
                            <button
                                key={motivo}
                                onClick={() => {
                                    setMotivoSeleccionado(motivo);
                                    // NO LLAMAMOS A enviarReporte aquí. Se llama al final (Botón Reportar)
                                }}
                                className={`w-full text-left px-3 py-1 rounded text-sm hover:bg-gray-100 ${
                                    motivoSeleccionado === motivo ? "bg-pink-100 font-bold" : ""
                                }`}
                            >
                                {motivo}
                            </button>
                        ))}
                        <div className="px-3">
                            {motivoSeleccionado && (
                                <button
                                    onClick={enviarReporte}
                                    className="mt-3 w-full bg-red-500 text-white text-sm py-1 rounded hover:bg-red-600 transition"
                                >
                                    Reportar
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
            </div>
        )}
        </div>
    );
};

export default ReportarComentario;
