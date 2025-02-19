import { Contact, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from './ui/badge'
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";
import CVGenerator from "./CvGenerator";

// const skills = ["HTML","CSS","React","Node","JavaScript"]
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open , setOpen]= useState(false);
  const {user} = useSelector(store=>store.auth);
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto shadow-sm border bg-white border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
          {/* <Button className="text-right">
            <CVGenerator user={user}/>
          </Button> */}
        </div>
        <div>
        
            <CVGenerator user={user}/>
          

        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail/>
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact/>
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="font-medium text-xl">Skills</h1>
          <div className="flex items-center gap-1">
            {
              user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item,index)=><Badge key={index}><span>{item}</span></Badge>) : <span>NA</span>
            }
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label className="text-md font-bold">Resume</label>
          {
            isResume ? <a target="_blank" href={user?.profile?.resume} className="text-gray-600 w-full font-thin hover:underline cursor-pointer">{user?.profile?.resumeOriginalName}</a> :<span>NA</span>
          }
        </div>
      </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl">
          <h1 className="font-bold my-5 ">Applied Jobs</h1>
          {/* user le kati ota job applied garyo tyo yaha dekhauxa  */}
          <AppliedJobTable/>


        </div>
        <UpdateProfileDialog open={open} setOpen = {setOpen}/>
    </div>
  );
};

export default Profile;
