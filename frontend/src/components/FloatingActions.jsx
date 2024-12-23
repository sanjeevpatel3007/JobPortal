import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Target } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FloatingActions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector(store => store.auth);

  // Don't show floating actions on admin pages or login/signup pages
  const hideOnPaths = [
    '/admin',
    '/login',
    '/signup',
    '/resume-builder',
    '/ats-score'
  ];

  // Check if current path starts with any of the hide paths
  const shouldHide = hideOnPaths.some(path => 
    location.pathname.startsWith(path)
  );

  // Don't show for recruiters or on specific pages
  if (user?.role === 'recruiter' || shouldHide) {
    return null;
  }

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="fixed right-8 top-24 space-y-4 z-50">
      {/* Resume Builder Button */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => navigate('/resume-builder')}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <FileText className="w-5 h-5" />
          <span>Create Resume</span>
        </motion.button>
      </motion.div>

      {/* ATS Score Button */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => navigate('/ats-score')}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <Target className="w-5 h-5" />
          <span>ATS Score</span>
        </motion.button>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute -z-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -z-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl translate-y-20"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default FloatingActions; 