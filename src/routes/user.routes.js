import { Router } from "express";

const router=Router()

import { authRequired, isAdmin } from "../middlewares/validateToken.js";
import { createuser, obtenerUsuarios, eliminarUsuario, updateUser} from "../controllers/user.controllers.js";


router.post("/", [authRequired, isAdmin] , createuser)

//router.put("/update-profile", authRequired, updateUserProfile);
router.put("/petsos/admin/actualizar/usuario/:id",authRequired, isAdmin, updateUser)
router.get("/petsos/admin/usuarios", authRequired, isAdmin, obtenerUsuarios)
router.delete("/petsos/admin/eliminar/usuario/:id", authRequired, isAdmin, eliminarUsuario)



export default router;