import { Router } from "express";

const router=Router()

import { authRequired, isAdmin } from "../middlewares/validateToken.js";
import { createuser, deleteLastUser, eliminarUsuario, updateUser } from "../controllers/user.controllers.js";


router.post("/", [authRequired, isAdmin] , createuser)
//router.put("/update-profile", authRequired, updateUserProfile);
router.put("/updateuser/:id",authRequired, isAdmin, updateUser)
router.delete("/deleteUser/:id", authRequired, isAdmin, eliminarUsuario)
router.delete("/deleteLastUser", authRequired, isAdmin, deleteLastUser)

export default router;