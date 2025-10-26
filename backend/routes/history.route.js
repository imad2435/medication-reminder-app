import express from 'express';
import { getHistory } from '../controllers/history.controller.js';
import { protect } from '../middleware/auth.middleware.js'; // <-- ADD THIS LINE

const router = express.Router();

// Now 'protect' is defined and can be used as middleware
router.get('/', protect, getHistory);

export default router;