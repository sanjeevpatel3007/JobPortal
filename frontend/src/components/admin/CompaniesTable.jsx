import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, ExternalLink } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Badge } from '../ui/badge'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(()=>{
        const filteredCompany = companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden'
        >
            <Table>
                <TableCaption>A list of your registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Website</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Jobs Posted</TableHead>
                        <TableHead>Date Registered</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.map((company, index) => (
                        <motion.tr
                            key={company._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <TableCell>
                                <div className="flex items-center space-x-3">
                                    <Avatar>
                                        <AvatarImage src={company.logo} alt={company.name} />
                                    </Avatar>
                                    <span>{company.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:underline">
                                    {company.website} <ExternalLink className="ml-1 w-4 h-4" />
                                </a>
                            </TableCell>
                            <TableCell>{company.location}</TableCell>
                            <TableCell>{company.jobsPosted || 0}</TableCell>
                            <TableCell>{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Badge variant={company.isActive ? "success" : "secondary"}>
                                    {company.isActive ? "Active" : "Inactive"}
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
                                        <motion.div 
                                            whileHover={{ backgroundColor: "#f3f4f6" }}
                                            onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                            className='flex items-center gap-2 w-full cursor-pointer p-2 rounded'
                                        >
                                            <Edit2 className='w-4' />
                                            <span>Edit Company</span>
                                        </motion.div>
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

export default CompaniesTable
