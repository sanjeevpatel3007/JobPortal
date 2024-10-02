import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-10  ">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className=" basis-full md:basis-1/3  flex items-center justify-center md:w-full px-4 ">
                                <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full bg-[#121e48] text-white">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
              
                <CarouselPrevious className="absolute left-12 top-1/2 transform -translate-y-1/2 z-50 md:-left-16 lg:-left-10 text-black bg-white p-2 rounded-full shadow-lg" />
                    <CarouselNext className="absolute right-12 top-1/2 transform -translate-y-1/2 z-50 md:-right-16 lg:-right-10 text-black bg-white p-2 rounded-full shadow-lg" />

                {/* <CarouselPrevious  />
                <CarouselNext /> */}
            </Carousel>
        </div>
    )
}

export default CategoryCarousel