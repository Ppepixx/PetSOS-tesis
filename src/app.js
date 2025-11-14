import express from "express"
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { crearRoles } from "./libs/initialSetup.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import publiRoutes from "./routes/publi.routes.js"
import notificationRoutes from "./routes/notification.routes.js";
import reportRoutes from "./routes/report.routes.js";
import statsRoutes from './routes/stats.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use("/api", notificationRoutes);
app.use("/api", reportRoutes)
app.use('/api', statsRoutes);
export default app;
