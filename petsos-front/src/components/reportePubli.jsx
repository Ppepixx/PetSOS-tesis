import { useState } from "react";
import { reportarContenido } from "../api/reportar";

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

        {/* Menú de motivos */}
        {mostrarMenu && (
            <div className="absolute right-0 z-20 mt-2 w-56 bg-white border rounded shadow-md p-2"
                onClick={(e) => e.stopPropagation()}
            >
                
            <p className="text-sm text-gray-700 font-semibold mb-2">Motivo del reporte:</p>
            {motivosPublicacion.map((motivo) => (
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

export default ReportarPubli;