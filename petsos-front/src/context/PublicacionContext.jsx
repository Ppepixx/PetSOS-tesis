import { createContext, useContext, useState } from "react";
import { crearPublicacion } from "../api/publi";

const PubliContext= createContext()

export const usePubli= ()=>{
    const context = useContext(PubliContext)

    if (!context){
        throw new Error("usePubli solo se puede usar dentro del PubliProvider")
    }

    return context
}

export function PubliProvider({children}){
    const [publis, setPublis]= useState([])

    const crearPubli = async (publi) => {
        try {
            const formData = new FormData();
            formData.append("titulo", publi.titulo);
            formData.append("descripcion", publi.descripcion);
            formData.append("imgURL", publi.imgURL[0]); // importante: [0] para tomar el archivo
            formData.append("tipo", publi.tipo);

            formData.append("ubicacion[region]", publi.ubicacion.region);
            formData.append("ubicacion[ciudad]", publi.ubicacion.ciudad);
            formData.append("ubicacion[comuna]", publi.ubicacion.comuna);

            const response = await crearPublicacion(formData);
            setPublis([...publis, response.data]);
        } catch (error) {
            console.error("Error al crear la publicación:", error);
        }
    };

    return (
        <PubliContext.Provider value={{ 
            publis, 
            crearPubli,
        }}>
            {children}
        </PubliContext.Provider>
    );
}