import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { motion } from 'framer-motion'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const validate = () => {
        let errors = {};
        if (!input.name) errors.name = "Company name is required";
        if (!input.description) errors.description = "Description is required";
        if (!input.website) errors.website = "Website is required";
        if (!input.location) errors.location = "Location is required";
        if (!input.file && !singleCompany.logo) errors.file = "Logo is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast.error("Please fill all the required fields.");
            return;
        }
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);

    return (
        <div className='bg-gray-50 dark:bg-gray-900 min-h-screen pt-20'>
           
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-2xl mx-auto px-4 py-8'
            >
                <div className='bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8'>
                    <div className='flex items-center mb-6'>
                        <Building2 className="w-10 h-10 text-blue-500 mr-4" />
                        <div>
                            <h1 className='font-bold text-3xl text-gray-800 dark:text-white'>Company Setup</h1>
                            <p className='text-gray-500 dark:text-gray-400 mt-1'>Update your company information</p>
                        </div>
                    </div>
                    <form onSubmit={submitHandler} className='space-y-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div>
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</Label>
                                <Input 
                                    id="name"
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                />
                                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                            </div>
                            <div>
                                <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</Label>
                                <Input
                                    id="description"
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                />
                                {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                            </div>
                            <div>
                                <Label htmlFor="website" className="text-sm font-medium text-gray-700 dark:text-gray-300">Website</Label>
                                <Input
                                    id="website"
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                                    type="text"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                />
                                {errors.website && <span className="text-red-500 text-sm">{errors.website}</span>}
                            </div>
                            <div>
                                <Label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</Label>
                                <Input
                                    id="location"
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                />
                                {errors.location && <span className="text-red-500 text-sm">{errors.location}</span>}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="logo" className="text-sm font-medium text-gray-700 dark:text-gray-300">Logo</Label>
                            <Input
                                id="logo"
                                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                            {errors.file && <span className="text-red-500 text-sm">{errors.file}</span>}
                        </div>
                        <div className='flex items-center justify-between mt-8'>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/admin/companies")}
                                className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-300"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Companies
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Please wait
                                    </>
                                ) : (
                                    'Update Company'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default CompanySetup;





