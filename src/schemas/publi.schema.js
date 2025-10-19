import {z} from "zod";

export const publiSchema= z.object({

    titulo: z.string().min(1, "El título es obligatorio"),

    descripcion: z.string().min(1, "La descripción es obligatoria"),


    tipo: z.enum(["rescate", "adopcion", "perdida"], {
        errorMap: () => ({ message: "Debes seleccionar un tipo" }),
    }),

    'ubicacion.region': z.string().min(1, "La Región es obligatoria"),
    'ubicacion.comuna': z.string().min(1, "La Comuna es obligatoria"),

})

