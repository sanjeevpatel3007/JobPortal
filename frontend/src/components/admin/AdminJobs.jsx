import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { motion } from 'framer-motion'
import { Plus, Search } from 'lucide-react'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className='dark:bg-gray-900 bg-gray-50 min-h-screen'>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='max-w-6xl mx-auto my-10 px-4'
      >
        <div className='flex pt-16 flex-col sm:flex-row items-center justify-between my-5 space-y-4 sm:space-y-0'>
          <div className='relative w-full sm:w-64'>
            <Input
              className="pl-10 pr-4 py-2 w-full"
              placeholder="Filter by name, role"
              onChange={(e) => setInput(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => navigate("/admin/jobs/create")}
              className="w-full sm:w-auto flex items-center justify-center"
            >
              <Plus size={18} className="mr-2" />
              New Job
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <AdminJobsTable onJobClick={(jobId) => navigate(`/admin/jobs/${jobId}`)} />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AdminJobs
