import express from 'express';
import PaymentController from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/', PaymentController.createPayment);
router.get('/', PaymentController.getAllPayments);
router.get('/:id', PaymentController.getPayment);
router.put('/:id', PaymentController.updatePayment);
router.delete('/:id', PaymentController.deletePayment);

export default router;
