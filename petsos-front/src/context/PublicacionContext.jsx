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

    const crearPubli = async (publi)=>{
        try {
            const response = await crearPublicacion(publi)
            setPublis([...publis, response.data])
        } catch (error) {
            console.error("Error al crear el producto:", error)
        }
    }

    return (
        <PubliContext.Provider value={{ 
            publis, 
            crearPubli,
        }}>
            {children}
        </PubliContext.Provider>
    );
}