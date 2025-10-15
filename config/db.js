import mongoose from "mongoose";

const connectDB =async(req,res)=>{
    try {
      await mongoose.connect(process.env.MONGO_URL); 
      console.log("mongoDB Conncected successfully") 
    } catch (error) {
        console.log("error in conncetion of mongoDB",error.message)
    }
}
export default connectDB;