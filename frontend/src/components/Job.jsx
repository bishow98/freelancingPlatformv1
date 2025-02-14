import {Badge} from "./ui/badge"
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Job = ({job}) => {
  const navigate = useNavigate();
  // const jobId = "jkjjafjdsjfasjf";
  const {user} = useSelector(store=>store.auth)

  const daysAgoFunction = (mongodbTime)=>{
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime- createdAt;
    return Math.floor(timeDifference/(1000*24*60*60));
  }

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border-gray-300">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{daysAgoFunction(job?.createdAt)===0?"Today":`${daysAgoFunction(job?.createdAt)} days Ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">Nepal</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={'text-blue-700 font-bold'} variant="ghost">12Position</Badge>
        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.budget}/hr</Badge>
      </div>
      {
        user?.role === "freelancer" ? (
        <div className="flex items-center gap-4 mt-4">
          <Button onClick={()=>navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
          <Button calssName="bg-[#7209b7]" >Save For Later</Button>
        </div>) : (<div className="flex items-center gap-4 mt-4">
        <Button onClick={()=>navigate(`/login`)} variant="outline">Details</Button>
        <Button calssName="bg-[#7209b7]" >Save For Later</Button>
      </div>)
      }
    </div>
  );
};

Job.propTypes = {
  job: PropTypes.shape({
    _id:PropTypes.string,
    jobType:PropTypes.string,
    budget:PropTypes.string,
    title:PropTypes.string,
    description:PropTypes.string,
    createdAt:PropTypes.string,
    company:PropTypes.shape({
      name:PropTypes.string,
      logo:PropTypes.string,

    }),
    
    //aru pani prop liney ho vaney yaha rakhdai janey
  }).isRequired
};


export default Job;
