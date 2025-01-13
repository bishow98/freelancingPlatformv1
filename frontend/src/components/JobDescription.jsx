import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "./utils/constants";
import { setSingleJob } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
 
  const params = useParams();
  const jobId = params.id;
  const {singleJob} = useSelector(store=>store.job);
  const {user} = useSelector(store=>store.auth);

  const isInitiallyApplied = singleJob?.applications?.some(application=>application.applicants === user?._id) || false;//freelancer le jaba details click garxa taba yedi tyo user login xa vaney first time ko lagi apply now button enable gardinxa 

  const[isApplied, setIsApplied] = useState(isInitiallyApplied);
  const dispatch = useDispatch();


  //eauta job details ma click garepaxi apply ko option click garyo ki garena vanera handle garxa 
  const applyJobHandler = async ()=>{
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true});
      console.log(res.data);
      if(res.data.success){
        setIsApplied(true); //local state lai update garxa 
        const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
        dispatch(setSingleJob(updatedSingleJob)) //yesle chai real time UI update garna help garxa 
        toast.success(res.data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
      
    }
  }
  

  useEffect(()=>{
    const fetchSingleJob = async ()=>{
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
            if(res.data.success){
                dispatch(setSingleJob(res.data.job))
                setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id))

            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchSingleJob();
  },[jobId, dispatch,user?._id])

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              12Position
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              {singleJob?.budget}/hr
            </Badge>
          </div>
        </div>
        <Button
        onClick={isApplied ? null : applyJobHandler}
          disable={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          Job Description 
        </h1>
        <div>

      <h1 className="font-bold my-1">
        Role:
        <span className="pl-4 font-normal text-gray-800">
          {singleJob?.title}
        </span>
      </h1>
      <h1 className="font-bold my-1">
        Location:
        <span className="pl-4 font-normal text-gray-800">Itahari</span>
      </h1>
      <h1 className="font-bold my-1">
        Description:
        <span className="pl-4 font-normal text-gray-800">
        {singleJob?.description}
        </span>
      </h1>
      <h1 className="font-bold my-1">
        Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel} yrs</span>
      </h1>
      <h1 className="font-bold my-1">
        Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.budget}/hr</span>
      </h1>
      <h1 className="font-bold my-1">
        Total Applicants:
        <span className="pl-4 font-normal text-gray-800">{singleJob?.applications.length}</span>
      </h1>
      <h1 className="font-bold my-1">
        Posted Date:
        <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span>
      </h1>
        </div>
    </div>
  );
};

export default JobDescription;
