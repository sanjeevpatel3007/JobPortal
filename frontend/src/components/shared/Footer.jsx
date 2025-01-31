import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

    const Footer = () => {
      return (
        <footer className="relative py-8 sm:py-12 w-full overflow-hidden">
          {/* Add gradient background effect similar to hero */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[500px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[300px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
          </div>
    
          <div className="w-[100%] max-w-[1920px] mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4 sm:space-y-6"
              >
                <Link to="/" className="flex items-center space-x-2 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl sm:text-2xl">J</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                    Job<span>Lynk</span>
                  </h1>
                </Link>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Empower your career journey with JobLynk. Thousands of professionals have found their ideal job with us—join them today!
                </p>
              </motion.div>
              
              {/* Quick Links Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  {['Home', 'Jobs', 'Browse', 'About'].map((item, index) => (
                    <motion.li 
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link 
                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 flex items-center space-x-2"
                      >
                        <span className="w-1.5 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></span>
                        <span>{item}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Contact Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4"
              >
                {/* ... rest of contact section remains similar but with updated styling ... */}
              </motion.div>
              
              {/* Social Links Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
                    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
                    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' }
                  ].map((social, index) => (
                    <motion.a 
                      key={index}
                      whileHover={{ scale: 1.1, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      href={social.href} 
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-full text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl" 
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400"
            >
              <p>&copy; {new Date().getFullYear()} JobLynk. All rights reserved.</p>
            </motion.div>
          </div>
        </footer>
      );
    }

export default Footer;
