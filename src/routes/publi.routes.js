import { Router } from "express";
import upload from "../multerConfig.js"
import { authRequired} from "../middlewares/validateToken.js";
import { obternerPublis, crearPubli } from "../controllers/publi.controllers.js";

const router= Router()

router.get("/petsos/publis", authRequired, obternerPublis)
router.post("/petsos/crearPubli", authRequired, upload.single("imgURL"), crearPubli);


export default router