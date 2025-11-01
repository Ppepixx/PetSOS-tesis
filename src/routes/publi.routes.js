import { Router } from "express";
import upload from "../multerConfig.js"
import {getUbicaciones} from '../controllers/ubi.controllers.js'; // Importar el nuevo controlador
import {authRequired, isAdmin} from "../middlewares/validateToken.js";

import { obternerPublis, crearPubli, agregarComentario, eliminarPubli, actualizarPubli, obtenerPublisPorUsuario, likeaLaPublicación, eliminarPubliAdmin, eliminarComentarioAdmin } from "../controllers/publi.controllers.js";
import { getStatsLostPetsByCommune } from "../controllers/stats.controllers.js";
const router= Router()

router.get("/petsos/publis", authRequired, obternerPublis)
router.post("/petsos/crearPubli", authRequired, upload.single("imgURL"), crearPubli)
router.post("/petsos/publis/:id/comentarios", authRequired, agregarComentario)
router.put("/petsos/actualizar/:id/publi", authRequired, upload.single("imgURL"), actualizarPubli )
router.delete("/petsos/eliminar/:id/publi", authRequired, eliminarPubli)

router.get("/petsos/mis-publicaciones", authRequired, obtenerPublisPorUsuario)

router.get("/ubicaciones", getUbicaciones);// Ruta para obtener las ubicaciones

router.get("/publis/stats/lost-by-commune", authRequired, isAdmin, getStatsLostPetsByCommune);

router.put("/petsos/like/publi/:id", authRequired, likeaLaPublicación)

router.delete("/publis/admin/:id", authRequired, isAdmin, eliminarPubliAdmin); // Protegida por auth y rol admin

router.delete("/publis/admin/:id", authRequired, isAdmin, eliminarComentarioAdmin); // Protegida por auth y rol admin


export default router