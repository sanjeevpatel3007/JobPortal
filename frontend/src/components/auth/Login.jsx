import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { Loader2, Mail, Lock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import AuthCTA from './AuthCTA';
import {InterviewCTA } from "./InterviewCTA";


const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateField = (name, value) => {
        switch (name) {
            case 'email':
                return !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? 'Invalid email address' : '';
            case 'password':
                return value.length < 6 ? 'Password must be at least 6 characters' : '';
            default:
                return '';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(input).forEach(key => {
            const error = validateField(key, input[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error('Please fill in all fields correctly.');
            return;
        }
        try {
            setIsLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                if (res.data.user.role === 'recruiter') {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

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
        <div className='min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className='bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8'>
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className='text-center mb-8'
                        >
                            <h2 className='text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                                Welcome back
                            </h2>
                            <p className='mt-2 text-gray-600 dark:text-gray-400'>
                                Sign in to continue your journey
                            </p>
                        </motion.div>

                        <form onSubmit={submitHandler} className='space-y-6'>
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className='space-y-4'
                            >
                                {/* Email */}
                                <div>
                                    <Label htmlFor='email' className='text-gray-700 dark:text-gray-300'>Email Address</Label>
                                    <div className='relative mt-1 group'>
                                        <Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors' size={18} />
                                        <Input
                                            id='email'
                                            name='email'
                                            type='email'
                                            className={cn(
                                                'pl-10 border-2 transition-all duration-200',
                                                'focus:ring-2 focus:ring-offset-2',
                                                errors.email 
                                                    ? 'border-red-500 focus:ring-red-500' 
                                                    : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500',
                                                'group-hover:border-indigo-400'
                                            )}
                                            disabled={isLoading}
                                            value={input.email}
                                            onChange={handleInputChange}
                                            placeholder='you@example.com'
                                        />
                                        {errors.email && (
                                            <motion.p 
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className='text-red-500 text-xs mt-1'
                                            >
                                                {errors.email}
                                            </motion.p>
                                        )}
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <Label htmlFor='password' className='text-gray-700 dark:text-gray-300'>Password</Label>
                                    <div className='relative mt-1 group'>
                                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors' size={18} />
                                        <Input
                                            id='password'
                                            name='password'
                                            type='password'
                                            className={cn(
                                                'pl-10 border-2 transition-all duration-200',
                                                'focus:ring-2 focus:ring-offset-2',
                                                errors.password 
                                                    ? 'border-red-500 focus:ring-red-500' 
                                                    : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500',
                                                'group-hover:border-indigo-400'
                                            )}
                                            disabled={isLoading}
                                            value={input.password}
                                            onChange={handleInputChange}
                                            placeholder='••••••••'
                                        />
                                        {errors.password && (
                                            <motion.p 
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className='text-red-500 text-xs mt-1'
                                            >
                                                {errors.password}
                                            </motion.p>
                                        )}
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <Button
                                        type='submit'
                                        disabled={isLoading}
                                        className='w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2'
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className='animate-spin' size={20} />
                                                <span>Signing in...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Sign in</span>
                                                <ArrowRight size={18} />
                                            </>
                                        )}
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </form>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className='mt-6 text-center text-sm text-gray-600 dark:text-gray-400'
                        >
                            Don't have an account?{' '}
                            <Link 
                                to='/signup' 
                                className='font-medium text-indigo-600 hover:text-indigo-500 transition-colors'
                            >
                                Sign up
                            </Link>
                        </motion.p>
                    </div>
                    <InterviewCTA />
                </motion.div>
        


                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <AuthCTA />
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
