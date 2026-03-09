import express from 'express';
import {
  listarIngredientes,
  obtenerIngrediente,
  crearIngrediente,
  actualizarIngrediente,
  eliminarIngrediente
} from '../controllers/ingrediente.controller.js';

const router = express.Router();

router.get('/', listarIngredientes);
router.get('/:id', obtenerIngrediente);
router.post('/', crearIngrediente);
router.put('/:id', actualizarIngrediente);
router.delete('/:id', eliminarIngrediente);

export default router;
