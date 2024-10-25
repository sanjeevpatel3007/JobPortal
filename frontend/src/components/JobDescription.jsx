import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { CalendarDays, MapPin, Briefcase, DollarSign, Users, Clock } from 'lucide-react'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false
    const [isApplied, setIsApplied] = useState(isInitiallyApplied)

    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const applyJobHandler = async () => {
        if (!user) {
            if (window.confirm('You must log in first to apply for this job. Click OK to log in.')) {
                navigate('/login')
            }
            return
        }

        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })
            if (res.data.success) {
                setIsApplied(true)
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob()
    }, [jobId, dispatch, user?._id])

    return (
        <div className='bg-gradient-to-b from-[#E1D7B7] to-white dark:from-gray-900 dark:to-gray-800 min-h-screen text-gray-800 dark:text-white pt-16'>
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden'>
                    <div className='p-6 sm:p-10'>
                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
                            <div>
                                <h1 className='font-bold text-2xl sm:text-3xl mb-2'>{singleJob?.title}</h1>
                                <p className='text-gray-600 dark:text-gray-400 mb-4'>{singleJob?.company?.name}</p>
                                <div className='flex flex-wrap gap-2'>
                                    <Badge variant="secondary" className='text-blue-700 dark:text-blue-400 font-semibold'>{singleJob?.position} Positions</Badge>
                                    <Badge variant="secondary" className='text-red-700 dark:text-red-400 font-semibold'>{singleJob?.jobType}</Badge>
                                    <Badge variant="secondary" className='text-green-700 dark:text-green-400 font-semibold'>{singleJob?.salary} LPA</Badge>
                                </div>
                            </div>
                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`mt-4 sm:mt-0 px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ${isApplied ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'}`}>
                                {isApplied ? 'Already Applied' : 'Apply Now'}
                            </Button>
                        </div>

                        <div className='space-y-6 mt-8'>
                            <div className='flex items-center'>
                                <MapPin className='w-6 h-6 mr-3 text-gray-500 dark:text-gray-400' />
                                <span className='text-lg'><strong>Location:</strong> {singleJob?.location}</span>
                            </div>
                            <div className='flex items-start'>
                                <Briefcase className='w-6 h-6 mr-3 mt-1 text-gray-500 dark:text-gray-400' />
                                <div>
                                    <strong className='text-lg'>Description:</strong>
                                    <p className='mt-1 text-gray-600 dark:text-gray-300'>{singleJob?.description}</p>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <Clock className='w-6 h-6 mr-3 text-gray-500 dark:text-gray-400' />
                                <span className='text-lg'><strong>Experience:</strong> {singleJob?.experience} years</span>
                            </div>
                            <div className='flex items-center'>
                                <DollarSign className='w-6 h-6 mr-3 text-gray-500 dark:text-gray-400' />
                                <span className='text-lg'><strong>Salary:</strong> {singleJob?.salary} LPA</span>
                            </div>
                            <div className='flex items-center'>
                                <Users className='w-6 h-6 mr-3 text-gray-500 dark:text-gray-400' />
                                <span className='text-lg'><strong>Total Applicants:</strong> {singleJob?.applications?.length}</span>
                            </div>
                            <div className='flex items-center'>
                                <CalendarDays className='w-6 h-6 mr-3 text-gray-500 dark:text-gray-400' />
                                <span className='text-lg'><strong>Posted Date:</strong> {new Date(singleJob?.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription
