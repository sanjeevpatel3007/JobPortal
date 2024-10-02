import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import useGetAllJobs from '@/hooks/useGetAllJobs'; // Import your custom hook


// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='max-w-7xl mx-4 my-20  '>
            <h1 className='text-4xl font-bold'><span className='text-[#55679C]'>Latest & Top </span> Job Openings</h1>
               <p>Explore the newest and most sought-after job openings on JobLynk. <br /> Whether you prefer remote work or a dynamic office environment, we have a wide range of opportunities to suit your career goals."

</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs