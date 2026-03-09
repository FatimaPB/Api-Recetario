import { Router } from 'express';
import {
  listarPorPlatillo,
  crear,
  actualizar,
  eliminar
} from '../controllers/platilloOpcional.controller.js';

const router = Router();

router.get('/:id', listarPorPlatillo);
router.post('/', crear);
router.put('/', actualizar);
router.delete('/:principal/:opcional', eliminar);

export default router;
