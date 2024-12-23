import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                 cursor-pointer shadow-lg hover:shadow-2xl dark:shadow-md dark:hover:shadow-xl 
                 transition-transform transform hover:scale-105 duration-300"
    >
     <div className="flex items-center gap-4 mb-4">
    {/* Left side: Logo */}
    <Avatar className="h-16 w-16 rounded-full overflow-hidden">
        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} className="object-cover h-full w-full" />
    </Avatar>

    {/* Right side: Company Name and Country */}
    <div>
        <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 tracking-wide">
            {job?.company?.name}
        </h2>
        <p className="text-sm text-gray-500">{job?.company?.country || "India"}</p>
    </div>
</div>

      <div className="mb-5">
        <h1 className="font-extrabold text-xl mb-2 text-gray-900 dark:text-white tracking-tight leading-snug">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {job?.description}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3 mt-3">
        <Badge className="px-3 py-1 text-sm bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300">
          {job?.position} Positions
        </Badge>
        <Badge className="px-3 py-1 text-sm bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300">
          {job?.jobType}
        </Badge>
        <Badge className="px-3 py-1 text-sm bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
