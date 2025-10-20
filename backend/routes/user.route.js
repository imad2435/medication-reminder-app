import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Both routes will be protected by the 'protect' middleware.
// A user must be logged in to access their own profile.

// Route to get and update the user's profile
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;