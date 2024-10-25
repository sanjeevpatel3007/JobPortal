import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, FileText, Mail, Phone } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';

const shortlistingStatus = ["Accepted", "Rejected", "Pending"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden'
        >
            <Table>
                <TableCaption>A list of recent job applicants</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Job Applied</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date Applied</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants && applicants?.applications?.map((item, index) => (
                        <motion.tr 
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <TableCell>
                                <div className="font-medium">{item?.applicant?.fullname}</div>
                                <div className="text-sm text-gray-500">{item?.applicant?.email}</div>
                            </TableCell>
                            <TableCell>{item?.job?.title}</TableCell>
                            <TableCell>
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 mr-2" />
                                    <a href={`mailto:${item?.applicant?.email}`} className="text-blue-500 hover:underline">{item?.applicant?.email}</a>
                                </div>
                                <div className="flex items-center mt-1">
                                    <Phone className="w-4 h-4 mr-2" />
                                    <a href={`tel:${item?.applicant?.phoneNumber}`} className="text-blue-500 hover:underline">{item?.applicant?.phoneNumber}</a>
                                </div>
                            </TableCell>
                            <TableCell>
                                {item.applicant?.profile?.resume ? (
                                    <a className="flex items-center text-blue-600 hover:underline cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                                        <FileText className="w-4 h-4 mr-2" />
                                        {item?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span className="text-gray-500">Not available</span>
                                )}
                            </TableCell>
                            <TableCell>{new Date(item?.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Badge variant={item.status === 'Accepted' ? 'success' : item.status === 'Rejected' ? 'destructive' : 'secondary'}>
                                    {item.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                            <MoreHorizontal className="cursor-pointer" />
                                        </motion.div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40">
                                        {shortlistingStatus.map((status, index) => (
                                            <motion.div 
                                                key={index}
                                                whileHover={{ backgroundColor: "#f3f4f6" }}
                                                onClick={() => statusHandler(status, item?._id)} 
                                                className='flex w-full items-center my-2 cursor-pointer p-2 rounded'
                                            >
                                                <span>{status}</span>
                                            </motion.div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </motion.tr>
                    ))}
                </TableBody>
            </Table>
        </motion.div>
    )
}

export default ApplicantsTable
