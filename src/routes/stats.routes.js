import { Router } from 'express';
// Importamos la función de tu controlador
import { getPublicacionesPorComuna, getPublicacionesPorTipo } from '../controllers/stats.controllers.js';
import { authRequired, isAdmin } from '../middlewares/validateToken.js';

const router = Router();

// Cuando alguien llame a esta URL, ejecutará tu función
router.get(
  '/stats/publicaciones-por-comuna',
  authRequired,
  isAdmin,
  getPublicacionesPorComuna
);

router.get(
  '/stats/publicaciones-por-tipo',
  authRequired,
  isAdmin,
  getPublicacionesPorTipo
);

export default router;