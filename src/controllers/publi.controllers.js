import Publi from "../models/publi.model.js"
import Notificacion from "../models/notification.model.js";


// Para poder mostrar las publicaciones
export const obternerPublis = async (req, res) => {
  try {
    const publis = await Publi.find()
      .populate("autor", "username telefono email")
      .populate("comentarios.autor", "username email");

    if (publis && publis.length > 0) {
      res.json({ publis });
    } else {
      res.json({ message: "No se encontraron publicaciones" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};


// Crear publicación
export const crearPubli = async (req, res) => {
  try {
    // 1. Extrae los campos normales
    const { titulo, descripcion, tipo } = req.body;
    
    // 2. EXTRAE LOS CAMPOS "PLANOS" DE UBICACION (así es como FormData los envía)
    const region = req.body['ubicacion.region'];
    const comuna = req.body['ubicacion.comuna'];

    const autorId = req.user?.id;

    if (!autorId) {
      return res.status(401).json({ message: "No autorizado. Usuario no autenticado." });
    }

    // 3. VALIDA las nuevas variables 'region' y 'comuna'
    if (!region || !comuna) {
      return res.status(400).json({ message: "Debe seleccionar región y comuna." });
    }

    const nuevaPubli = new Publi({
      titulo,
      descripcion,
      imgURL: req.file ? [req.file.filename] : [], // Esto está perfecto
      autor: autorId,
      tipo,
      // 4. CONSTRUYE el objeto 'ubicacion' para guardar en el modelo
      ubicacion: {
        comuna: comuna,
        region: region,
      }
    });

    const guardarPubli = await nuevaPubli.save();
    res.json(guardarPubli);
  } catch (error) {
    console.error("Error al crear la publicación:", error);
    return res.status(500).json({ message: "La publicación no se pudo crear" });
  }
};


// Actualizar publicación
export const actualizarPubli = async (req, res) => {
  try {
    const { id } = req.params; 
    const updatedData = req.body;

    const publicacion = await Publi.findById(id);
    if (!publicacion) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    // Validamos los campos planos si es que vienen en el body
    const region = updatedData['ubicacion.region'];
    const comuna = updatedData['ubicacion.comuna'];

    // Si el usuario está intentando actualizar la ubicación (envió al menos un campo de ubicación)
    // nos aseguramos que haya enviado ambos.
    if (region !== undefined || comuna !== undefined) {
      if (!region || !comuna) {
        return res.status(400).json({ message: "Debe especificar región y comuna válidas." });
      }
    }

    if (req.file) {
      updatedData.imgURL = [req.file.filename];
    }

    const publicacionActualizada = await Publi.findByIdAndUpdate(id, updatedData, {
      new: true,
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


// Eliminar publicación
export const eliminarPubli = async (req, res) => {
  try {
    const { id } = req.params; 

    const publicacion = await Publi.findById(id);
    if (!publicacion) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

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


// Agregar comentario
export const agregarComentario = async (req, res) => {
  try {
    const { texto } = req.body;
    const publicacionId = req.params.id;
    const autorId = req.user?.id;

    if (!autorId) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const publicacion = await Publi.findById(publicacionId).populate("autor", "username");
    if (!publicacion) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    publicacion.comentarios.push({ autor: autorId, texto });
    await publicacion.save();

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


// Publicaciones por usuario
export const obtenerPublisPorUsuario = async (req, res) => {
  try {
    const autorId = req.user.id;
    const publicaciones = await Publi.find({ autor: autorId }).sort({ f_creacion: -1 });

    res.status(200).json(publicaciones);
  } catch (error) {
    console.error("Error al obtener publicaciones del usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};


// Notificaciones
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


// Likes
export const likeaLaPublicación = async (req, res) => {
  try {
    const publiId = req.params.id;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const publi = await Publi.findById(publiId);
    if (!publi) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    const index = publi.likes.indexOf(userId);
    if (index === -1) {
      publi.likes.push(userId);
    } else {
      publi.likes.splice(index, 1);
    }

    await publi.save();
    res.status(200).json({ publicacion: publi });
  } catch (error) {
    console.error("Error en toggle like:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};



