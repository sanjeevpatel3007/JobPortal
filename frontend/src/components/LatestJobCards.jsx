import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div 
        onClick={() => navigate(`/description/${job._id}`)} 
        className='p-5 rounded-md bg-white dark:bg-gray-800 dark:border-gray-900 border border-gray-100 cursor-pointer 
        shadow-lg dark:shadow-md hover:shadow-2xl dark:hover:shadow-2xl transition-shadow'
 >
        <div>
            <h1 className='font-medium text-lg text-gray-900 dark:text-gray-100'>{job?.company?.name}</h1>
            <p className='text-sm text-gray-500 dark:text-gray-400'>India</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2 text-gray-900 dark:text-white'>{job?.title}</h1>
            <p className='text-sm text-gray-600 dark:text-gray-300'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className='text-[#7C93C3] dark:text-[#7c93c3] ' variant="ghost">
                {job?.position} Positions
            </Badge>
            <Badge className='text-[#55679C] dark:text-[#55679c] font-bold' variant="ghost">
                {job?.jobType}
            </Badge>
            <Badge className='text-[#1E2A5E] dark:text-[#9aa0bcbb] font-bold' variant="ghost">
                {job?.salary} LPA
            </Badge>
        </div>
    </div>
    )
}

export default LatestJobCards