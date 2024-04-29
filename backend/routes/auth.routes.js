import express from 'express';
import AuthController from '../controllers/authcontroller.js';

const router = express.Router();

// Signup route
router.post('/signup', AuthController.signup);

// Login route
router.post('/login', AuthController.login);

// Logout route
router.post('/logout', AuthController.logout);


export default router;