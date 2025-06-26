import Report from "../models/report.model.js";
import Publi from "../models/publi.model.js";

export const crearReporte = async (req, res) => {
    try {
        const { tipo, motivo, publicacion, comentario } = req.body;
        const autor = req.user.id;

        if (!["publicacion", "comentario"].includes(tipo)) {
            return res.status(400).json({ message: "Tipo de reporte no válido" });
        }

        if (!motivo || motivo.trim() === "") {
            return res.status(400).json({ message: "Debe indicar un motivo" });
        }

        let publicacionId = null;

        if (tipo === "publicacion") {
            const publi = await Publi.findById(publicacion);
            if (!publi) return res.status(404).json({ message: "Publicación no encontrada" });
            publicacionId = publi._id;
        }

        if (tipo === "comentario") {
            const publi = await Publi.findOne({ "comentarios._id": comentario });
            if (!publi) return res.status(404).json({ message: "Comentario no encontrado" });

            publicacionId = publi._id;
        }

        const nuevoReporte = new Report({
            tipo,
            motivo,
            autor,
            publicacion: publicacionId,
            comentario: tipo === "comentario" ? comentario : undefined
        });

        await nuevoReporte.save();

        res.status(201).json({ message: "Reporte enviado con éxito", reporte: nuevoReporte });
    } catch (error) {
        console.error("Error al crear reporte:", error);
        res.status(500).json({ message: "Error al enviar reporte" });
    }
};

export const actualizarEstadoReporte = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        if (!["pendiente", "resuelto", "rechazado"].includes(estado)) {
            return res.status(400).json({ message: "Estado inválido" });
        }

        const reporte = await Report.findByIdAndUpdate(
            id,
            { estado },
            { new: true }
        );

        if (!reporte) {
            return res.status(404).json({ message: "Reporte no encontrado" });
        }

        res.status(200).json(reporte);
    } catch (error) {
        console.error("Error al actualizar el estado del reporte:", error);
        res.status(500).json({ message: "Error al actualizar estado del reporte" });
    }
};


export const obtenerReportesComentarios = async (req, res) => {
    try {
        // Buscar todos los reportes de tipo comentario
        const reportes = await Report.find({ tipo: "comentario" })
            .populate("autor", "username email") // quien reportó
            .populate("publicacion", "titulo comentarios"); // necesitamos los comentarios de la publicación

        // Para cada reporte, buscar el comentario dentro de la publicación
        const reportesConComentario = reportes.map((reporte) => {
            const publicacion = reporte.publicacion;
            const comentarioId = reporte.comentario?.toString();

            const comentario = publicacion?.comentarios?.find(
                (c) => c._id.toString() === comentarioId
            );

            return {
                _id: reporte._id,
                motivo: reporte.motivo,
                estado: reporte.estado,
                autor: reporte.autor,
                publicacion: {
                    _id: publicacion?._id,
                    titulo: publicacion?.titulo
                },
                comentario: comentario || null,
                fecha: reporte.fecha
            };
        });

        res.status(200).json(reportesConComentario);
    } catch (error) {
        console.error("Error al obtener reportes de comentarios:", error);
        res.status(500).json({ message: "Error al obtener los reportes de comentarios" });
    }
};

export const obtenerReportesPublicaciones = async (req, res) => {
    try {
        // Buscar todos los reportes de tipo publicación
        const reportes = await Report.find({ tipo: "publicacion" })
            .populate("autor", "username email") // quien reportó
            .populate("publicacion", "titulo descripcion imgURL"); // necesitamos el título de la publicación

        res.status(200).json(reportes);
    } catch (error) {
        console.error("Error al obtener reportes de publicaciones:", error);
        res.status(500).json({ message: "Error al obtener los reportes de publicaciones" });
    }
};

export const eliminarReporte = async (req, res) => {
    try {
        const { id } = req.params;

        const reporte = await Report.findByIdAndDelete(id);

        if (!reporte) {
            return res.status(404).json({ message: "Reporte no encontrado" });
        }

        res.status(200).json({ message: "Reporte eliminado con éxito" });
    } catch (error) {
        console.error("Error al eliminar reporte:", error);
        res.status(500).json({ message: "Error al eliminar reporte" });
    }
}