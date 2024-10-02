








import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <div className='p-5 rounded-md shadow-xl dark:bg-gray-800 bg-white text-[#1E2A5E]   dark:text-white dark:shadow-3xl'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-700 dark:text-gray-300'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full dark:bg-white dark:text-gray-800" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6 dark:bg-gray-300 dark:text-white " variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-700 dark:text-gray-300'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 dark:text-gray-300'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold dark:border-white'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold dark:border-white'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#55679C] font-bold dark:border-white'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline" className='dark:bg-white dark:text-gray-800'>Details</Button>
                <Button className="bg-[#55679C] dark:text-white">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job