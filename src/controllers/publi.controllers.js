import Publi from "../models/publi.model.js"
import Notificacion from "../models/notification.model.js";


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

        if (req.file){
            updatedData.imgURL = [req.file.filename]
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
        const { id } = req.params; 

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

export const agregarComentario = async (req, res) => {
    try {
    const { texto } = req.body;
    const publicacionId = req.params.id;
    const autorId = req.user?.id;

    if (!autorId) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const publicacion = await Publi.findById(publicacionId).populate("autor");

    if (!publicacion) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    // Añadir comentario
    publicacion.comentarios.push({ autor: autorId, texto });
    await publicacion.save();

    // Crear notificación automática solo si el autor del comentario no es el mismo que el autor de la publicación
    if (String(autorId) !== String(publicacion.autor._id)) {
      const nuevaNotificacion = new Notificacion({
        receptor: publicacion.autor._id,
        emisor: autorId,
        mensaje: 'Han comentado tu publicación.',
        link: `/perfil`
      });

      await nuevaNotificacion.save();
    }

    const publicacionActualizada = await Publi.findById(publicacionId)
      .populate("comentarios.autor", "username");

    res.json(publicacionActualizada);
  } catch (error) {
    console.error("Error al agregar comentario:", error);
    res.status(500).json({ message: "Error al agregar comentario" });
  }
};

export const obtenerPublisPorUsuario = async (req, res) => {
    try {
        const autorId = req.user.id
        const publicaciones = await Publi.find({ autor: autorId }).sort({ f_creacion: -1 });

        res.status(200).json(publicaciones);
    } catch (error) {
        console.error("Error al obtener publicaciones del usuario:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};


// Obtener todas las notificaciones del usuario autenticado
export const obtenerNotificacion = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const notificaciones = await Notificacion.find({ receptor: userId })
      .populate("emisor", "username")
      .sort({ fecha: -1 });

    res.status(200).json(notificaciones);
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    res.status(500).json({ message: "Error al obtener notificaciones" });
  }
};

// Eliminar una notificación del usuario autenticado
export const eliminarNotificacion = async (req, res) => {
  try {
    const notiId = req.params.id;

    const notificacion = await Notificacion.findById(notiId);

    if (!notificacion) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }

    await Notificacion.findByIdAndDelete(notiId);

    res.status(200).json({ message: "Notificación eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar notificación:", error);
    res.status(500).json({ message: "Error al eliminar notificación" });
  }
};



