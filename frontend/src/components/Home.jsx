import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import HowItWorks from './HowItWorks'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import TestimonialsSection from './TestimonialsSection'
import Footer from './shared/Footer'
import AIAssistant from './AIAssistant'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div className='bg-gradient-to-b from-[#E1D7B7] to-white dark:from-gray-900 dark:to-gray-800 text-[#1E2A5E] dark:text-white min-h-screen'>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <CategoryCarousel />
      <LatestJobs />
      <TestimonialsSection />
      <Footer />
      <AIAssistant />
    </div>
  )
}

export default Home
