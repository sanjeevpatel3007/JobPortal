import React from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Briefcase, Users, Building, Star } from 'lucide-react';
import { Button } from './ui/button';

const FloatingIllustration = ({ children, delay, duration, className }) => (
  <motion.div
    className={className}
    animate={{
      y: [0, -20, 0],
      rotate: [-2, 2, -2],
    }}
    transition={{
      duration: duration || 6,
      repeat: Infinity,
      delay: delay || 0,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

const HeroSection = () => {
  const stats = [
    { icon: Briefcase, label: "Active Jobs", value: "1000+" },
    { icon: Users, label: "Job Seekers", value: "50k+" },
    { icon: Building, label: "Companies", value: "200+" },
  ];

  const FeaturedCompanies = () => {
    const companies = [
      { name: 'Google', color: 'from-blue-500 to-green-500' },
      { name: 'Microsoft', color: 'from-blue-600 to-indigo-600' },
      { name: 'Amazon', color: 'from-orange-500 to-yellow-500' },
      { name: 'Meta', color: 'from-blue-500 to-purple-500' },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute bottom-4 left-0 max-w-xs"
      >
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Featured Companies
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {companies.map((company, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className={`
                  absolute inset-0 bg-gradient-to-r ${company.color} opacity-10 
                  group-hover:opacity-20 rounded-lg transition-opacity
                `} />
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-lg p-2 flex items-center justify-center shadow-sm"
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {company.name}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-3 text-xs text-center text-gray-500 dark:text-gray-400"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            Join 200+ leading companies
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-24">
      {/* Floating SVG Illustrations */}
      <FloatingIllustration
        delay={0}
        className="absolute top-20 left-10 w-24 h-24 hidden lg:block"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-indigo-500/20">
          <path
            fill="currentColor"
            d="M45,-77.2C58.3,-70.3,69.3,-57.5,75.9,-42.8C82.4,-28.1,84.5,-11.5,83.2,4.7C81.9,20.9,77.2,36.6,68.3,49.5C59.3,62.4,46.2,72.5,31.5,77.9C16.8,83.3,0.5,84,-15.8,81.1C-32.1,78.2,-48.4,71.8,-61.8,60.9C-75.2,50,-85.7,34.6,-89.1,17.8C-92.5,0.9,-88.9,-17.4,-81.9,-33.8C-74.9,-50.2,-64.6,-64.8,-50.8,-71.6C-37,-78.5,-19.7,-77.7,-1.9,-74.8C15.9,-71.9,31.8,-84.1,45,-77.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </FloatingIllustration>

      <FloatingIllustration
        delay={1}
        duration={7}
        className="absolute top-40 right-20 w-32 h-32 hidden lg:block"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-purple-500/20">
          <path
            fill="currentColor"
            d="M42.7,-73.4C55.9,-67.3,67.7,-56.6,76.6,-43.2C85.5,-29.8,91.6,-14.9,90.5,-0.6C89.4,13.6,81.2,27.3,72.1,39.7C63,52.1,53.1,63.3,40.9,70.9C28.7,78.5,14.4,82.5,-0.2,82.8C-14.7,83.2,-29.4,79.8,-42.4,72.6C-55.4,65.3,-66.7,54.2,-74.8,41C-82.9,27.8,-87.8,12.4,-86.8,-2.3C-85.8,-17,-78.9,-31.1,-70.3,-43.6C-61.7,-56.1,-51.4,-67,-39.1,-73.1C-26.8,-79.3,-13.4,-80.7,0.8,-82C15,-83.3,29.5,-79.5,42.7,-73.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </FloatingIllustration>

      <FloatingIllustration
        delay={2}
        duration={8}
        className="absolute bottom-20 left-1/4 w-28 h-28 hidden lg:block"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-pink-500/20">
          <path
            fill="currentColor"
            d="M37.9,-64.3C49,-56.5,57.9,-45.5,65.9,-33.1C73.9,-20.7,81,-6.9,80.3,6.7C79.7,20.3,71.3,33.7,61.6,44.7C51.9,55.7,41,64.3,28.5,69.1C16,73.9,1.9,74.9,-12.9,73.6C-27.7,72.4,-43.2,69,-56.1,60.4C-69,51.8,-79.3,38.1,-83.7,22.7C-88.1,7.3,-86.6,-9.7,-80.8,-24.5C-75,-39.3,-64.9,-51.8,-52.1,-59.2C-39.3,-66.6,-23.8,-68.9,-9.2,-67.1C5.4,-65.3,26.8,-72.1,37.9,-64.3Z"
            transform="translate(100 100)"
          />
        </svg>
      </FloatingIllustration>

      <div className="max-w-8xl min-h-96 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center relative z-10"
        >
          {/* Gradient Circles */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent relative">
            Find Your Dream Job Today
            <motion.div
              className="absolute -top-6 -right-6 text-pink-500 opacity-75"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ✨
            </motion.div>
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
            Connect with top employers and opportunities that match your skills
          </p>


          {/* Search Bar with enhanced styling */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="relative flex items-center w-full group">
              {/* Search Icon */}
              <Search className="absolute left-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />

              {/* Input Field */}
              <input
                type="text"
                placeholder="Search jobs, companies, or keywords..."
                className="w-full pl-12 pr-4 py-3 rounded-l-lg border-r-transparent  border-2 border-r-0 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-all group-hover:border-indigo-300"
              />

              {/* Search Button */}
              <Button
                className="px-6 py-6 rounded-r-lg border-l-0 rounded-l-none  bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Search <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Button>
            </div>
          </motion.div>




          {/* Stats with enhanced animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-4 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-4"
              >
                <div className="flex-shrink-0">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center"
                  >
                    <stat.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </motion.div>
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                </div>
                <div className="flex-shrink-0">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                    className="text-indigo-500/50"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <FeaturedCompanies />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
