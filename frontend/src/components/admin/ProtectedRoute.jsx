import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {user} = useSelector(store=>store.auth);
    const location = useLocation();

    const navigate = useNavigate();
    useEffect(() => {
        // If user is not logged in, redirect to login and show a toast
        if (!user) {
          toast.error('Please log in to access this page.');
          navigate('/login', { state: { from: location }, replace: true });
        }
      }, [user, navigate, location]);
    
      // If there's no user, we already redirected, so return null here
      if (!user) {
        return null;
      }
    
    return (
        <>
        {children}
        </>
    )
};
export default ProtectedRoute;