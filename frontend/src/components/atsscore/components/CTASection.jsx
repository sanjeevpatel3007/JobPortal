import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 opacity-10"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="white"
            d="M45.4,-51.6C58.8,-39.5,69.5,-24.3,71.7,-7.8C73.9,8.7,67.6,26.5,56.2,39.1C44.8,51.7,28.3,59.2,11.2,61.9C-5.9,64.6,-23.6,62.5,-39.4,53.9C-55.2,45.3,-69,30.3,-73.3,12.4C-77.6,-5.5,-72.3,-26.2,-60,-41.2C-47.7,-56.2,-28.4,-65.4,-9.5,-64.5C9.4,-63.6,31.9,-63.7,45.4,-51.6Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-48 h-48 opacity-10"
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="white"
            d="M42.7,-62.9C50.9,-52.8,50.1,-34.6,51.7,-19.2C53.4,-3.8,57.4,8.8,55.4,21.2C53.4,33.6,45.3,45.8,33.7,53.5C22.1,61.2,7,64.4,-8.9,63.6C-24.8,62.8,-41.5,58,-54.4,47.3C-67.3,36.6,-76.5,20,-77.1,3C-77.7,-14,-69.8,-31.4,-57.6,-42.2C-45.4,-53,-28.9,-57.2,-12.8,-57.7C3.3,-58.2,34.5,-73,42.7,-62.9Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>

      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white mb-4">
          Create an ATS-Optimized Resume
        </h2>
        <p className="text-blue-100 mb-6">
          Use our professional resume builder to create a perfectly formatted, ATS-friendly resume in minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/resume-builder')}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
          >
            Create Resume Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/resume-templates')}
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            View Templates
          </motion.button>
        </div>
      </div>
    </div>
  );
} 