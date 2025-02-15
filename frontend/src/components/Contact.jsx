import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send ,X} from 'lucide-react';
// import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://jobportal-backend-ov5w.onrender.com/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus({
        type: 'success',
        message: 'Thank you for your message. We will get back to you soon!'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'There was an error submitting your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearStatus = () => {
    setStatus({ type: '', message: '' });
  };

  return (
    <div className="pt-2 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Contact <span className="text-blue-600 dark:text-blue-400">Us</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-semibold mb-2 text-gray-800 dark:text-white">Get in Touch</h2>
            

   {/* Alert box       */}
            {status.message && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full">
            <div className={`
              relative rounded-lg border p-4 shadow-lg
              ${status.type === 'error' 
                ? 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800/20 dark:text-red-200'
                : 'bg-blue-50 border-green-200 text-blue-800 dark:bg-green-900/20 dark:border-green-800/20 dark:text-green-200'
              }
            `}>
              {/* Alert Header */}
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold mb-2">
                  {status.type === 'error' ? 'Error' : 'Success'}
                </h3>
                <button
                  onClick={clearStatus}
                  className="ml-4 inline-flex items-center justify-center rounded-md p-1 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              {/* Alert Message */}
              <p className="text-base">
                {status.message}
              </p>
            </div>
          </div>
        </div>
      )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  required 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  required 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                <Send size={18} className="mr-2" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;