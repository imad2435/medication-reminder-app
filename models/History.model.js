import mongoose from "mongoose";
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
},{collection:"history"});

export default mongoose.model("History", historySchema);