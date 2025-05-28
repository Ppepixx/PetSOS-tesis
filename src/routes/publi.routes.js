import { Router } from "express";
import { authRequired} from "../middlewares/validateToken.js";
import { obternerPublis, crearPubli } from "../controllers/publi.controllers.js";

const router= Router()

router.get("/petsos/publis", authRequired, obternerPublis)
router.post("/petsos/crearpubli", authRequired, crearPubli)


export default router