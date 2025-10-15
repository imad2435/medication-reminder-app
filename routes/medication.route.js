import express from "express";
import { createMedication,updateMedication,deleteMedication,getMedications } from "../controllers/medication.controller.js";
const router = express.Router();
router.post("/",createMedication);
router.get("/",getMedications);
router.put("/:id", updateMedication);
router.delete("/:id",deleteMedication);
export default router;