import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from "./ui/button"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setSearchedQuery } from "../redux/jobSlice"
  

const CategoryCarousel = () => {

    const category = [
        "frontEnd",
        "BackEnd",
        "FullStack",
        "MobileApp",
        "DataScience",
        "Graphics Designing",
    ]

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchQueryHandler = (query)=>{
        dispatch(setSearchedQuery(query))
        navigate("/browse")
      }
  return (
    <div>
        <Carousel className="w-full max-w-xl mx-auto my-20">
            <CarouselContent>
                {
                    category.map((category,index)=>(
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <Button onClick={()=> searchQueryHandler(category)} variant="outline" className="rounded-full">{category}</Button>
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
        
    </div>
  )
}

export default CategoryCarousel