import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async(req,res)=>{
    try {
        const userId = req.id;
        const jobId= req.params.id;

        if(!jobId){
            return res.status(400).json({
                message:"Job id is required",
                success:false,
            })
        }

        //check if the user applied to the job or not ?

        const existingApplication = await Application.findOne({job:jobId, applicant:userId});

        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this job",
                success:false,
            })
        }

        //check if the jobs exists 
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false,
            })
        }

        //create a new application 
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        })

        job.applications.push(newApplication);

        await job.save();

        return res.status(201).json({
            message:"Job applied successfully!",
            success:true,
        })

        
    } catch (error) {
        console.log("Error at the apply Job section",error);
    }
}

//now its time to find the total applied jobs 
export const getAppliedJobs = async(req,res)=>{
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}},
            }
        })

        if(!application){
            return res.status(400).json({
                message:"No Application",
                success:false,
            })
        };

        return res.status(200).json({
            application,
            success:true,
        })
        
    } catch (error) {
        console.log("Error at getAppliedJobs section",error);
        
    }
}

// now find the how many freelancers applied this job this is for admin. admin will look this up 

export const getApplicants = async (req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        })

        if(!job){
            return res.status(400).json({
                message:"job not found",
                success:false,
            })
        };

        return res.status(200).json({
            job,
            success:true
        });
        
    } catch (error) {
        console.log("Error at getApplicants method: ",error);
        
    }
}

//for the status . reject vayo ki accept vayo vanera 

export const updateStatus = async(req,res)=>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;

        if(!status){
            return res.status(400).json({
                message:"Status is required",
                success:false
            })
        }

        // find the application by applicant id 
        const application = await Application.findOne({_id:applicationId})
        if(!application){
            return res.status(400).json({
                message:"Application not found",
                success:false,
            })
        }

        //update the status 
        application.status = status.toLowerCase();

        await application.save();

        return res.status(200).json({
            message:"Status updated Successfully",
            success:true,
        })

    } catch (error) {
        console.log("Error at updateStatus: ",error);
    }
}