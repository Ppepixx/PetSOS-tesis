import {Router} from 'express'; 
import {isAdmin} from '../middlewares/validateToken.js';
const router = Router();
import {authRequired} from "../middlewares/validateToken.js";
import {actualizarEstadoReporte, crearReporte, obtenerReportesComentarios, obtenerReportesPublicaciones, eliminarReporte} from '../controllers/report.controllers.js';

router.put("/petsos/admin/reportes/:id", authRequired, isAdmin, actualizarEstadoReporte)
router.post("/petsos/reportes", authRequired, crearReporte)
router.get("/petsos/admin/reportes-comentarios", authRequired, isAdmin, obtenerReportesComentarios)
router.get("/petsos/admin/reportes-publicaciones", authRequired, isAdmin, obtenerReportesPublicaciones)
router.delete("/petsos/admin/eliminar/reportes/:id", authRequired, isAdmin, eliminarReporte)
export default router;