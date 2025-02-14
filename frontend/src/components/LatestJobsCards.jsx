import { Badge } from "@/components/ui/badge"
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";


const LatestJobsCards = ({job}) => {
  const navigate = useNavigate()
  const {user} = useSelector(store=>store.auth);

  return (
    <>
    {
      user && user?.role=== "freelancer" ? ( 
      <div onClick={()=>navigate(`/description/${job?._id}`)} className="p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer">
      <div>
      <h1 className="font-medium text-lg">{job?.company?.name}</h1>
      <p className="text-sm text-gray-500">Nepal</p>
      </div>
      <div>
          <h2 className="font-bold text-lg my-2">{job?.title}</h2>
          <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
          <Badge className="text-blue-700 font-bold " variant="ghost">12 position</Badge>
          <Badge className="text-[#F83002] font-bold " variant="ghost">{job?.budget}/hr</Badge>
          <Badge className="text-[#7209b7] font-bold " variant="ghost">{job?.jobType}</Badge>
      </div>
  </div>) : (
     <div onClick={()=>navigate(`/login`)} className="p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer">
     <div>
     <h1 className="font-medium text-lg">{job?.company?.name}</h1>
     <p className="text-sm text-gray-500">Nepal</p>
     </div>
     <div>
         <h2 className="font-bold text-lg my-2">{job?.title}</h2>
         <p className="text-sm text-gray-600">{job?.description}</p>
     </div>
     <div className="flex items-center gap-2 mt-4">
         <Badge className="text-blue-700 font-bold " variant="ghost">12 position</Badge>
         <Badge className="text-[#F83002] font-bold " variant="ghost">{job?.budget}/hr</Badge>
         <Badge className="text-[#7209b7] font-bold " variant="ghost">{job?.jobType}</Badge>
     </div>
 </div>
  )
    }
    </>
   
  )
}

LatestJobsCards.propTypes = {
  job: PropTypes.shape({
    _id:PropTypes.string,
    jobType:PropTypes.string,
    budget:PropTypes.string,
    title:PropTypes.string,
    description:PropTypes.string,
    createdAt:PropTypes.string,
    company:PropTypes.shape({
      name:PropTypes.string,

    })
    //aru pani prop liney ho vaney yaha rakhdai janey
  }).isRequired
};

export default LatestJobsCards