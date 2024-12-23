import React, { useState, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X, LayoutDashboard } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import ThemeToggle from '../ThemeToggle'

const Navbar = () => {
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (user && user.role === 'recruiter' && location.pathname === '/login') {
      navigate('/admin')
    }
  }, [user, location, navigate])

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setUser(null))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const NavLinks = () => {
    if (user && user.role === 'recruiter') {
      return (
        <>
          <Link to="/admin" className='nav-link flex items-center'>
            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
          </Link>
          <Link to="/jobs" className='nav-link'>Jobs</Link>
          <Link to="/contact" className='nav-link'>Contact</Link>
        </>
      )
    } else {
      return (
        <>
          <Link to="/" className='nav-link'>Home</Link>
          {/* <Link to="/resume-builder" className='nav-link ' >resume create</Link> */}
          {/* <Link to="/ats-score" className='nav-link' >view Resume Score</Link> */}
          <Link to="/jobs" className='nav-link'>Jobs</Link>
          <Link to="/browse" className='nav-link'>Browse</Link>
          <Link to="/about" className='nav-link'>About</Link>
          <Link to="/contact" className='nav-link'>Contact</Link>
        </>
      )
    }
  }

  return (
    <nav className='bg-white dark:bg-gray-900 text-gray-800 dark:text-white  top-0 left-0 right-0 z-50 shadow-md w-full h-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link to={user && user.role === 'recruiter' ? "/admin" : "/"} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">J</span>
            </div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Job<span className="text-yellow-400">Lynk</span>
            </h1>
          </Link>

          {/* Desktop menu */}
          <div className='hidden md:flex items-center space-x-6'>
            <NavLinks />
            <ThemeToggle />
            {!user ? (
              <div className='flex items-center space-x-3'>
                <Link to="/login">
                  <Button variant="outline" className='text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300'>Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300">Signup</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer border-2 border-blue-500 hover:border-blue-600 transition-colors duration-300">
                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                  <div className='space-y-4'>
                    <div className='flex items-center space-x-3'>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                      </Avatar>
                      <div>
                        <h4 className='font-medium text-lg'>{user?.fullname}</h4>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>{user?.profile?.bio}</p>
                      </div>
                    </div>
                    {user.role === 'student' && (
                      <Button variant="outline" className='w-full hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-300' onClick={() => navigate('/profile')}>
                        <User2 className="mr-2 h-4 w-4" /> View Profile
                      </Button>
                    )}
                    {user.role === 'recruiter' && (
                      <Button variant="outline" className='w-full hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-300' onClick={() => navigate('/admin')}>
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Admin Dashboard
                      </Button>
                    )}
                    <Button variant="outline" className='w-full hover:bg-red-50 dark:hover:bg-red-900 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-300' onClick={logoutHandler}>
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300'>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-white dark:bg-gray-900 shadow-lg animate-fadeIn'>
          <div className='px-2 pt-2 pb-3 space-y-1'>
            <NavLinks />
          </div>
          <div className='pt-4 pb-3 border-t border-gray-200 dark:border-gray-700'>
            <div className='flex items-center justify-between px-5'>
              <ThemeToggle />
              {!user ? (
                <div className='flex items-center space-x-2'>
                  <Link to="/login">
                    <Button variant="outline" className='text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300'>Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300">Signup</Button>
                  </Link>
                </div>
              ) : (
                <div className='flex items-center space-x-3'>
                  <Avatar className="h-10 w-10 border-2 border-blue-500">
                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                  </Avatar>
                  <div>
                    <h4 className='font-medium'>{user?.fullname}</h4>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>{user?.email}</p>
                  </div>
                </div>
              )}
            </div>
            {user && (
              <div className='mt-3 px-2 space-y-1'>
                {user.role === 'student' && (
                  <Button variant="ghost" className='w-full justify-start hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-300' onClick={() => navigate('/profile')}>
                    <User2 className="mr-2 h-4 w-4" /> View Profile
                  </Button>
                )}
                {user.role === 'recruiter' && (
                  <Button variant="ghost" className='w-full justify-start hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-300' onClick={() => navigate('/admin')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Admin Dashboard
                  </Button>
                )}
                <Button variant="ghost" className='w-full justify-start hover:bg-red-50 dark:hover:bg-red-900 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-300' onClick={logoutHandler}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
