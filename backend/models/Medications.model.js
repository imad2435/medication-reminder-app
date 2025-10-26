import mongoose from "mongoose"; // <-- Use import

const medicationSchema = new mongoose.Schema({
    userId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    dosage: { type: String, trim: true },
    frequency: { type: String, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    reminderTimes: [{ type: String, trim: true }],
    notes: { type: String, default: "", trim: true },
    lastTaken: { type: Date }
}, {
    timestamps: true, // It's good practice to add timestamps
    collection: "medications"
});

const Medication = mongoose.model("Medication", medicationSchema);
export default Medication; // <-- This was fine, but we change the model creation for consistency