import Reminder from "../models/Reminder.model.js";
export const createReminder = async (req, res) => {
  try {
    const { userId, message, remindAt } = req.body;
    const reminder = new Reminder({
      userId,
      message,
      remindAt,
    });
    await reminder.save();
    res.status(201).json({
      success: true,
      reminder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json({
      success: true,
      reminders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const updateReminder = async (req, res) => {
  try {
    const reminderId = req.params.id;
    const updates = req.body;
    const updateReminder = await Reminder.findByIdAndUpdate(
      reminderId,
      updates,
      { new: true }
    );
    if (!updateReminder) {
      return res.status(404).json({
        success: false,
        message: "Reminder not found",
      });
    }
    res.status(200).json({
      success: true,
      reminder: updateReminder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const deleteReminder = async (req, res) => {
  try {
    const reminderId = req.params.id;
    const deleteReminder = await Reminder.findByIdAndDelete(reminderId);
    if (!deleteReminder) {
      return res.status(404).json({
        success: false,
        message: "Reminder not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Reminder deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
