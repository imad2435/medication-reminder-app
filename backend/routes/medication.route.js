import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import {
  createMedication,
  getMedications,
  getMedicationById, // <-- Import new function
  updateMedication,
  deleteMedication,
  logMedicationStatus // <-- Import new function
} from "../controllers/medication.controller.js";

const router = express.Router();

// Apply protect middleware to all routes
router.use(protect);

router.route('/')
  .post(createMedication)
  .get(getMedications);

router.route('/:id')
  .get(getMedicationById) // <-- Add route to get single medication
  .put(updateMedication)
  .delete(deleteMedication);

router.post('/:id/log', logMedicationStatus); // <-- Add route to log status

export default router;