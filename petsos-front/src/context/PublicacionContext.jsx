import { createContext, useContext, useState } from "react";
import { actualizarPublicacion, crearPublicacion, eliminarPublicacion } from "../api/publi";

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

    {/* --- INICIO DE LA MODIFICACIÓN --- */}
    {/* El argumento 'publi' que llega aquí YA ES el FormData desde la página */}
    const crearPubli = async (publi) => {
        try {
            // Ya no creamos un FormData, solo lo pasamos a la API.
            // También eliminamos la línea de "ciudad".
            const response = await crearPublicacion(publi); 
            setPublis([...publis, response.data]);
        } catch (error) {
            console.error("Error al crear la publicación:", error);
            // Re-lanzamos el error para que la página muestre el toast de error
            throw error; 
        }
    };
    {/* --- FIN DE LA MODIFICACIÓN --- */}

    const eliminarPubli = async (publi) =>{
        try {
            const res= await eliminarPublicacion(publi._id)
            if (res.status==200) {
                setPublis(publis.filter((p)=> p._id !== publi._id))
            }
        } catch (error) {
            console.error("Error al eliminar la publicación", error)
        }
    }

    const actualizarPubli = async (publi, updatedData) =>{
        try {
            console.log("Publi recibido:", publi)
            if (!publi || !publi._id) {
                console.error("ID de la publicación es inválido:", publi)
                return
            }
            const res= await actualizarPublicacion(publi._id, updatedData)
            if (res.status==200) {
                const updatedPubli = res.data.publicacion

                setPublis((prevPublis)=>
                    prevPublis.map((p) =>
                        p._id === publi._id ? updatedPubli : p
                    )
                )
                console.log("Publicación actualizada con éxito", updatedPubli)
            } else {
                console.error("No se pudo actualizar la publicación. Codigo de estado:", res.status)
            }
        } catch (error) {
            console.error("Error al actualizar la publicación", error.message)
        }
    }

    return (
        <PubliContext.Provider value={{ 
            publis, 
            crearPubli,
            eliminarPubli,
            actualizarPubli
        }}>
            {children}
        </PubliContext.Provider>
    );
}