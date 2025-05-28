import express from "express"
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import { crearRoles } from "./libs/initialSetup.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import publiRoutes from "./routes/publi.routes.js"

const app = express()
crearRoles();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",publiRoutes)

export default app;
