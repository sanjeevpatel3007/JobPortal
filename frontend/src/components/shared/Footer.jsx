import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-2xl">J</span>
              </div>
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 group-hover:from-blue-300 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-300">
                Job<span className="text-[#E1D7B7]">Lynk</span>
              </h1>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empower your career journey with JobLynk. Thousands of professionals have found their ideal job with us—join them today!
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Jobs', 'Browse', 'About Us'].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-400" />
                <a href="mailto:info@joblynk.com" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">info@joblynk.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-400" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin size={18} className="text-blue-400" />
                <span className="text-gray-300">123 Job Street, Career City, 12345</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">Connect With Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
                { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors duration-300" 
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} JobLynk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
