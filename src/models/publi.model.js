import mongoose from "mongoose";

const publiSchema = new mongoose.Schema({

    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imgURL: {
        type: [String],
        required: true
    },
    f_creacion: {
        type: Date,
        default: Date.now
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    tipo: {
        type: String,
        enum: ["perdida", "adopcion", "rescate"],
        required: true
    },
    ubicacion: {
        comuna: String,
        ciudad: String,
        region: String,
    },
    comentarios: [{
        autor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario"
        },
        texto: String,
        fecha: {
            type: Date,
            default: Date.now
        }
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
    estado: {
        type: String,
        enum: ['activo', 'resuelto', 'eliminado'],
        default: 'activo'
    }
})

export default mongoose.model("Publi",publiSchema)