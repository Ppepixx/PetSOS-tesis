import express from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { obtenerNotificacion , eliminarNotificacion , } from '../controllers/publi.controllers.js';


const router = express.Router();

router.get('/petsos/vernoti', authRequired, 
    obtenerNotificacion
);
// Eliminar una notificación individual (solo si pertenece al usuario)
router.delete('/petsos/eliminarNoti/:id', eliminarNotificacion);

export default router;