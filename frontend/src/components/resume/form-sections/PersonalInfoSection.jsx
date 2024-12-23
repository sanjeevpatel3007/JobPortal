import React from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { User, Upload } from 'lucide-react';

const PersonalInfoSection = ({ formData, handlePersonalInfoChange, handleImageUpload }) => {
    return (
        <section>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Left Section: Full Name */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                        Personal Information
                    </h2>

                    <div className="mb-4">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            value={formData.personalInfo.fullName}
                            onChange={handlePersonalInfoChange}
                            placeholder="Sanjeev Patel"
                        />
                    </div>
                </div>

                {/* Right Section: Profile Image */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                        {formData.personalInfo.profileImage ? (
                            <img
                                src={formData.personalInfo.profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <User className="w-12 h-12 text-gray-400" />
                            </div>
                        )}
                        <div className="absolute bottom-2 right-11 bg-white dark:bg-gray-800 p-1 rounded-full cursor-pointer">
                            <Upload
                                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                                onClick={() => document.getElementById('profileImage').click()}
                            />
                        </div>
                    </div>
                    <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>
            </div>

            {/* All Other Data Below */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.personalInfo.email}
                        onChange={handlePersonalInfoChange}
                        placeholder="sanjeev@example.com"
                    />
                </div>
                <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        name="phone"
                        value={formData.personalInfo.phone}
                        onChange={handlePersonalInfoChange}
                        placeholder="+91 234567890"
                    />
                </div>
                <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        name="location"
                        value={formData.personalInfo.location}
                        onChange={handlePersonalInfoChange}
                        placeholder="New York, NY"
                    />
                </div>
                <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                        id="linkedin"
                        name="linkedin"
                        value={formData.personalInfo.linkedin}
                        onChange={handlePersonalInfoChange}
                        placeholder="linkedin.com/in/sanjeev"
                    />
                </div>
                <div>
                    <Label htmlFor="portfolio">Portfolio Website</Label>
                    <Input
                        id="portfolio"
                        name="portfolio"
                        value={formData.personalInfo.portfolio}
                        onChange={handlePersonalInfoChange}
                        placeholder="sanjeev.com"
                    />
                </div>
            </div>
        </section>
    );
};

export default PersonalInfoSection;
