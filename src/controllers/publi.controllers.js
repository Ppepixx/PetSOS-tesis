import Publi from "../models/publi.model.js"

// Para poder mostrar las publicaciones

export const obternerPublis = async (req, res)=>{
    try{
        const publis = await Publi.find().populate("autor", "username email");

        if (publis){
            res.json({publis})
        }else{
            res.json({message: "No se encontraron publicaciones"})
        }
    } catch(error){
        return res.status(500).json({message:"Algo salió mal"})
    }
}

// Para poder crear las publicaciones

export const crearPubli = async (req, res) => {
    try {
        const { titulo, descripcion, tipo, ubicacion } = req.body;
        const autorId = req.user?.id;

        if (!autorId) {
            return res.status(401).json({ message: "No autorizado. Usuario no autenticado." });
        }

        const nuevaPubli = new Publi({
            titulo,
            descripcion,
            imgURL: req.file?.filename || "",
            autor: autorId,
            tipo,
            ubicacion: {
                comuna: ubicacion?.comuna,
                ciudad: ubicacion?.ciudad,
                region: ubicacion?.region
        }
        });

        const guardarPubli = await nuevaPubli.save();
        res.json(guardarPubli);
    } catch (error) {
        return res.status(500).json({ message: "La publicacion no se pudo crear" });
    }
};

export const actualizarPubli = async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedData = req.body;

        const publicacion = await Publi.findById(id);
        if (!publicacion) {
        return res.status(404).json({ message: "Publicación no encontrada" });
        }

        // Verificamos que el usuario autenticado sea el autor
        if (publicacion.autor.toString() !== req.user.id) {
        return res.status(403).json({ message: "No tienes permiso para actualizar esta publicación" });
        }

        // Actualizamos con los nuevos datos
        const publicacionActualizada = await Publi.findByIdAndUpdate(id, updatedData, {
        new: true, // Retorna el nuevo documento actualizado
        });

        res.status(200).json({
        message: "Publicación actualizada exitosamente",
        publicacion: publicacionActualizada,
        });

    } catch (error) {
        console.error("Error al actualizar la publicación:", error);
        return res.status(500).json({ message: "Error del servidor al actualizar la publicación" });
    }
};


export const eliminarPubli = async (req, res) => {
    try {
        const { id } = req.params; // Este es el _id de MongoDB

        const publicacion = await Publi.findById(id);
        if (!publicacion) {
        return res.status(404).json({ message: "Publicación no encontrada" });
        }

        // Verificamos que el usuario autenticado sea el autor
        if (publicacion.autor.toString() !== req.user.id) {
        return res.status(403).json({ message: "No tienes permiso para eliminar esta publicación" });
        }

        await publicacion.deleteOne();

        res.status(200).json({
        message: "Publicación eliminada exitosamente",
        publicacionEliminada: publicacion,
        });

    } catch (error) {
        console.error("Error al eliminar la publicación:", error);
        return res.status(500).json({ message: "Error del servidor al eliminar la publicación" });
    }
};