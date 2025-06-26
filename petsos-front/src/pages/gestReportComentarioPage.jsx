import { useEffect, useState } from "react";
import { obtenerReportesComentarios, actualizarEstadoReporte, eliminarReporte } from "../api/reportar";
import Header from "../components/Header";

const GestReportComentarioPage = () => {
    const [reportes, setReportes] = useState([]);

    useEffect(() => {
        const cargarReportes = async () => {
            try {
                const res = await obtenerReportesComentarios();
                setReportes(res);
            } catch (error) {
                console.error("Error al cargar reportes de comentarios", error);
            }
        };
        cargarReportes();
    }, []);

const handleEstadoChange = async (reporteId, nuevoEstado) => {
    try {
        if (nuevoEstado === "pendiente") {
            await actualizarEstadoReporte(reporteId, nuevoEstado);
            setReportes((prev) =>
                prev.map((r) =>
                    r._id === reporteId ? { ...r, estado: nuevoEstado } : r
                )
            );
        } else {
            await eliminarReporte(reporteId);
            setReportes((prev) => prev.filter((r) => r._id !== reporteId));
        }
    } catch (error) {
        console.error("Error al manejar el estado del reporte:", error);
    }
};

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-4">Gestión de Reportes de Comentarios</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 rounded">
                        <thead className="bg-red-100">
                            <tr>
                                <th className="py-2 px-4 border-b">Motivo</th>
                                <th className="py-2 px-4 border-b">Comentario</th>
                                <th className="py-2 px-4 border-b">Autor del Reporte</th>
                                <th className="py-2 px-4 border-b">Publicación</th>
                                <th className="py-2 px-4 border-b">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportes.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-500">
                                        No hay reportes de comentarios por revisar.
                                    </td>
                                </tr>
                            ) : (
                            reportes.map((r) => (
                                <tr key={r._id} className="text-center">
                                    <td className="py-2 px-4 border-b">{r.motivo}</td>
                                    <td className="py-2 px-4 border-b">{r.comentario?.texto || "Comentario no disponible"}</td>
                                    <td className="py-2 px-4 border-b">{r.autor?.username || "Anónimo"}</td>
                                    <td className="py-2 px-4 border-b">{r.publicacion?.titulo || "Sin título"}</td>
                                    <td className="py-2 px-4 border-b">
                                        <select
                                            value={r.estado}
                                            onChange={(e) => handleEstadoChange(r._id, e.target.value)}
                                            className="border rounded px-2 py-1 text-md"
                                        >
                                            <option value="pendiente">Pendiente</option>
                                            <option value="resuelto">Resuelto</option>
                                            <option value="rechazado">Rechazado</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GestReportComentarioPage;