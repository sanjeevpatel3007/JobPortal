import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Layout from './Layout';
import Footer from './shared/Footer';
import { motion } from 'framer-motion';

const Contact = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    
      <div className="pt-10 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-center mb-12 text-gray-800 dark:text-white"
            {...fadeIn}
          >
            Contact <span className="text-blue-600 dark:text-blue-400">Us</span>
          </motion.h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8"
              {...fadeIn}
            >
              <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Get in Touch</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input type="text" id="name" className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input type="email" id="email" className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea id="message" rows="4" className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"></textarea>
                </div>
                <motion.button 
                  type="submit" 
                  className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} className="mr-2" /> Send Message
                </motion.button>
              </form>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8"
              {...fadeIn}
            >
              <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail size={24} className="text-blue-500 mr-4" />
                  <span className="text-gray-700 dark:text-gray-300">info@joblynk.com</span>
                </div>
                <div className="flex items-center">
                  <Phone size={24} className="text-blue-500 mr-4" />
                  <span className="text-gray-700 dark:text-gray-300">+1 (234) 567-890</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={24} className="text-blue-500 mr-4" />
                  <span className="text-gray-700 dark:text-gray-300">123 Job Street, Career City, 12345</span>
                </div>
              </div>
              <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Office Hours</h3>
                <p className="text-gray-700 dark:text-gray-300">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p className="text-gray-700 dark:text-gray-300">Saturday - Sunday: Closed</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
     
    
  );
};

export default Contact;
