import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';
dotenv.config()


if(!process.env.MONGODB_URI){
    throw new Error("please provide MONGODB_URI in env file")
}


async function connectDatabase() {
     try {
               mongoose.connect(process.env.MONGODB_URI)
               console.log("database connected")
     } catch (error) {
               console.log("database connection error" ,error)
               process.exit(1)
     }
}

export default connectDatabase;