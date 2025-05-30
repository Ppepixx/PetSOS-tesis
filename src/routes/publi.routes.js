import { Router } from "express";
import upload from "../multerConfig.js"
import { authRequired} from "../middlewares/validateToken.js";
import { obternerPublis, crearPubli, agregarComentario } from "../controllers/publi.controllers.js";

const router= Router()

router.get("/petsos/publis", authRequired, obternerPublis)
router.post("/petsos/crearPubli", authRequired, upload.single("imgURL"), crearPubli);
router.post("/petsos/publis/:id/comentarios", authRequired, agregarComentario);


export default router