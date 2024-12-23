import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from "./ui/button"
  

const CategoryCarousel = () => {
    const category = [
        "frontEnd",
        "BackEnd",
        "FullStack",
        "MobileApp",
        "DataScience",
        "Graphics Designing",
    ]
  return (
    <div>
        <Carousel className="w-full max-w-xl mx-auto my-20">
            <CarouselContent>
                {
                    category.map((item,index)=>(
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <Button variant="outline" className="rounded-full">{item}</Button>
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