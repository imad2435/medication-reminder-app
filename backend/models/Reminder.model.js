import mongoose from "mongoose";
 
const reminderSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    remindAt:{
        type:Date,
        required:true
    },
    sent:{
        type:Boolean,
        default:false
    },
    status: {
    type: String,
    enum: ["Pending", "Taken", "Skipped", "Delayed"],
    default: "Pending"
}

},{ timestamps: true })

 const Reminder= mongoose.model('Reminder',reminderSchema)
 export default Reminder; 