import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'; // Added Menu and X icons for mobile toggle

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import ThemeToggle from '../ThemeToggle'
import { FaBars, FaTimes } from 'react-icons/fa'; // Import the icons

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };


  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (


    <div className='dark:bg-gray-800 bg-gray-800   dark:text-white text-white'> {/* Change background color based on theme */}

      <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>


        {/* logo */}
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">J</span>
            </div>

            <h1 className="text-4xl font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Job<span className="text-[#E1D7B7 ] ">Lynk</span>
            </h1>
          </div>

        </div>

        {/* //right side */}

        <button
          onClick={toggleVisibility}
          className=" text-white  rounded-md flex text-xl mr-4 items-center md:hidden"
        >
          {isVisible ? (
            <>
              <FaTimes />
            </>
          ) : (
            <>
              <FaBars />
            </>
          )}
        </button>


        {isVisible && (
          <div className="block md:hidden bg-gray-600 mt-4 p-4 rounded-lg z-50 ">
            <div className='flex-col items-center gap-12 mt-32 '>


              {/* home job browse */}
              <ul className='flex-col font-medium items-center mr-3  gap-8'>
                {user && user.role === 'recruiter' ? (
                  <>
                    <li className='mb-2'><Link to="/admin/companies" className='text-gray-200 dark:text-white  bg-gray-700 mt-3 rounded-lg pd-2 px-3 '>Companies</Link></li>
                    <li><Link to="/admin/jobs" className='text-gray-200 dark:text-white  bg-gray-700 mt-3 rounded-lg pd-2 px-3 '>Jobs</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/" className=' text-white mt-3'>Home</Link></li>
                    <li><Link to="/jobs" className=' text-white mt-3'>Jobs</Link></li>
                    <li><Link to="/browse" className=' text-white mt-3'>Browse</Link></li>
                  </>
                )}
              </ul>

             <div className='mt-4 mb-4'>
             <ThemeToggle />

             </div>
             
              {!user ? (
                <div className='flex-col items-center gap-2'>
                  <Link to="/login">
                    <Button variant="outline" className='text-gray-900 mt-3 dark:text-white'>Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-[#55679C] mt-3 hover:bg-[#5b30a6] dark:bg-[#55679C] dark:hover:bg-purple-600">Signup</Button>
                  </Link>
                </div>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 ">
                    <div className=''>
                      <div className='flex gap-2 space-y-2'>
                        <Avatar className="cursor-pointer mt-4">
                          <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                        </Avatar>
                        <div>
                          <h4 className='font-medium'>{user?.fullname}</h4>
                          <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                        </div>
                      </div>
                      <div className='flex flex-col my-2 text-gray-600 dark:text-gray-300'>
                        {user && user.role === 'student' && (
                          <div className='flex w-fit items-center mt-4 gap-2 cursor-pointer'>
                            <User2 />
                            <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                          </div>
                        )}
                        <div className='flex w-fit items-center mt-4 gap-2 cursor-pointer'>
                          <LogOut />
                          <Button onClick={logoutHandler} variant="link">Logout</Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}




            </div>
          </div>
        )}

          {/* desktop view? */}

        <div className='hidden md:block'>
          <div className='flex items-center gap-12'>


            {/* home job browse */}
            <ul className='flex font-medium items-center gap-5'>
              {user && user.role === 'recruiter' ? (
                <>
                  <li><Link to="/admin/companies" className='text-gray-200 dark:text-white'>Companies</Link></li>
                  <li><Link to="/admin/jobs" className='text-gray-200 dark:text-white'>Jobs</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/" className=' text-white '>Home</Link></li>
                  <li><Link to="/jobs" className=' text-white'>Jobs</Link></li>
                  <li><Link to="/browse" className=' text-white'>Browse</Link></li>
                </>
              )}
            </ul>

            <ThemeToggle /> {/* Adding the ThemeToggle component here */}

            {!user ? (
              <div className='flex items-center gap-2'>
                <Link to="/login">
                  <Button variant="outline" className='text-gray-900 dark:text-white'>Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#55679C] hover:bg-[#5b30a6] dark:bg-[#55679C] dark:hover:bg-purple-600">Signup</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className=''>
                    <div className='flex gap-2 space-y-2'>
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                      </Avatar>
                      <div>
                        <h4 className='font-medium'>{user?.fullname}</h4>
                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                      </div>
                    </div>
                    <div className='flex flex-col my-2 text-gray-600 dark:text-gray-300'>
                      {user && user.role === 'student' && (
                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                          <User2 />
                          <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                        </div>
                      )}
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <LogOut />
                        <Button onClick={logoutHandler} variant="link">Logout</Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}




          </div>
        </div>


      </div>

    </div>

  )
}

export default Navbar



