import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // 👈 Esto carga las variables del archivo .env

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
};