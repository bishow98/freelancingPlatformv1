import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


//registration of user. Here the input is taken from the req.body
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    // console.log(fullname,email,phoneNumber,password,role);
    //check if user selected role or not
    if (!role) {
      return res.status(400).json({
        message: "One role must be selected",
        success: false,
      });
    }
    if (!fullname || !email || !phoneNumber || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    //checking if user already exist or not
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,
      }
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//for login part

export const login = async (req, res) => {
  
  try {
    const { email, password, role } = req.body;
    // console.log(email,password,role);
    if (!email || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    //check if user email matched or not
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password ",
        success: false,
      });
    }
    //check for the correct password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password ",
        success: false,
      });
    }

    //check whether the role is correct or not
    // if (role !== user.role) {
    //   return res.status(400).json({
    //     message: "Account doesn't match with role",
    //     success: false,
    //   });
    // }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "5d",
    });

    const userInfo = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, { maxAge: 5 * 24 * 60 * 60 * 1000 })
      .json({
        message: `Welcome back ${user.fullname}`,
        userInfo,
        success: true,
      });
  } catch (error) {}
};

//for logout part
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//for update profile section
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    // console.log(fullname,email,phoneNumber, bio, skills);
    
    const file = req.file;

    //cloudinary setup 
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
   


    // if (!fullname || !email || !phoneNumber || !bio || !skills) {
    //   return res.status(400).json({
    //     message: "Something is missing",
    //     success: false,
    //   });
    // }
    
    //for the file in cloudinary 

    let skillsArray;
    if(skills){

         skillsArray = skills.split(",");
    }
    
    const userId = req.id; // those who already logged in can edit the profile for that middleware authentication is used
    const user = await User.findById(userId);

    if(!user){
        return res.status(400).json({
            message:"User not found",
            success:false
        })
    }

    //updating the data 
   if(fullname) user.fullname=fullname;
   if(email) user.email= email;
   if(phoneNumber) user.phoneNumber = phoneNumber;
   if(bio) user.profile.bio = bio;
   if(skills) user.profile.skills = skillsArray

   //resume ko lagi uplaod ho yaha chai 
   if(cloudResponse){
    user.profile.resume = cloudResponse.secure_url // save the cloudinary url 
    user.profile.resumeOriginalName = file.originalname; //save the original file name
   }

    await user.save();

    const userInfo = {
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile,
    }

    return res.status(200).json({
        message:"Profile updated successfully",
        userInfo,
        success:true,
    })


  } catch (error) {
    console.log(error);
  }
};
