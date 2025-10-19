import Medication from "../models/Medications.model.js";
import History from "../models/History.model.js";

// Create medication
export const createMedication = async (req, res) => {
  try {
    // Combine request body with the logged-in user's ID
    const medicationData = { ...req.body, userId: req.user.id }; // <-- CHANGE
    const med = await Medication.create(medicationData);

    await History.create({
      userId: req.user.id, // <-- CHANGE
      medicationId: med._id,
      action: "Medication created",
    });
    res.status(201).json({
      message: "Medication created successfully",
      data: med,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all medications FOR THE LOGGED-IN USER
export const getMedications = async (req, res) => {
  try {
    // Find only the medications that belong to the logged-in user
    const meds = await Medication.find({ userId: req.user.id }); // <-- CHANGE
    res.status(200).json({
      message: `📦 ${meds.length} medications fetched successfully`,
      data: meds,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update medication
export const updateMedication = async (req, res) => {
  try {
    const med = await Medication.findById(req.params.id); // <-- Find first

    if (!med) {
      return res.status(404).json({ message: "Medication not found" });
    }

    // Check if the medication belongs to the user trying to update it
    if (med.userId.toString() !== req.user.id) { // <-- SECURITY CHECK
      return res.status(401).json({ message: "User not authorized" });
    }

    const updatedMed = await Medication.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    await History.create({
      userId: req.user.id,
      medicationId: updatedMed._id,
      action: "Medication updated",
    });
    res.status(200).json({
      message: "Medication updated successfully",
      data: updatedMed,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete medication
export const deleteMedication = async (req, res) => {
  try {
    const med = await Medication.findById(req.params.id); // <-- Find first

    if (!med) {
      return res.status(404).json({ message: "Medication not found" });
    }

    // Check if the medication belongs to the user trying to delete it
    if (med.userId.toString() !== req.user.id) { // <-- SECURITY CHECK
      return res.status(401).json({ message: "User not authorized" });
    }

    await Medication.findByIdAndDelete(req.params.id);

    await History.create({
      userId: req.user.id,
      medicationId: med._id,
      action: "Medication deleted",
    });

    res.status(200).json({ message: "Medication deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};