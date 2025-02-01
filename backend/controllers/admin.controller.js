import { Admin } from "../models/admin.model.js";
import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";
import { Application } from "../models/application.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//creating a single admin user
export const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    //defining admin details
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Fill all information" });
    }

    //hashing the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    //save the admin details to the database
    await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Admin Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error at adminRegister method: ", error.message);
  }
};

//admin authentication which is from req.body
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    //check for the correct password
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    const tokenData = {
      adminId: admin._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "10d",
    });

    const adminInfo = {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    };

    return res
      .status(200)
      .cookie("token", token, { maxAge: 10 * 24 * 60 * 60 * 1000 })
      .json({
        message: `Welcome back ${admin.name}`,
        success: true,
        adminInfo,
      });
  } catch {
    return res
      .status(500)
      .json({ message: "Internal Server Error at adminLogin" });
  }
};

//for admin to be logout :
export const adminLogout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Admin Logged Out successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error occured at Admin Logout part", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error at adminLogout" });
  }
};

//admin dashboard statistics . kati ota jobs xa kati users xa like that data haru leko xa
export const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const freelancers = await User.countDocuments({ role: "freelancer" });
    const clients = await User.countDocuments({ role: "client" });
    const totalJobs = await Job.countDocuments();
    const totalCompanies = await Company.countDocuments();
    const totalApplications = await Application.countDocuments();

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      // .limit(5)
      .select("-password");

 

    const recentJobs = await Job.find()
      .sort({ createdAt: -1 })
      // .limit(10)
      .populate("company");

      const allCompanies = await Company.find().sort({ createdAt: -1 })

   

    const stats = [
      {
        totalUsers,
      },
      {
        freelancers,
      },
      {
        clients,
      },
      {
        totalJobs,
      },
      {
        totalCompanies,
      },
      {
        totalApplications,
      },
      {
        recentUsers,
      },
      {
        recentJobs,
      },
      {
        allCompanies,
      }
    ];

    //convert object into array data
    // const statsArray = Object.values(stats);

    return res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    console.log("Error occured at Admin Dashboard part", error);
    return res.status(500).json({
      message: "Internal Server Error at adminDashboard",
      success: false,
    });
  }
};



//for the remove user that delete all the infromation about the both users freelancer and client
export const removeUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    if (user.role === "freelancer") {
      // Delete all applications by freelancer
      await Application.deleteMany({ applicant: userId });
    } 
    else if (user.role === "client") {
      // Delete client's companies and related data
      const companies = await Company.find({ userId });
      
      for (const company of companies) {
        // Delete company's jobs and applications
        const jobs = await Job.find({ company: company._id });
        
        for (const job of jobs) {
          await Application.deleteMany({ job: job._id });
          await Job.findByIdAndDelete(job._id);
        }
        
        await Company.findByIdAndDelete(company._id);
      }
      
      // Delete any remaining jobs created by client
      await Job.deleteMany({ created_by: userId });
    }

    // Finally delete the user
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      message: "User and all related data deleted successfully",
      success: true
    });
  } catch (error) {
    console.error("Error in removeUser:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
};

//for the deletion of jobs and their related data 
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    
    // Delete all applications for this job
    await Application.deleteMany({ job: jobId });
    
    // Delete the job itself
    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      message: "Job and related applications deleted successfully",
      success: true
    });
  } catch (error) {
    console.error("Error in deleteJob:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
};

//for the deletion of companies and their related data
export const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    
    // Find and delete all company's jobs and applications
    const jobs = await Job.find({ company: companyId });
    
    for (const job of jobs) {
      await Application.deleteMany({ job: job._id });
      await Job.findByIdAndDelete(job._id);
    }
    
    // Delete the company
    await Company.findByIdAndDelete(companyId);

    return res.status(200).json({
      message: "Company and all related jobs/applications deleted successfully",
      success: true
    });
  } catch (error) {
    console.error("Error in deleteCompany:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
};