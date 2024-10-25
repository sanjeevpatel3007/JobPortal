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
import { Loader2, Mail, Lock } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [validations, setValidations] = useState({
        email: { valid: false, error: false },
        password: { valid: false, error: false },
        role: { valid: false, error: false },
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const validateForm = () => {
        const newValidations = {
            email: { valid: input.email.trim() !== '', error: input.email.trim() === '' },
            password: { valid: input.password.trim() !== '', error: input.password.trim() === '' },
            role: { valid: input.role !== '', error: input.role === '' },
        };
        setValidations(newValidations);
        return Object.values(newValidations).every(field => field.valid);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error('Please fill in all fields correctly.');
            return;
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                if (res.data.user.role === 'recruiter') {
                    navigate("/admin"); // Redirect recruiters to dashboard
                } else {
                    navigate("/"); // Redirect students to home
                }
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            if (user.role === 'recruiter') {
                navigate("/admin");
            } else {
                navigate("/");
            }
        }
    }, [user, navigate]);

    return (
        <div className='bg-gradient-to-r pt-20 from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 min-h-screen text-gray-800 dark:text-white'>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-md w-full space-y-8'>
                    <div>
                        <h2 className='mt-6 text-center text-3xl font-extrabold'>
                            Sign in to your account
                        </h2>
                    </div>
                    <form onSubmit={submitHandler} className='mt-8 space-y-6 bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-8'>
                        <div className='rounded-md shadow-sm -space-y-px'>
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
                                    'Sign in'
                                )}
                            </Button>
                        </div>
                    </form>
                    <p className='mt-2 text-center text-sm text-gray-600 dark:text-gray-400'>
                        Don't have an account?{' '}
                        <Link to='/signup' className='font-medium text-indigo-600 hover:text-indigo-500'>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;
