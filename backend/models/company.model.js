import mongoose,{Schema} from "mongoose";

const companySchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true,
        },
        description:{
            type:String,

        },
        logo:{
            type:String,

        },
        userId:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required:true
        },
        averageRating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

    },
    {timestamps:true})

    export const Company = mongoose.model("Company",companySchema)