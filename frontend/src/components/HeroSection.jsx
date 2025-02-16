import { useState } from "react";
import {Button} from "../components/ui/button"
import {Search} from "lucide-react"
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchQueryHandler = ()=>{
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="m-auto px-4 py-2 rounded-full bg-gray-100 text-[#6A38C2] font-medium">
          Freelancer&apos;s Portal 
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2">Work Done</span>
        </h1>
        <p className="font-semibold">You&apos;re not just working, you&apos;re building your own empire</p>
        <div className="flex w-[40%] shadow-lg border border-gray-300 pl-3 rounded-full items-center gap-4 mx-auto">
            <input
            type="text"
            placeholder="Search for a job"
            onChange={(e)=>setQuery(e.target.value)}
            className="outline-none border-none w-full"
            />
            <Button onClick={searchQueryHandler} className="rounded-r-full bg-[#6A38C2]">
                <Search className="h-5 w-5"/>
            </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
