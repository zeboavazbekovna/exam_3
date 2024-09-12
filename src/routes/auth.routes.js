import express from 'express';
import { registerUser, loginUser, changePassword } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password', changePassword);

export default router;
