import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Upload } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { successToast, errorToast } from '@/utils/toast';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const { user } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: null,
    });

    const resumeUrl = user?.profile?.resume;
    const resumeName = user?.profile?.resumeOriginalName || "Previous Resume";

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        
        if (input.file) {
            formData.append("file", input.file);
        } else if (resumeUrl) {
            formData.append("file", resumeUrl);
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                successToast(res.data.message || 'Profile updated successfully!');
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            errorToast(error.response?.data?.message || 'Failed to update profile. Please try again.');
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="fullname"
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="w-full"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="w-full"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="number">Phone Number</Label>
                            <Input
                                id="number"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="w-full"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="bio">Bio</Label>
                            <Input
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="w-full"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="skills">Skills (comma-separated)</Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="w-full"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="file">Resume</Label>
                            <div className="flex items-center space-x-2">
                                {input.file ? (
                                    <span className='text-sm text-gray-600 dark:text-gray-400'>{input.file.name}</span>
                                ) : resumeUrl ? (
                                    <a 
                                        target='_blank' 
                                        rel='noopener noreferrer' 
                                        href={resumeUrl} 
                                        className='text-blue-500 hover:underline text-sm'
                                    >
                                        {resumeName}
                                    </a>
                                ) : (
                                    <span className='text-sm text-gray-400'>No resume uploaded</span>
                                )}
                                <label htmlFor="file" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md inline-flex items-center text-sm">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload New
                                </label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                        >
                            Update Profile
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
