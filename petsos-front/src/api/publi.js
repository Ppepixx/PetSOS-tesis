import axios from "./axios"; 

export const crearPublicacion = (formData) =>
    axios.post("/petsos/crearPubli", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const eliminarPublicacion = async (id) =>{
    return await axios.delete(`/petsos/eliminar/${id}/publi`)
}

export const actualizarPublicacion = async (id, updatedData)=>{
    return await axios.put(`/petsos/actualizar/${id}/publi`, updatedData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    })
}


export const obtenerMisPublicaciones = async () => {
    return await axios.get("/petsos/mis-publicaciones");
};

export const likePublicacion = async (publiId) => {
    return await axios.put(`/petsos/like/publi/${publiId}`);
}

export const getUbicacionesRequest = () => axios.get(`/ubicaciones`);

export const eliminarPubliAdminRequest = (id) => axios.delete(`/publis/admin/${id}`);

export const getStatsComunasRequest = () => axios.get(`/publis/stats/lost-by-commune`);
