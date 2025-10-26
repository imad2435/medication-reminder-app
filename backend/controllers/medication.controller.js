import Medication from "../models/Medications.model.js";
import History from "../models/History.model.js";

// Standardized responses for consistency
export const createMedication = async (req, res) => {
  try {
    const med = await Medication.create({ ...req.body, userId: req.user.id });
    await History.create({ userId: req.user.id, medicationId: med._id, action: "Medication created" });
    res.status(201).json({ success: true, data: med });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getMedications = async (req, res) => {
  try {
    const meds = await Medication.find({ userId: req.user.id });
    res.status(200).json({ success: true, data: meds });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// --- NEW --- Get a single medication by ID
export const getMedicationById = async (req, res) => {
  try {
    const med = await Medication.findById(req.params.id);
    if (!med) return res.status(404).json({ success: false, error: "Medication not found" });
    if (med.userId.toString() !== req.user.id) return res.status(401).json({ success: false, error: "User not authorized" });
    res.status(200).json({ success: true, data: med });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateMedication = async (req, res) => {
  try {
    const med = await Medication.findById(req.params.id);
    if (!med) return res.status(404).json({ success: false, error: "Medication not found" });
    if (med.userId.toString() !== req.user.id) return res.status(401).json({ success: false, error: "User not authorized" });
    
    const updatedMed = await Medication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await History.create({ userId: req.user.id, medicationId: updatedMed._id, action: "Medication details updated" });
    res.status(200).json({ success: true, data: updatedMed });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteMedication = async (req, res) => {
  try {
    const med = await Medication.findById(req.params.id);
    if (!med) return res.status(404).json({ success: false, error: "Medication not found" });
    if (med.userId.toString() !== req.user.id) return res.status(401).json({ success: false, error: "User not authorized" });
    
    await Medication.findByIdAndDelete(req.params.id);
    await History.create({ userId: req.user.id, medicationId: med._id, action: "Medication deleted" });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// --- NEW --- Log medication status (Taken, Skipped, etc.)
export const logMedicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const med = await Medication.findById(req.params.id);

    if (!med) return res.status(404).json({ success: false, error: "Medication not found" });
    if (med.userId.toString() !== req.user.id) return res.status(401).json({ success: false, error: "User not authorized" });

    // Update the medication's lastTaken status if it was taken
    if (status === 'Taken') {
        med.lastTaken = new Date();
        await med.save();
    }
    
    // Create a history entry for the action
    await History.create({
        userId: req.user.id,
        medicationId: med._id,
        action: `Marked as ${status}`,
    });
    
    res.status(200).json({ success: true, data: med });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};