import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAllJobs, getClientJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

//for the job route 
router.route("/create").post(isAuthenticated,postJob);


router.route("/get").get(isAuthenticated,getAllJobs);

router.route("/get/:id").get(isAuthenticated,getJobById)

router.route("/getclientjobs").get(isAuthenticated,getClientJobs)


export default router;