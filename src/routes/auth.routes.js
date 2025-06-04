import { Router } from "express";
import { login, register, logout, profile, verifyToken, updateProfile } from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";


const router= Router();

router.post("/petsos/register", validateSchema(registerSchema), register);
router.post("/petsos/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify",verifyToken);
router.get("/profile",authRequired, profile);
router.put('/update', authRequired, updateProfile);

export default router;