import express from 'express'; // <-- Need to import express
import { protect } from '../middleware/auth.middleware.js'; // <-- 1. IMPORT THE MIDDLEWARE

import {
  createMedication,
  getMedications,
  updateMedication,
  deleteMedication
} from "../controllers/medication.controller.js"; // <-- Import named exports, add .js

const router = express.Router();

router.post("/", protect, createMedication);
router.get("/", protect ,getMedications);
router.put("/:id", protect, updateMedication);
router.delete("/:id", protect, deleteMedication);

export default router;