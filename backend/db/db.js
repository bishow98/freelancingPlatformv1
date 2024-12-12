import mongoose from "mongoose";
import {DATABASE_NAME} from "../constants.js"

const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DATABASE_NAME}`)
        console.log(`Mongodb connected successfully at ${connectionInstance.connection.host}`);
        
    }catch(error){
        console.log("MongoDB connection error:",error);
        process.exit(1)
    }
}

export default connectDB;