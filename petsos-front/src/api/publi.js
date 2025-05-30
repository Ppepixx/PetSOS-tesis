import axios from "./axios"; 

export const crearPublicacion = (formData) =>
    axios.post("/petsos/crearPubli", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });