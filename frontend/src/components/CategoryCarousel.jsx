import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="py-8 px-4 md:px-8 lg:px-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Popular Categories</h2>
            <div className="relative">
                <Carousel className="w-full max-w-5xl mx-auto">
                    <CarouselContent>
                        {categories.map((cat, index) => (
                            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                                <div className="p-1">
                                    <Button 
                                        onClick={() => searchJobHandler(cat)} 
                                        variant="outline" 
                                        className="w-full rounded-full bg-[#121e48] text-white hover:bg-[#1e3276] transition-colors duration-300"
                                    >
                                        {cat}
                                    </Button>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute -left-4 md:-left-12 top-1/2 transform -translate-y-1/2" />
                    <CarouselNext className="absolute -right-4 md:-right-12 top-1/2 transform -translate-y-1/2" />
                </Carousel>
            </div>
        </div>
    )
}

export default CategoryCarousel
