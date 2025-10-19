import express from "express";
import { createReminder, updateReminder, deleteReminder ,getReminders } from "../controller/Reminder.conroller.js";
const router= express.Router();
router.post('/create',createReminder);
router.get('/get', getReminders);
router.put('/update/:id', updateReminder);
router.delete('/delete/:id',deleteReminder)
export default router;