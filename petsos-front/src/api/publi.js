import axios from "./axios.js"

export const crearPublicacion = async (publi) =>{
    return await axios.post ("/petsos/crearPubli", publi)
}