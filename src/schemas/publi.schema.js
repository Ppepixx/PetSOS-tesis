import {z} from "zod";

export const publiSchema= z.object({

    titulo: z.string({
        required_error:"El titulo es requerido"
    }),

    descripcion: z.object({
        required_error:"La descripción es requerida"
    }),

    imgURL: z.object({
        required_error:"La imagen es requerida"
    }),

    tipo: z.object({
        required_error:"El tipo de publicación es requerido"
    }),

    ubicacion: z.object({
        required_error:"La ubicacion es requerida"
    }) 




})