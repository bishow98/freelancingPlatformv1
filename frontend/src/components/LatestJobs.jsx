import LatestJobsCards from "./LatestJobsCards"


const LatestJobs = () => {
    const random =[1,2,3,4,5,6,7,8]
  return (
    <div className="max-w-7xl mx-auto my-20">
        <div className="flex flex-col items-center ">
        <h1 className="text-4xl font-bold">Latest <span className="text-[#6A38C2]"> Job Openings</span></h1>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-5">
            {random.slice(0,6).map((item,index)=><LatestJobsCards key={index}/>)}
        </div>


    </div>
  )
}

export default LatestJobs