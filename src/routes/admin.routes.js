import express from 'express';
import adminController from '../controllers/admin.controller.js';
import { isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.post('/',  isAdmin , adminController.createProduct);
router.get('/',  isAdmin , adminController.getAllProducts);
router.get('/:id',  isAdmin , adminController.getProduct);
router.put('/:id',  isAdmin , adminController.updateProduct);
router.delete('/:id',  isAdmin , adminController.deleteProduct);

export default router;
