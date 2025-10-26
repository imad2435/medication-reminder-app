import Reminder from "../models/Reminder.model.js";
import moment from "moment-timezone";
// @desc    Create a reminder for the logged-in user
// @route   POST /api/reminders
// @access  Private
export const createReminder = async (req, res) => {
  try {
    const { message, remindAt } = req.body;
    const userId = req.user.id; 
    const remindAtUTC = moment.tz(remindAt, "YYYY-MM-DD HH:mm", "Asia/Karachi").toDate();
    const newReminder = await Reminder.create({ userId, message, remindAt: remindAtUTC });
    res.status(201).json({ success: true, data: newReminder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get all reminders for the logged-in user
// @route   GET /api/reminders
// @access  Private
export const getReminders = async (req, res) => {
  try {
    // Find reminders ONLY for the logged-in user
    const reminders = await Reminder.find({ userId: req.user.id });
    res.status(200).json({ success: true, data: reminders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update a specific reminder
// @route   PUT /api/reminders/:id
// @access  Private
export const updateReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);

    if (!reminder) {
      return res.status(404).json({ success: false, error: "Reminder not found" });
    }
    
    // Security check: ensure the reminder belongs to the user
    if (reminder.userId.toString() !== req.user.id) {
        return res.status(401).json({ success: false, error: "User not authorized" });
    }

    const updatedReminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updatedReminder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Delete a specific reminder
// @route   DELETE /api/reminders/:id
// @access  Private
export const deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);

    if (!reminder) {
      return res.status(404).json({ success: false, error: "Reminder not found" });
    }
    
    // Security check
    if (reminder.userId.toString() !== req.user.id) {
        return res.status(401).json({ success: false, error: "User not authorized" });
    }

    await Reminder.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error)
 {
    res.status(500).json({ success: false, error: error.message });
  }
};