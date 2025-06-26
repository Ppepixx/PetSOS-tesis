import axios from "./axios";

export const obtenerUsuarios = async () => {
    try {
        const response = await axios.get("/petsos/admin/usuarios");
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
}

export const eliminarUsuario = async (id) => {
    try {
        const response = await axios.delete(`/petsos/admin/eliminar/usuario/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        throw error;
    }
}

export const actualizarUsuario = async (id, updatedData) => {
    try {
        const response = await axios.put(`/petsos/admin/actualizar/usuario/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        throw error;
    }
}