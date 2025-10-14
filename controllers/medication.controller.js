 import Medication from "../models/Medications.model.js";
import History from "../models/History.model.js";

// Create medication
export const createMedication = async (req, res) => {
  try {
    const med = await Medication.create(req.body);
    await History.create({
      userId: med.userId,
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

// Get all medications
export const getMedications = async (req, res) => {
  try {
    const meds = await Medication.find();
     res.status(200).json({
      message: "📦 All medications fetched successfully",
      data: meds,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update medication
export const updateMedication = async (req, res) => {
  try {
    const med = await Medication.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!med) return res.status(404).json({ message: "Medication not found" });

    await History.create({
      userId: med.userId,
      medicationId: med._id,
      action: "Medication updated",
    });
 res.status(200).json({
      message: "Medication updated successfully",
      data: med,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete medication
export const deleteMedication = async (req, res) => {
  try {
    const med = await Medication.findByIdAndDelete(req.params.id);
    if (!med) return res.status(404).json({ message: "Medication not found" });

    await History.create({
      userId: med.userId,
      medicationId: med._id,
      action: "Medication deleted",
    });

    res.status(200).json({ message: "Medication deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
