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
        <div className='flex flex-col p-6 rounded-lg shadow-lg dark:bg-gray-800 bg-white text-gray-800 dark:text-white transition-all duration-300 hover:shadow-xl h-[400px]'>
            <div className='flex items-center justify-between mb-4'>
                <p className='text-sm text-gray-600 dark:text-gray-400'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" size="icon"><Bookmark className="h-4 w-4" /></Button>
            </div>

            <div className='flex items-center gap-4 mb-4'>
                <Avatar className="h-16 w-16">
                    <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                </Avatar>
                <div>
                    <h2 className='font-semibold text-xl'>{job?.company?.name}</h2>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>India</p>
                </div>
            </div>

            <div className='mb-4 flex-grow'>
                <h1 className='font-bold text-xl mb-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-3'>
                    
                    {/* {job?.description} */}
                    {job?.description?.split(" ").slice(0, 10).join(" ")}...

                    
                    
                    </p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mb-4'>
                <Badge variant="secondary">{job?.position} Positions</Badge>
                <Badge variant="secondary">{job?.jobType}</Badge>
                <Badge variant="secondary">{job?.salary} LPA</Badge>
            </div>

            <div className='flex items-center gap-4 mt-auto'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className='flex-1'>Details</Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job
