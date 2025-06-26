import Usuario from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const createuser= (req,res)=>{
    res.json("Creando ususario")
}

export const updateUser = async(req, res)=>{
    try {
        //Campos que se actualizaran
        const camposUpdate=["username", "email", "direccion", "telefono", "fechadnacimiento", "roles"];
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
        const camposUpdate = ["username", "email", "direccion", "telefono", "fechadnacimiento"];
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

export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select("-contra");
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};
