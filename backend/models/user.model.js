import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber:{
      type:Number,
      required:true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["freelancer", "client"],
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String }, //yaha chai url matra aauxa resume ko
      phnumber: { type: Number }, //if payment is integrated then khalti number
      resumeOriginalName: { type: String }, //resume upload garda original name nai aawos vanera
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profilePhoto: {
        type: String,
        default: "",
      },
      ratings: {
        type: [{
          ratedBy: {type: mongoose.Schema.Types.ObjectId, ref: " User"},// user jasle chai rating dinxa 
          rating: {type: Number, min:1, max: 5}, // rating value chai (1-5) samma matra hunxa 
          job: {type: mongoose.Schema.Types.ObjectId, ref :"Job"} // job haru associated with the ratings 
        }],
        default: []  // default empty array nai hunxa 
      },
      averageRating: { type: Number, default: 0, min: 0, max: 5 }, // Ensure this is inside profile
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User",userSchema)