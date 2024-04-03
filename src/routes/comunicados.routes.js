import { Router } from "express";

import { 
        obtenerComunicados, 
        obtenerComunicado, 
        crearComunicado, 
        actualizarComunicado, 
        eliminarComunicado 
    } 
from "../controllers/comunicado.controller.js"

const router = Router();

router.get("/comunicados", obtenerComunicados)

router.get("/comunicados/:id", obtenerComunicado)

router.post("/comunicados", crearComunicado)

// Actualiza total o parcialmente un registro 
router.patch("/comunicados/:id", actualizarComunicado)

router.delete("/comunicados/:id", eliminarComunicado)

export default router;
// import { comunicadosRoutes } from './routes/comunicados.routes.js'
