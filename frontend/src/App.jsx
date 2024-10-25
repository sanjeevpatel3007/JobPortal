import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import About from './components/About'
import Contact from './components/Contact'
import AdminHome from './components/admin/AdminHome'
import JobDetails from './components/admin/JobDetails'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Layout><Jobs /></Layout>
  },
  {
    path: "/description/:id",
    element: (
      <ProtectedRoute>
        <Layout><JobDescription /></Layout>
      </ProtectedRoute>
    )
  },
  {
    path: "/browse",
    element: <Layout><Browse /></Layout>
  },
  {
    path: "/profile",
    element: <Layout><Profile /></Layout>
  },
  {
    path: "/about",
    element: <Layout><About /></Layout>
  },
  {
    path: "/contact",
    element: <Layout><Contact /></Layout>
  },
  // admin routes
  {
    path: "/admin",
    element: <ProtectedRoute><AdminHome /></ProtectedRoute>
  },
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },
  {
    path: "/admin/jobs/:id",
    element: <ProtectedRoute><JobDetails /></ProtectedRoute>
  },
  {
    path: "/admin/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
