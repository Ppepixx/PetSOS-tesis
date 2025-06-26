import { useState } from "react";
import { reportarContenido } from "../api/reportar";

const motivosComentario = [
    "Lenguaje ofensivo",
    "Acoso o bullying",
    "Spam o publicidad",
    "Contenido inapropiado",
    "Información falsa",
    "Violencia o amenazas"
];

const ReportarComentario = ({ publicacionId, comentarioId }) => {
    const [mostrarMenu, setMostrarMenu] = useState(false);
    const [motivoSeleccionado, setMotivoSeleccionado] = useState(null);

    const enviarReporte = async () => {
        try {
            await reportarContenido({
                tipo: "comentario",
                motivo: motivoSeleccionado,
                publicacion: publicacionId,
                comentario: comentarioId,
            });
        setMostrarMenu(false);
        } catch (error) {
            console.error("Error al reportar el comentario:", error);
        }
    };

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

        {/* Menú de motivos */}
        {mostrarMenu && (
            <div className="absolute right-0 z-20 mt-2 w-56 bg-white border rounded shadow-md p-2">
            <p className="text-sm text-gray-700 font-semibold mb-2">Motivo del reporte:</p>
            {motivosComentario.map((motivo) => (
                <button
                key={motivo}
                onClick={() => setMotivoSeleccionado(motivo)}
                className={`w-full text-left px-3 py-1 rounded text-sm hover:bg-gray-100 ${
                    motivoSeleccionado === motivo ? "bg-pink-100 font-bold" : ""
                }`}
                >
                {motivo}
                </button>
            ))}
            {motivoSeleccionado && (
                <button
                onClick={enviarReporte}
                className="mt-3 w-full bg-red-500 text-white text-sm py-1 rounded hover:bg-red-600 transition"
                >
                Reportar
                </button>
            )}
            </div>
        )}
        </div>
    );
};

export default ReportarComentario;
