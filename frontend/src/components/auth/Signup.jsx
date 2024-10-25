import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2, CheckCircle, User, Mail, Phone, Lock, Upload } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const [validations, setValidations] = useState({
        fullname: { valid: false, error: false },
        email: { valid: false, error: false },
        phoneNumber: { valid: false, error: false },
        password: { valid: false, error: false },
        role: { valid: false, error: false },
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const validateForm = () => {
        const newValidations = {
            fullname: { valid: input.fullname.trim() !== '', error: input.fullname.trim() === '' },
            email: { valid: input.email.trim() !== '', error: input.email.trim() === '' },
            phoneNumber: { valid: input.phoneNumber.trim() !== '', error: input.phoneNumber.trim() === '' },
            password: { valid: input.password.trim() !== '', error: input.password.trim() === '' },
            role: { valid: input.role !== '', error: input.role === '' },
            file: { valid: !!input.file, error: !input.file },  // Validation for file

        };
        setValidations(newValidations);
        return Object.values(newValidations).every(field => field.valid);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error('Please fill in all fields correctly.');
            return;
        }

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className='bg-gradient-to-r pt-10 from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 min-h-screen text-gray-800 dark:text-white'>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-md w-full space-y-8'>
                    <div>
                        <h2 className='mt-6 text-center text-3xl font-extrabold'>
                            Create your account
                        </h2>
                    </div>
                    <form onSubmit={submitHandler} className='mt-8 space-y-6 bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-8'>
                        <div className='rounded-md shadow-sm -space-y-px'>
                            <div className='mb-4'>
                                <Label htmlFor='fullname' className='sr-only'>Full Name</Label>
                                <div className='relative'>
                                    <User className='absolute top-3 left-3 h-5 w-5 text-gray-400' />
                                    <Input
                                        id='fullname'
                                        name='fullname'
                                        type='text'
                                        required
                                        className='pl-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                                        placeholder='Full Name'
                                        value={input.fullname}
                                        onChange={changeEventHandler}
                                    />
                                </div>
                            </div>
                            <div className='mb-4'>
                                <Label htmlFor='email' className='sr-only'>Email address</Label>
                                <div className='relative'>
                                    <Mail className='absolute top-3 left-3 h-5 w-5 text-gray-400' />
                                    <Input
                                        id='email'
                                        name='email'
                                        type='email'
                                        autoComplete='email'
                                        required
                                        className='pl-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                                        placeholder='Email address'
                                        value={input.email}
                                        onChange={changeEventHandler}
                                    />
                                </div>
                            </div>
                            <div className='mb-4'>
                                <Label htmlFor='phoneNumber' className='sr-only'>Phone Number</Label>
                                <div className='relative'>
                                    <Phone className='absolute top-3 left-3 h-5 w-5 text-gray-400' />
                                    <Input
                                        id='phoneNumber'
                                        name='phoneNumber'
                                        type='tel'
                                        required
                                        className='pl-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                                        placeholder='Phone Number'
                                        value={input.phoneNumber}
                                        onChange={changeEventHandler}
                                    />
                                </div>
                            </div>
                            <div className='mb-4'>
                                <Label htmlFor='password' className='sr-only'>Password</Label>
                                <div className='relative'>
                                    <Lock className='absolute top-3 left-3 h-5 w-5 text-gray-400' />
                                    <Input
                                        id='password'
                                        name='password'
                                        type='password'
                                        autoComplete='current-password'
                                        required
                                        className='pl-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                                        placeholder='Password'
                                        value={input.password}
                                        onChange={changeEventHandler}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center justify-between space-x-4'>
                            <div className='flex items-center'>
                                <Input
                                    id='role-student'
                                    name='role'
                                    type='radio'
                                    value='student'
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300'
                                />
                                <Label htmlFor='role-student' className='ml-2 block text-sm text-gray-900 dark:text-gray-300'>
                                    Student
                                </Label>
                            </div>
                            <div className='flex items-center'>
                                <Input
                                    id='role-recruiter'
                                    name='role'
                                    type='radio'
                                    value='recruiter'
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300'
                                />
                                <Label htmlFor='role-recruiter' className='ml-2 block text-sm text-gray-900 dark:text-gray-300'>
                                    Recruiter
                                </Label>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor='file' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Profile Picture</Label>
                            <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                                <div className='space-y-1 text-center'>
                                    <Upload className='mx-auto h-12 w-12 text-gray-400' />
                                    <div className='flex text-sm text-gray-600'>
                                        <label htmlFor='file' className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'>
                                            <span>Upload a file</span>
                                            <Input id='file' name='file' type='file' className='sr-only' onChange={changeFileHandler} />
                                        </label>
                                        <p className='pl-1'>or drag and drop</p>
                                    </div>
                                    <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Button
                                type='submit'
                                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Please wait
                                    </>
                                ) : (
                                    'Sign up'
                                )}
                            </Button>
                        </div>
                    </form>
                    <p className='mt-2 text-center text-sm text-gray-600 dark:text-gray-400'>
                        Already have an account?{' '}
                        <Link to='/login' className='font-medium text-indigo-600 hover:text-indigo-500'>
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
