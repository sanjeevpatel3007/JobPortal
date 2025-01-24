import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Target, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      transition: {
        duration: 0.2,
      }
    }
  };

  // Desktop view
  const DesktopButtons = () => (
    <div className="hidden sm:flex flex-col gap-2">
      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <Link 
          to="/resume-builder"
          className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <FileText size={18} className="mr-2" />
          <span>Create Resume</span>
        </Link>
      </motion.div>

      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <Link 
          to="/ats-score"
          className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <Target size={18} className="mr-2" />
          <span>ATS Score</span>
        </Link>
      </motion.div>
    </div>
  );

  // Mobile view
  const MobileButtons = () => (
    <div className="sm:hidden">
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={24} /> : <Plus size={24} />}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="absolute bottom-full right-0 mb-2 min-w-[160px]"
          >
            <div className="flex flex-col gap-2">
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link 
                  to="/resume-builder"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  <FileText size={18} className="mr-2" />
                  <span>Create Resume</span>
                </Link>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link 
                  to="/ats-score"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Target size={18} className="mr-2" />
                  <span>ATS Score</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="fixed sm:top-24 sm:right-4 bottom-20 right-4 z-40">
      <DesktopButtons />
      <MobileButtons />
    </div>
  );
};

export default FloatingActions; 