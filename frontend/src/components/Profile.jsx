import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div className='bg-gray-100 pt-16 dark:bg-gray-900 min-h-screen'>
            <Navbar />
            <div className='max-w-4xl mx-auto my-8 px-4'>
                <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
                    <div className='p-6 sm:p-8'>
                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
                            <div className='flex items-center gap-4 mb-4 sm:mb-0'>
                                <Avatar className="h-24 w-24 rounded-full border-4 border-blue-500 dark:border-blue-400">
                                    <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                                </Avatar>
                                <div>
                                    <h1 className='font-bold text-2xl text-gray-800 dark:text-white'>{user?.fullname}</h1>
                                    <p className='text-gray-600 dark:text-gray-300'>{user?.profile?.bio || "No bio available"}</p>
                                </div>
                            </div>
                            <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
                                <Pen className="mr-2 h-4 w-4" /> Edit Profile
                            </Button>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
                            <div className='flex items-center gap-3'>
                                <Mail className="text-blue-500 dark:text-blue-400" />
                                <span className='text-gray-700 dark:text-gray-300'>{user?.email}</span>
                            </div>
                            <div className='flex items-center gap-3'>
                                <Contact className="text-green-500 dark:text-green-400" />
                                <span className='text-gray-700 dark:text-gray-300'>{user?.phoneNumber || "No phone number"}</span>
                            </div>
                        </div>
                        <div className='mb-6'>
                            <h2 className='font-semibold text-lg text-gray-800 dark:text-white mb-2'>Skills</h2>
                            <div className='flex flex-wrap gap-2'>
                                {user?.profile?.skills.length !== 0 ? 
                                    user?.profile?.skills.map((item, index) => 
                                        <Badge key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                            {item}
                                        </Badge>
                                    ) : 
                                    <span className="text-gray-500 dark:text-gray-400">No skills listed</span>
                                }
                            </div>
                        </div>
                        <div>
                            <h2 className='font-semibold text-lg text-gray-800 dark:text-white mb-2'>Resume</h2>
                            {user?.profile?.resume ? (
                                <a 
                                    target='blank' 
                                    href={user?.profile?.resume} 
                                    className='flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    {user?.profile?.resumeOriginalName || "View Resume"}
                                </a>
                            ) : (
                                <span className="text-gray-500 dark:text-gray-400">No resume uploaded</span>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className='mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
                    <h2 className='font-bold text-xl p-6 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white'>
                        Applied Jobs
                    </h2>
                    <AppliedJobTable />
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
