import express from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { obtenerNotificacion , } from '../controllers/publi.controllers.js';


const router = express.Router();

router.get('/petsos/vernoti', authRequired, 
    obtenerNotificacion
);

export default router;