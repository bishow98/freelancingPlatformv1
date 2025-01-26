import mongoose , {Schema } from "mongoose"


const adminSchema = new Schema (
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,
        },
    },{timestamps:true})

export const Admin = mongoose.model("Admin",adminSchema);

