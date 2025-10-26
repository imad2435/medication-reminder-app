import express from "express";
import { protect } from "../middleware/auth.middleware.js"; // <-- Make sure this is imported
import { 
  createReminder, 
  getReminders, 
  updateReminder, 
  deleteReminder 
} from "../controllers/reminder.controller.js";

const router = express.Router();

// This line applies the 'protect' middleware to ALL subsequent routes in this file
router.use(protect);

// Now all these routes are protected
router.post('/', createReminder);
router.get('/', getReminders);
router.put('/:id', updateReminder);
router.delete('/:id', deleteReminder);

export default router;