
import { useSelector } from "react-redux"
import useGetAllJobs from "../hooks/useGetAllJobs"
import CategoryCarousel from "./CategoryCarousel"
import HeroSection from "./HeroSection"
import LatestJobs from "./LatestJobs"
import Footer from "./shared/Footer"
import Navbar from "./shared/Navbar"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Home = () => {
  useGetAllJobs();
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user?.role === "client"){
      navigate("/admin/companies");
    }
  },[])

  
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>
        

    </div>
  )
}

export default Home