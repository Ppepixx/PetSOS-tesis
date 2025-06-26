import axios from "./axios";

export const reportarContenido = async ({ tipo, motivo, publicacion, comentario }) => {
    return await axios.post("/petsos/reportes", {
        tipo,
        motivo,
        publicacion,
        ...(tipo === "comentario" && { comentario }),
    });
};

export const actualizarEstadoReporte = async (id, estado) => {
    return await axios.put(`/petsos/admin/reportes/${id}`, { estado });
};

export const obtenerReportesComentarios = async () => {
    const res = await axios.get("/petsos/admin/reportes-comentarios");
    return res.data;
};

export const obtenerReportesPublicaciones = async () => {
    const res = await axios.get("/petsos/admin/reportes-publicaciones");
    return res.data;
};

export const eliminarReporte = async (id) => {
    return await axios.delete(`/petsos/admin/eliminar/reportes/${id}`);
};