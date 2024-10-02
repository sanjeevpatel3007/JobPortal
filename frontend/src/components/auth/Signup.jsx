
import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { CheckCircle, XCircle } from 'lucide-react';

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
        <div className='dark:border-gray-700  bg-[#E1D7B7] text-[#1E2A5E]  dark:bg-gray-900 dark:text-white'>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto '>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 dark:border-gray-900 dark:bg-gray-900
'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>

                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <div className="relative">
                            <Input
                            
                                type="text"
                                value={input.fullname}
                                name="fullname"
                                onChange={changeEventHandler}
                                placeholder="Sanjeev Patel"
                                className={validations.fullname.error ? "border-red-500" : "dark:border-gray-700 dark:bg-gray-800"}
                            />
                            {validations.fullname.error && <p className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 text-sm">Full Name is required.</p>}
                        </div>
                    </div>

                    <div className='my-2'>
                        <Label>Email</Label>
                        <div className="relative">
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="Example@gmail.com"
                                className={validations.email.error ? "border-red-500" : "dark:border-gray-700 dark:bg-gray-800"}
                            />
                            {validations.email.error && <p className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 text-sm">Email is required.</p>}
                        </div>
                    </div>

                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <div className="relative">
                            <Input
                                type="text"
                                value={input.phoneNumber}
                                name="phoneNumber"
                                onChange={changeEventHandler}
                                placeholder="8100000000"
                                className={validations.phoneNumber.error ? "border-red-500" : "dark:border-gray-700 dark:bg-gray-800"}
                            />
                            {validations.phoneNumber.error && <p className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 text-sm">Phone Number is required.</p>}
                        </div>
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <div className="relative">
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="********"
                                className={validations.password.error ? "border-red-500" : "dark:border-gray-700 dark:bg-gray-800"}
                            />
                            {validations.password.error && <p className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 text-sm">Password is required.</p>}
                        </div>
                    </div>





                    {/* <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        {validations.role.error && <p className="text-red-500 text-sm">Please select a role.</p>}

                    </div> */}


<div className='flex items-center justify-between'>
    <RadioGroup className="flex items-center gap-4 my-5">
        {/* Student Option */}
        <div className="flex items-center space-x-2">
            <div 
                className={`relative flex items-center justify-center w-8 h-8 border-2 rounded-md ${input.role === 'student' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'}`}
            >
                <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                    className="opacity-0 cursor-pointer absolute inset-0 w-full h-full"
                />
                {input.role === 'student' && <CheckCircle className="text-white h-5 w-5" />}
            </div>
            <Label htmlFor="r1" className="cursor-pointer" onClick={() => setInput({ ...input, role: 'student' })}>
                Student
            </Label>
        </div>

        {/* Recruiter Option */}
        <div className="flex items-center space-x-2">
            <div 
                className={`relative flex items-center justify-center w-8 h-8 border-2 rounded-md ${input.role === 'recruiter' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'}`}
            >
                <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                    className="opacity-0 cursor-pointer absolute inset-0 w-full h-full"
                />
                {input.role === 'recruiter' && <CheckCircle className="text-white h-5 w-5" />}
            </div>
            <Label htmlFor="r2" className="cursor-pointer" onClick={() => setInput({ ...input, role: 'recruiter' })}>
                Recruiter
            </Label>
        </div>
    </RadioGroup>

    {/* Validation Error Message */}
    {validations.role.error && <p className="text-red-500 text-sm">Please select a role.</p>}
</div>

                   




                    <div className='flex items-center justify-between gap-2'>
                        <Label>Profile</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="cursor-pointer w-100 dark:border-gray-700 dark:bg-gray-800"
                          
                        />
                        {validations.file?.error && <p className="text-red-500 text-sm">Please upload an image.</p>}

                    </div>

                    



                    {
                        loading ? 
                        <Button className="w-full my-4"> 
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait 
                        </Button> 
                        : 
                        <Button type="submit" className="w-full my-4">Signup</Button>
                    }
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                </form>
            </div>
        </div>
    );
};

export default Signup;




