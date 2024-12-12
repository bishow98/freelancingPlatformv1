import { Job } from "../models/job.model.js";

// user can post the job so job logic here client post the job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      budget,
      jobType,
      experience,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !budget ||
      !jobType ||
      !experience
    ) {
      return res.status(400).json({
        message: "All the information should be given ",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      budget,
      jobType,
      experienceLevel: experience,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Successfully created new job",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//To find the all the jobs
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All the jobs are found",
      jobs,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching jobs",
      success: false,
      error: error.message,
    });
  }
};

//find all job this isfor freelancer
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {}
};

//how many jobs are created by client upto now
export const getClientJobs = async (req, res) => {
  try {
    const clientId = req.id;
    const jobs = await Job.find({ created_by: clientId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "No jobs created by this client",
        success: false,
      });
    }
    return res.status(200).json({
      message: "All the jobs are found",
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
