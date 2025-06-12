import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  receptor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  emisor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  mensaje: { type: String, required: true },
  link: { type: String }, // opcional, ej: `/publicaciones/:id`
  leido: { type: Boolean, default: false },
  fecha: { type: Date, default: Date.now }
});

export default mongoose.model("Notificacion", notificationSchema);