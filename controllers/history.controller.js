import HistoryModel from "../models/History.model.js";
export const getHistory=async(req,res)=>{
    try {
        const history=await HistoryModel.find().sort({ createdAt: -1 })
        res.status(200).json({
            message:"History fetched successfully",
            data:history
        })
    } catch (error) {
           res.status(500).json({ message: error.message });
    }
}