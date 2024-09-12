import express from 'express';
import categoryController from '../controllers/category.controller.js';

const router = express.Router();

router.post('/', categoryController.create);
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getOne);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

export default router;
