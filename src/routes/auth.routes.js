// src/routes/auth.routes.js

import express from 'express';
import AuthController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', AuthController.registerUser);

router.post('/verify-otp', AuthController.verifyOtp);

router.post('/login', AuthController.loginUser);

router.post('/change-password', AuthController.changePassword);

router.get('/users', AuthController.getAllUsers);
router.get('/users/:id', AuthController.getUserById);

router.delete('/users/:id', AuthController.deleteUser);

export default router;
