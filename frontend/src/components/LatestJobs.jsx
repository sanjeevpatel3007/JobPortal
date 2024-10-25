import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import useGetAllJobs from '@/hooks/useGetAllJobs'; // Import your custom hook


// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='max-w-7xl mx-auto px-4 md:px-8 my-12 md:my-20'>
            <div className='text-center mb-8 md:mb-12'>
                <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                    <span className='text-[#55679C] dark:text-blue-400'>Latest & Top </span> 
                    Job Openings
                </h2>
                <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
                    Explore the newest and most sought-after job openings on JobLynk. 
                    Whether you prefer remote work or a dynamic office environment, we have a wide range of opportunities to suit your career goals.
                </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
                {allJobs.length <= 0 ? 
                    <p className='col-span-full text-center text-xl text-gray-500 dark:text-gray-400'>No jobs available at the moment.</p> : 
                    allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs
