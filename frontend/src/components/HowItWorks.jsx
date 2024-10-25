import React from 'react'
import { UserPlus, Search, FileCheck } from 'lucide-react'

const HowItWorks = () => {
    return (
        <div className='bg-white dark:bg-gray-800 py-16'>
            <div className='max-w-7xl mx-auto px-4'>
                <h2 className='text-3xl font-bold text-center mb-12'>How It Works</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    <div className='text-center'>
                        {/* <UserPlus className='w-16 h-16 mx-auto mb-4 text-[#55679C]' /> */}
                        <img src="/signup.jpg" alt="Sign Up" className='w-32 h-32 mx-auto mb-4 text-[#55679C]' />
                        <h3 className='text-xl font-semibold mb-2'>Sign Up</h3>
                        <p>Create your account and complete your profile to get started.</p>
                    </div>
                    <div className='text-center'>
                       
                        {/* <Search className='w-16 h-16 mx-auto mb-4 text-[#55679C]' /> */}
                        <img src="/search.jpg" alt="Search" className='w-32 h-32 mx-auto mb-4 text-[#55679C]' />
                        <h3 className='text-xl font-semibold mb-2'>Search Perfect Job</h3>
                        <p>Browse through our extensive job listings to find your ideal position.</p>
                    </div>
                    <div className='text-center'>
                        {/* <FileCheck className='w-16 h-16 mx-auto mb-4 text-[#55679C]' /> */}
                        <img src="/apply.jpg" alt="Apply" className='w-32 h-32 mx-auto mb-4 text-[#55679C]' />
                        <h3 className='text-xl font-semibold mb-2'>Apply</h3>
                        <p>Submit your application with ease and track your application status.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks
