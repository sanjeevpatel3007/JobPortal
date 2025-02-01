import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { publicRoutes } from './routes/publicRoutes';
import { adminRoutes } from './routes/adminRoutes';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs"
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import About from './components/About'
import Contact from './components/Contact'
import AdminHome from './components/admin/AdminHome'
import JobDetails from './components/admin/JobDetails'
import CreateResume from './components/resume/CreateResume'
import AtsHome from './components/atsscore/AtsHome'
import SavedJobs from './components/SavedJobs'
import ViewResumeTemplate from './components/atsscore/components/ViewResumeTemplate'
import NotFound from './components/NotFound'

const appRouter = createBrowserRouter([
  ...publicRoutes,
  ...adminRoutes
]);

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={appRouter} />
        <Toaster position="top-right" />
      </Suspense>
    </div>
  );
}

export default App;
