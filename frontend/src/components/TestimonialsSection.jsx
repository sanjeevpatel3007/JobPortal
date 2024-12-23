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
    name: "Amit Sharma",
    role: "Software Developer",
    company: "Tech Solutions Pvt Ltd",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    quote: "JobLynk made my job search journey smooth and effortless. The intuitive interface and excellent job matching algorithms made all the difference."
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Product Manager",
    company: "InnovateTech",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    quote: "As a hiring manager, JobLynk has helped us find the best talent. It's an invaluable tool for discovering high-quality candidates in the tech industry."
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    role: "UX/UI Designer",
    company: "DesignCo",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    quote: "JobLynk gave me the opportunity to connect with amazing companies and find a job that perfectly fits my skills and aspirations."
  },
  {
    id: 4,
    name: "Ananya Rao",
    role: "Data Analyst",
    company: "DataX Technologies",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    quote: "The resources and support offered by JobLynk helped me secure a job in a competitive field. I'm so grateful for the opportunities this platform has given me."
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Marketing Head",
    company: "Global Ventures",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    quote: "JobLynk is a game-changer. It's an efficient platform that allows us to easily find and hire top talent, and the process is always smooth and reliable."
  },
  {
    id: 6,
    name: "Sanya Gupta",
    role: "Full Stack Developer",
    company: "CodeCrafters",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    quote: "JobLynk provided me with a great platform to enhance my career. I received excellent job recommendations and found my current role quickly."
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
