import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Building, Briefcase, Users, PlusCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { fetchApplicants } from '../../redux/applicationSlice';

const AdminHome = () => {
  const dispatch = useDispatch();
  const { companies } = useSelector(store => store.company);
  const { allAdminJobs } = useSelector(store => store.job);
  const { applicants } = useSelector(store => store.application);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all applicants when component mounts
    dispatch(fetchApplicants());
  }, [dispatch]);

  const stats = [
    { title: 'Total Companies', value: companies.length, icon: Building, color: 'bg-blue-500', onClick: () => navigate('/admin/companies') },
    { title: 'Listed Jobs', value: allAdminJobs.length, icon: Briefcase, color: 'bg-green-500', onClick: () => navigate('/admin/jobs') },
    { title: 'Total Applicants', value: applicants?.length || 0, icon: Users, color: 'bg-purple-500', onClick: () => navigate('/admin/applicants') },
  ];

  const quickLinks = [
    { title: 'Post New Job', path: '/admin/jobs/create', icon: PlusCircle, color: 'bg-indigo-500' },
    { title: 'Add New Company', path: '/admin/companies/create', icon: Building, color: 'bg-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
     
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex items-center cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={item.onClick}
            >
              <div className={`${item.color} p-3 rounded-full mr-4`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{item.value}</h2>
                <p className="text-gray-500 dark:text-gray-400">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {quickLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={link.path} className="block">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${link.color} rounded-lg shadow-md p-6 flex items-center text-white`}
                >
                  <link.icon className="w-8 h-8 mr-4" />
                  <h3 className="text-lg font-semibold">{link.title}</h3>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Companies</h2>
            {/* Add a mini table or list of recent companies here */}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Job Posts</h2>
            {/* Add a mini table or list of recent job posts here */}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminHome;
