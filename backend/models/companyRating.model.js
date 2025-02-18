import mongoose , {Schema} from "mongoose";

const companyRatingSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    ratedBy: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    job:{
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
},
    {timestamps: true}
)

export const CompanyRating = mongoose.model("CompanyRating", companyRatingSchema);