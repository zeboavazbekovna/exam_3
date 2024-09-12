import express from 'express';
import categoryRoutes from './category.routes.js'; 
import customerRoutes from './customer.routes.js'; 
import productRoutes from './product.routes.js'; 
import orderRoutes from './order.routes.js';
import adminRoutes from './admin.routes.js';
import paymentRoutes from '../routes/payment.routes.js';
import authRoutes from './auth.routes.js';

const router = express.Router();


router.use('/categories', categoryRoutes); 
router.use('/customers', customerRoutes); 
router.use('/products', productRoutes);   
router.use('/orders', orderRoutes);  
router.use('/admin', adminRoutes);  
router.use('/payments', paymentRoutes);  
router.use('/auth', authRoutes);
  

router.all('*', (req, res) => {
    res.status(404).json({ message: `Given URL: ${req.originalUrl} is not defined` });
});

export default router;
