import React from 'react';
import { Card, CardContent } from "./ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "TechCorp",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    quote: "JobLynk helped me land my dream job! The platform's user-friendly interface and powerful job matching algorithm made my job search incredibly efficient."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Manager",
    company: "BrandBoost",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote: "As an employer, JobLynk has been invaluable in finding top talent. The quality of candidates we've hired through the platform has been exceptional."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "DesignHub",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    quote: "The career resources and networking features on JobLynk gave me the edge I needed in a competitive job market. I'm grateful for the opportunities it opened up for me."
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "TechCorp",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    quote: "JobLynk helped me land my dream job! The platform's user-friendly interface and powerful job matching algorithm made my job search incredibly efficient."
  },
  {
    id: 5,
    name: "Michael Chen",
    role: "Marketing Manager",
    company: "BrandBoost",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote: "As an employer, JobLynk has been invaluable in finding top talent. The quality of candidates we've hired through the platform has been exceptional."
  },
  {
    id: 6,
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "DesignHub",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    quote: "The career resources and networking features on JobLynk gave me the edge I needed in a competitive job market. I'm grateful for the opportunities it opened up for me."
  }
];

const TestimonialCard = ({ testimonial }) => (
  <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden h-full">
    <CardContent className="p-6 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <img 
          src={testimonial.image} 
          alt={testimonial.name} 
          className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-blue-500"
        />
        <div>
          <h3 className="font-bold text-lg text-gray-800 dark:text-white">{testimonial.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role} at {testimonial.company}</p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic flex-grow">&ldquo;{testimonial.quote}&rdquo;</p>
    </CardContent>
  </Card>
);

const TestimonialsSection = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-8 md:mb-12">Success Stories</h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <div className="h-full">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-12 top-1/2 transform -translate-y-1/2" />
          <CarouselNext className="absolute -right-12 top-1/2 transform -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
