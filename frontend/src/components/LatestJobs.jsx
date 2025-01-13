import { useSelector } from "react-redux"
import LatestJobsCards from "./LatestJobsCards"


const LatestJobs = () => {
    const {allJobs} = useSelector((store)=>store.job);
  return (
    <div className="max-w-7xl mx-auto my-20">
        <div className="flex flex-col items-center ">
        <h1 className="text-4xl font-bold">Latest <span className="text-[#6A38C2]"> Job Openings</span></h1>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-5">
            {allJobs.length <= 0? <span>No Job Available </span>:allJobs?.slice(0,6).map((job)=><LatestJobsCards key={job._id} job={job}/>)}
        </div>


    </div>
  )
}

export default LatestJobs