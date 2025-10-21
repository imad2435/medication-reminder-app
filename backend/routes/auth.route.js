import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

// Route for user registration
// This will listen for POST requests at http://<your-server>/api/auth/register
router.post('/register', registerUser);
router.post('/login', loginUser)

export default router;