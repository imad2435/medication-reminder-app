 import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
    userId: { type: String, required: true, trim: true }, // or ObjectId if referencing User
    name: { type: String, required: true, trim: true },
    dosage: { type: String, trim: true },
    frequency: { type: String, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    reminderTimes: [{ type: String, trim: true }],
    notes: { type: String, default: "", trim: true },
    lastTaken: { type: Date }
}, { collection: "medications" });

export default mongoose.model("Medication", medicationSchema);