import express from 'express';
import customerController from '../controllers/customer.controller.js'; 

const router = express.Router();

router
  .get('/', customerController.getAll)
  .get('/:id', customerController.getOne)
  .post('/', customerController.create)
  .delete('/:id', customerController.delete)
  .put('/:id', customerController.update);

export default router;
