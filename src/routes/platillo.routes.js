import express from 'express';
import upload from '../middlewares/upload.js';
import {
  listarPlatillos,
  obtenerPlatillo,
  crearPlatillo,
  actualizarPlatillo,
  eliminarPlatillo,
  obtenerReportePlatillo,
  obtenerRecetarioCompleto
} from '../controllers/platillo.controller.js';

const router = express.Router();

router.get('/', listarPlatillos);
router.get('/reportes/:id', obtenerReportePlatillo);
router.get('/recetario-completo', obtenerRecetarioCompleto);
router.get('/:id', obtenerPlatillo);
router.post('/', upload.single('imagen'), crearPlatillo);
router.put('/:id', upload.single('imagen'), actualizarPlatillo)
router.delete('/:id', eliminarPlatillo);



export default router;
