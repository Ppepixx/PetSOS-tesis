import {z} from "zod";

export const publiSchema= z.object({

    titulo: z.string().min(1, "El título es obligatorio"),

    descripcion: z.string().min(1, "La descripción es obligatoria"),

    imgURL: z.any().refine((file) => file?.length > 0, {
        message: "Debes subir una imagen",
    }),

    tipo: z.enum(["rescate", "adopcion", "perdida"], {
        errorMap: () => ({ message: "Debes seleccionar un tipo" }),
    }),

    ubicacion: z.object({
        region: z.string().min(1, "La Región es obligatoria"),
        comuna: z.string().min(1, "La Comuna es obligatoria"),
    }),

})