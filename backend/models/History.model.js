import mongoose from "mongoose"; // <-- Use import

const historySchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        trim:true
    },
    medicationId:{
        type:String,
        required:true,
        trim:true
    },
    action:{
        type:String,
        required:true,
        trim:true
    },
    timestamp:{
        type:Date,
        required:true,
        default:Date.now
    }
}, { collection: "history" });

const History = mongoose.model("History", historySchema);
export default History; // <-- Use export default