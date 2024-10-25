import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div className='bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-md overflow-hidden'>
            <Table>
                <TableCaption className="text-gray-500 dark:text-gray-400">A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100 dark:bg-gray-700">
                        <TableHead className="font-semibold">Date</TableHead>
                        <TableHead className="font-semibold">Job Role</TableHead>
                        <TableHead className="font-semibold">Company</TableHead>
                        <TableHead className="text-right font-semibold">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-gray-500 dark:text-gray-400">
                                You haven't applied to any jobs yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <TableCell>{new Date(appliedJob?.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="font-medium">{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={`
                                        ${appliedJob?.status === "rejected" ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 
                                          appliedJob.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}
                                        px-2 py-1 rounded-full text-xs font-semibold
                                    `}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
