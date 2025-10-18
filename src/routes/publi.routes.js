import { Router } from "express";
import upload from "../multerConfig.js"
import {getUbicaciones} from '../controllers/ubi.controllers.js'; // Importar el nuevo controlador
import {authRequired} from "../middlewares/validateToken.js";
import { obternerPublis, crearPubli, agregarComentario, eliminarPubli, actualizarPubli, obtenerPublisPorUsuario, likeaLaPublicación } from "../controllers/publi.controllers.js";

const router= Router()

router.get("/petsos/publis", authRequired, obternerPublis)
router.post("/petsos/crearPubli", authRequired, upload.single("imgURL"), crearPubli)
router.post("/petsos/publis/:id/comentarios", authRequired, agregarComentario)
router.put("/petsos/actualizar/:id/publi", authRequired, upload.single("imgURL"), actualizarPubli )
router.delete("/petsos/eliminar/:id/publi", authRequired, eliminarPubli)

router.get("/petsos/mis-publicaciones", authRequired, obtenerPublisPorUsuario)

// Ruta para obtener las ubicaciones
router.get("/ubicaciones", getUbicaciones);

router.put("/petsos/like/publi/:id", authRequired, likeaLaPublicación)

export default router