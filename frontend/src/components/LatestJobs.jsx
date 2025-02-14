import { useSelector } from "react-redux"
import LatestJobsCards from "./LatestJobsCards"
// import { useEffect } from "react";
// import { JOB_RECOMMENDED_API_END_POINT } from "./utils/constants";
// import axios from "axios";
// import { setRecommendedJobs } from "../redux/jobSlice";



const LatestJobs = () => {

    const {allJobs} = useSelector((store)=>store.job);
    // const dispatch = useDispatch();
    // useEffect(()=> {
    //   const getAllRecommendedJobs = async() =>{
    //     try {
    //       const res = await axios.get(`${JOB_RECOMMENDED_API_END_POINT}/recommend-jobs`);
    //       console.log(res.data);

    //       if(res.data.success){
    //         dispatch(setRecommendedJobs(res.data.alldata))
    //       }
          
    //     } catch (error) {
    //       console.log(`Error at Latest Jobs with job recommended type: ${error.message}`)
          
    //     }
    //   }
    //   getAllRecommendedJobs();

    // },[])
  return (
    <div className="max-w-7xl mx-auto my-20">
        <div className="flex flex-col items-center ">
        <h1 className="text-4xl font-bold">Latest <span className="text-[#6A38C2]"> Job Openings</span></h1>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-5">
            {allJobs.length <= 0? <span>No Job Available </span>:allJobs?.slice(0,6).map((job)=><LatestJobsCards key={job._id} job={job}/>)}
        </div>
        <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mt-10">Recommended <span className="text-[#6A38c2]">Jobs</span></h1>
        </div>

        {/* <div className="grid grid-cols-3 gap-4 mt-5">
          <LatestJobsCards/>

        </div> */}



    </div>
  )
}

export default LatestJobs