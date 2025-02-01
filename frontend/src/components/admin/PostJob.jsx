import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useNavigate } from 'react-router-dom'
import { Briefcase, ArrowLeft, DollarSign, MapPin, Clock, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { Textarea } from '@/components/ui/textarea'
import { successToast, errorToast } from '@/utils/toast'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        experience: "",
        location: "",
        jobType: "",
        position: "",
        company: ""
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, company: selectedCompany._id });
        setErrors({ ...errors, company: "" });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!input.title.trim()) newErrors.title = "Job title is required";
        if (!input.description.trim()) newErrors.description = "Job description is required";
        if (!input.requirements.trim()) newErrors.requirements = "At least one requirement is needed";
        if (!input.salary || input.salary <= 0) newErrors.salary = "Please enter a valid salary";
        if (!input.experience || input.experience < 0) newErrors.experience = "Please enter a valid experience level";
        if (!input.location.trim()) newErrors.location = "Location is required";
        if (!input.jobType.trim()) newErrors.jobType = "Job type is required";
        if (!input.position || input.position <= 0) newErrors.position = "Please enter a valid number of positions";
        if (!input.company) newErrors.company = "Please select a company";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            if (!input.company) {
                errorToast("Please select a company before posting a job");
                return;
            }

            const processedRequirements = input.requirements
                .split('\n')
                .map(req => req.trim())
                .filter(req => req && req !== 'Responsibilities:')
                .join(', ');

            const formattedInput = {
                title: input.title,
                description: input.description,
                requirements: processedRequirements,
                salary: parseFloat(input.salary),
                experience: parseInt(input.experience),
                location: input.location,
                jobType: input.jobType,
                position: parseInt(input.position),
                companyId: input.company
            };
            
            const res = await axios({
                method: 'post',
                url: `${JOB_API_END_POINT}/post`,
                data: formattedInput,
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                successToast(res.data.message || 'Job posted successfully!');
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error("Job posting error:", error);
            
            if (error.response) {
                if (error.response.status === 400) {
                    errorToast(error.response.data.message || "Invalid job data. Please check your inputs.");
                } else if (error.response.status === 401) {
                    errorToast("Unauthorized. Please log in again.");
                } else if (error.response.status === 404) {
                    errorToast("Job posting endpoint not found. Please contact support.");
                } else {
                    errorToast("An unexpected error occurred while posting the job.");
                }
            } else if (error.request) {
                errorToast("No response received from the server. Please check your internet connection.");
            } else {
                errorToast("Error setting up job posting request.");
            }
        }
    };

    return (
        <div className='bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen pt-5'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-4xl mx-auto px-4 py-8'
            >
                <div className='bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8'>
                    <div className='flex items-center mb-6'>
                        <Briefcase className="w-12 h-12 text-blue-500 mr-4" />
                        <div>
                            <h1 className='font-bold text-3xl text-gray-800 dark:text-white'>Post New Job</h1>
                            <p className='text-gray-500 dark:text-gray-400 mt-1'>Fill in the details to create a new job listing</p>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className='space-y-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div>
                                <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">Job Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    name="title"
                                    placeholder="e.g., Senior React Developer"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                                    required
                                />
                                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                            </div>
                            <div>
                                <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">Job Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="We are seeking a talented Senior React Developer to join our dynamic team. The ideal candidate will have strong experience in building scalable web applications using React and related technologies."
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                    required
                                    rows={4}
                                />
                                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                            </div>
                            <div>
                                <Label htmlFor="requirements" className="text-sm font-medium text-gray-700 dark:text-gray-300">Requirements (comma-separated)</Label>
                                <Textarea
                                    id="requirements"
                                    name="requirements"
                                    placeholder="5+ years of experience with React, Strong knowledge of JavaScript and ES6+, Experience with Redux or similar state management libraries, Familiarity with RESTful APIs and GraphQL"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.requirements ? 'border-red-500' : 'border-gray-300'}`}
                                    rows={4}
                                />
                                {errors.requirements && <p className="mt-1 text-xs text-red-500">{errors.requirements}</p>}
                            </div>
                            <div>
                                <Label htmlFor="salary" className="text-sm font-medium text-gray-700 dark:text-gray-300">Salary (per annum)</Label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <DollarSign className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="salary"
                                        type="number"
                                        name="salary"
                                        placeholder="120000"
                                        value={input.salary}
                                        onChange={changeEventHandler}
                                        className={`pl-10 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.salary ? 'border-red-500' : 'border-gray-300'}`}
                                        required
                                    />
                                </div>
                                {errors.salary && <p className="mt-1 text-xs text-red-500">{errors.salary}</p>}
                            </div>
                            <div>
                                <Label htmlFor="experience" className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience Level (years)</Label>
                                <Input
                                    id="experience"
                                    type="number"
                                    name="experience"
                                    placeholder="5"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.experience ? 'border-red-500' : 'border-gray-300'}`}
                                    required
                                />
                                {errors.experience && <p className="mt-1 text-xs text-red-500">{errors.experience}</p>}
                            </div>
                            <div>
                                <Label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</Label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="location"
                                        type="text"
                                        name="location"
                                        placeholder="San Francisco, CA (Remote OK)"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        className={`pl-10 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                                        required
                                    />
                                </div>
                                {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
                            </div>
                            <div>
                                <Label htmlFor="jobType" className="text-sm font-medium text-gray-700 dark:text-gray-300">Job Type</Label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Clock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="jobType"
                                        type="text"
                                        name="jobType"
                                        placeholder="Full-time"
                                        value={input.jobType}
                                        onChange={changeEventHandler}
                                        className={`pl-10 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.jobType ? 'border-red-500' : 'border-gray-300'}`}
                                        required
                                    />
                                </div>
                                {errors.jobType && <p className="mt-1 text-xs text-red-500">{errors.jobType}</p>}
                            </div>
                            <div>
                                <Label htmlFor="position" className="text-sm font-medium text-gray-700 dark:text-gray-300">Number of Positions</Label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Users className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="position"
                                        type="number"
                                        name="position"
                                        placeholder="2"
                                        value={input.position}
                                        onChange={changeEventHandler}
                                        className={`pl-10 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.position ? 'border-red-500' : 'border-gray-300'}`}
                                        required
                                    />
                                </div>
                                {errors.position && <p className="mt-1 text-xs text-red-500">{errors.position}</p>}
                            </div>
                        </div>

                        {companies.length > 0 && (
                            <div>
                                <Label htmlFor="company" className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Company</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger id="company" className={`w-full mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.company ? 'border-red-500' : ''}`}>
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company.name.toLowerCase()}>{company.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
                            </div>
                        )}

                        <div className='flex items-center justify-between mt-8'>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/admin")}
                                className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-300"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Jobs
                            </Button>
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <span>Post Job</span>
                                <Briefcase size={18} />
                            </Button>
                        </div>
                    </form>

                    {companies.length === 0 && (
                        <p className='text-sm text-red-600 font-bold text-center mt-4'>
                            *Please register a company first, before posting a job
                        </p>
                    )}
                </div>
            </motion.div>
        </div>
    )
}

export default PostJob
