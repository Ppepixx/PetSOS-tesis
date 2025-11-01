import { useState } from "react";
import { reportarContenido } from "../api/reportar";
import { useAuth } from "../context/AuthContext";
import { usePubli } from "../context/PublicacionContext";

const motivosPublicacion = [
    "Contenido inapropiado",
    "Información falsa",
    "Spam o publicidad",
    "Acoso o bullying",
    "Lenguaje ofensivo",
];

const ReportarPubli = ({ publiId }) => {
    const [mostrarMenu, setMostrarMenu] = useState(false);
    const [motivoSeleccionado, setMotivoSeleccionado] = useState(null);
    const [reportado, setReportado] = useState(false);
   // OBTÉN EL ESTADO DE ADMIN Y LA FUNCIÓN DE ELIMINAR
    const { isAdmin } = useAuth();
    const { eliminarPubliAdmin } = usePubli(); // (Exportado desde el Context)

    const enviarReporte = async () => {
        try {
        await reportarContenido({
            tipo: "publicacion",
            motivo: motivoSeleccionado,
            publicacion: publiId,
        });
        setReportado(true);
        setMostrarMenu(false);
        } catch (error) {
        console.error("Error al reportar:", error);
        }
    };

    // 3. FUNCIÓN PARA MANEJAR EL CLICK DE ELIMINAR (ADMIN)
    const handleAdminDelete = (e) => {
        e.stopPropagation(); // Evita que se activen otros clicks
        if (window.confirm("¿Seguro que quieres eliminar esta publicación?")) {
            eliminarPubliAdmin(publiId);
            setMostrarMenu(false); // Ocultar menú
        }
    };

    return (
        <div className="absolute top-2 right-2 z-30 text-left ">
        {/* Botón tres puntos */}
            <button
                onClick={(e) => {
                e.stopPropagation();
                setMostrarMenu(!mostrarMenu);
                }}
                className="text-gray-600 hover:text-gray-800 text-xl top-2"
            >
                <svg
                    width="24"
                    height="24"
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
     
        {/* 4. MENÚ CONDICIONAL (ADMIN VS USUARIO) */}
        {mostrarMenu && (
            <div className="absolute right-0 z-20 mt-2 w-56 bg-white border rounded shadow-md p-2"
                onClick={(e) => e.stopPropagation()}
            >
                { isAdmin() ? (
                    // VISTA DE ADMIN
                    <div>
                        <p className="text-sm text-gray-700 font-semibold mb-2">Acción de Admin:</p>
                        <button
                            onClick={handleAdminDelete}
                            className="w-full text-left px-3 py-1 rounded text-sm text-red-600 hover:bg-red-100 font-bold"
                        >
                            Eliminar Publicación
                        </button>
                    </div>
                ) : (
                    // VISTA DE USUARIO NORMAL
                    <>
                        <p className="text-sm text-gray-700 font-semibold mb-2">Motivo del reporte:</p>
                        {motivosPublicacion.map((motivo) => (
                            <button
                            key={motivo}
                            onClick={() => setMotivoSeleccionado(motivo)}
            className={`w-full text-left px-3 py-1 rounded text-sm hover:bg-gray-100 ${motivoSeleccionado === motivo ? "bg-pink-100 font-bold" : ""
                }`}
                // Deshabilita si ya fue reportado
                disabled={reportado} 
                            >
                            {motivo}
                            </button>
                        ))}
                        {motivoSeleccionado && !reportado && (
                            <button
                            onClick={enviarReporte}
                            className="mt-3 w-full bg-red-500 text-white text-sm py-1 rounded hover:bg-red-600 transition"
                            >
                            Reportar
                            </button>
                        )}
                        {reportado && (
                            <p className="mt-3 w-full text-green-600 text-sm py-1 text-center font-bold">
                                Reporte Enviado
                            </p>
                        )}
                    </>
                )}
            </div>
        )}
        </div>
    );
};

export default ReportarPubli;