import RecommendationEngine from "../utils/recommendationEngine.js";
import {Job} from "../models/job.model.js";
import {User} from "../models/user.model.js";

export const getRecommendedJobs = async (req, res) =>{
    try {
        const userId = req.id;

        //get freelancer's skills 
        const freelancer = await User.findById(userId);

        if(!freelancer || freelancer.role !== "freelancer"){
            return res.status(400).json({
                success: false,
                message:"user is not a freelancer "
            })
        }

        const freelancerSkills = freelancer.profile.skills || [];

        //Get all active jobs with their requirements 
        const jobs = await Job.find()
        .populate('company')
        .populate('created_by', 'fullname email')
        .sort('-createdAt');

        //get all unique skills from the system 
        const allFreelancers = await User.find({role: 'freelancer'});
        const allJobs = await Job.find();

        const allSkills = [...new Set([
            ...allFreelancers.flatMap(user=> user.profile.skills ||[]),
            ...allJobs.flatMap(job=> job.skills || [])
        ])]

        //get recommendations chai yaha bata start garney 
        const recommendedJobs = RecommendationEngine.getRecommendedJobs(freelancerSkills,jobs, allSkills);

        //filter jobs with at least 60% match 
        const filteredJobs = recommendedJobs.filter(job=>job.matchPercentage >= 60);

        return res.status(200).json({
            success:true,
            alldata:{
                recommendations: filteredJobs,
                totalJobs: recommendedJobs.length,
                userSkills: freelancerSkills

            }
        });


        
    } catch (error) {
        console.error("Error in getRecommendedJobs method: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error at getRecommendedJobs"
        })
        
    }
}