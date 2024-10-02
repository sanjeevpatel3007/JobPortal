
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
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { CheckCircle, XCircle } from 'lucide-react'; // Importing icons for validation feedback

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
                navigate("/");
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
            navigate("/");
        }
    }, [user]);

    return (
        <div className='bg-[#E1D7B7] text-[#1E2A5E]  dark:bg-gray-900 dark:text-white min-h-screen'>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <div className="flex items-center">
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="Example@gmail.com"
                            />
                            {validations.email.error && <XCircle className="text-red-500 ml-2 h-5 w-5" />}
                            {validations.email.valid && <CheckCircle className="text-green-500 ml-2 h-5 w-5" />}
                        </div>
                        {validations.email.error && <p className="text-red-500 text-sm">Email is required.</p>}
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <div className="flex items-center">
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="*******"
                            />
                            {validations.password.error && <XCircle className="text-red-500 ml-2 h-5 w-5" />}
                            {validations.password.valid && <CheckCircle className="text-green-500 ml-2 h-5 w-5" />}
                        </div>
                        {validations.password.error && <p className="text-red-500 text-sm">Password is required.</p>}
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
                        {validations.role.error && <XCircle className="text-red-500 ml-2 h-5 w-5" />}
                        {validations.role.valid && <CheckCircle className="text-green-500 ml-2 h-5 w-5" />}
                    </div> */}

<div className='flex items-center justify-between'>
    <RadioGroup className="flex items-center gap-4 my-5">
        <div className="flex items-center space-x-2">
            <div 
                className={`relative flex items-center justify-center w-8 h-8 border-2 rounded-md ${input.role === 'student' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'}`}
                onClick={() => setInput({ ...input, role: 'student' })}
            >
                {input.role === 'student' && <CheckCircle className="text-white h-5 w-5" />}
            </div>
            <Label htmlFor="r1" className="cursor-pointer" onClick={() => setInput({ ...input, role: 'student' })}>
                Student
            </Label>
        </div>
        <div className="flex items-center space-x-2">
            <div 
                className={`relative flex items-center justify-center w-8 h-8 border-2 rounded-md ${input.role === 'recruiter' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'}`}
                onClick={() => setInput({ ...input, role: 'recruiter' })}
            >
                {input.role === 'recruiter' && <CheckCircle className="text-white h-5 w-5" />}
            </div>
            <Label htmlFor="r2" className="cursor-pointer" onClick={() => setInput({ ...input, role: 'recruiter' })}>
                Recruiter
            </Label>
        </div>
    </RadioGroup>
    {validations.role.error && <XCircle className="text-red-500 ml-2 h-5 w-5" />}
    {validations.role.valid && <CheckCircle className="text-green-500 ml-2 h-5 w-5" />}
</div>




                    {/* {validations.role.error && <p className="text-red-500 text-sm">Please select a role.</p>} */}
                    
                    {
                        loading ? 
                        <Button className="w-full my-4"> 
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait 
                        </Button> 
                        : 
                        <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login;


















