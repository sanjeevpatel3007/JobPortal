import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Briefcase, Users, TrendingUp } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className='bg-gradient-to-br from-[#E1D7B7] to-[#F5EFE0] text-[#1E2A5E] dark:from-gray-900 dark:to-gray-800 dark:text-white min-h-screen flex items-center overflow-hidden'>
            <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
                <div className='flex flex-col md:flex-row items-center justify-between'>
                    <motion.div 
                        className='md:w-1/2 space-y-8'
                        initial="initial"
                        animate="animate"
                        variants={fadeInUp}
                    >
                        <h1 className='text-5xl md:text-6xl font-bold leading-tight'>
                            Search, Apply & Get Your <span className='text-[#55679C] dark:text-blue-400'>Dream Jobs</span>
                        </h1>
                        <p className='text-xl text-gray-700 dark:text-gray-300'>
                            Discover your next career move with JobLynk. Whether you're looking for a tech role, creative position, or a new challenge, we've got you covered.
                        </p>
                        <motion.div 
                            className='flex w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-700 rounded-full overflow-hidden'
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <input
                                type="text"
                                placeholder='Find your dream job'
                                onChange={(e) => setQuery(e.target.value)}
                                className='flex-grow px-6 py-4 outline-none bg-white dark:bg-gray-800'
                            />
                            <Button onClick={searchJobHandler} className="px-6 rounded-r-full bg-[#55679C] hover:bg-[#3A4A7A] transition-colors">
                                <Search className='h-5 w-5 mr-2' /> Search
                            </Button>
                        </motion.div>
                        <div className='flex space-x-4 pt-8'>
                            {[
                                { icon: Briefcase, text: "10k+ Jobs" },
                                { icon: Users, text: "500+ Companies" },
                                { icon: TrendingUp, text: "98% Success Rate" }
                            ].map((item, index) => (
                                <motion.div 
                                    key={index}
                                    className='flex items-center space-x-2'
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                >
                                    <item.icon className='text-[#55679C] dark:text-blue-400' />
                                    <span>{item.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div 
                        className='md:w-1/2 mt-16 md:mt-0'
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <img src="/job-steps.png" alt="Job Search" className='w-full h-auto ' />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
