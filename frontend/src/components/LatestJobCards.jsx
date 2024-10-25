import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer 
                       shadow-md hover:shadow-xl dark:shadow-lg dark:hover:shadow-xl transition-all duration-300'
        >
            <div className="mb-4">
                <h2 className='font-semibold text-xl text-gray-900 dark:text-gray-100'>{job?.company?.name}</h2>
                <p className='text-sm text-gray-500 dark:text-gray-400'>India</p>
            </div>
            <div className="mb-4">
                <h1 className='font-bold text-2xl mb-2 text-gray-900 dark:text-white'>{job?.title}</h1>
                <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap items-center gap-2'>
                <Badge variant="secondary" className='text-blue-600 dark:text-blue-400'>
                    {job?.position} Positions
                </Badge>
                <Badge variant="secondary" className='text-green-600 dark:text-green-400'>
                    {job?.jobType}
                </Badge>
                <Badge variant="secondary" className='text-purple-600 dark:text-purple-400'>
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards
