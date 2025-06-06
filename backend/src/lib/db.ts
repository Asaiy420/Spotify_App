import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI!)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.error(`Failed to connect with MONGODB: ${error}`);
        process.exit(1);    
    }
}


