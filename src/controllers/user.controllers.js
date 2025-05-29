import Usuario from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const createuser= (req,res)=>{
    res.json("Creando ususario")
}

export const updateUser = async(req, res)=>{
    try {
        //Campos que se actualizaran
        const camposUpdate=["username","contra", "email", "direccion"]
        const updates={};
        //Para cambiar el valor del arreglo campo para cada parametro.
        camposUpdate.forEach((campos)=>{
            if (req.body[campos]!==undefined){
                updates[campos]= req.body[campos];
            }
        });
        //crypt de la contraseña 
        if (updates.contra){
            const salt= 12;
            updates.contra=await bcrypt.hash(updates.contra, salt);
        }

        const user = await Usuario.findByIdAndUpdate(req.params.id, updates,{
            new:true,
        });
        if(!user) return res.status(404).json({message:"Usuario no encontrado"})
        res.json({message:"Usuario actualizado exitosamente"})
    } catch (error) {
        return res.status(500).json({message:"No se pudo actualizar"});
    }
};

export const deleteLastUser = async (req, res)=>{
    try {

        //Para poder buscar el ultimo ususario creado
        const LastUser = await Usuario.findOne().sort({createdAt: -1})

        //Mensaje para poder identificar si existe algun usuario registrado.
        if (!LastUser){
            return res.status(404).json({message:"No se encontró ningun usuario para eliminar"})
        }
        // Eliminar el último usuario
        const eliminado= await Usuario.deleteOne({_id: LastUser._id})

        //Verificar si la eliminación fue exitosa
        if (eliminado.deletedCount === 0) {
            return res.status(400).json({ message: "No se pudo eliminar el usuario" });
        }

        res.status(200).json({
            message: "Último usuario eliminado exitosamente",
            usuarioEliminado: {
                id: LastUser._id,
                username: LastUser.username,
                email: LastUser.email,
                createdAt: LastUser.createdAt,
                updatedAt: LastUser.updatedAt
            }
        });
    } catch (error) {
        console.error("Error al eliminar el último usuario:", error);
        res.status(500).json({ message: "Error al intentar eliminar el último usuario", error });
    }
}

export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        // Busca y elimina el usuario por ID
        const userFound = await Usuario.findByIdAndDelete(id);
        // Si no se encuentra el usuario, retorna un 404
        if (!userFound) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        // Envía la respuesta con información del usuario eliminado
        return res.status(200).json({
            message: "Usuario eliminado exitosamente",
            user: {
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                roles: userFound.roles,
            },
        });
    } catch (error) {
        // Captura errores y responde con un 500
        return res.status(500).json({ message: "El usuario no se pudo eliminar" });
    }
    
}
// controllers/user.controllers.js
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // id del usuario autenticado
        const camposUpdate = ["username", "email", "direccion", "telefono", "fechadnacimiento", "contra"];
        const updates = {};

        camposUpdate.forEach((campo) => {
            if (req.body[campo] !== undefined) {
                updates[campo] = req.body[campo];
            }
        });

        if (updates.contra) {
        const salt = 12;
        updates.contra = await bcrypt.hash(updates.contra, salt);
        }

        const user = await Usuario.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        res.json({ message: "Perfil actualizado correctamente", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar perfil" });
    }
};