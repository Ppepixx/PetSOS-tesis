import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({

    tipo: {
        type: String,
        enum: ["publicacion", "comentario"],
        required: true
    },
    motivo: {
        type: String,
        required: true,
        trim: true
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    publicacion:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publi",
        required: true
    },
    comentario: {
        type: mongoose.Schema.Types.ObjectId
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    estado:{
        type: String,
        enum: ["pendiente", "resuelto", "rechazado"],
        default: "pendiente"
    }
})

export default mongoose.model("Report", reportSchema);