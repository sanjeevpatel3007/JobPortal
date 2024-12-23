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

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout>
      <Home />
      </Layout>
  },
  {
    path: '/login',
    element:  <Layout>  <Login /></Layout> 
  },
  {
    path: '/signup',
    element: <Layout><Signup /></Layout>
  },
  {
    path: "/jobs",
    element: <Layout><Jobs /></Layout>
  },
 
  {
    path: "/saved-jobs",
    element: <Layout><SavedJobs /></Layout>
  },
  {
    path: "/description/:id",
    element: (
      // <ProtectedRoute>
        <Layout><JobDescription /></Layout>
      // </ProtectedRoute>
    )
  },
  {
    path: "/browse",
    element: <Layout><Browse /></Layout>
  },
  {
    path:"/resume-builder",
    element:<Layout><CreateResume/></Layout>
  },
  {
    path:"/ats-score",
    element:<Layout><AtsHome/></Layout>
  
  },
  {
    path: "/resume-templates",
    element: <Layout><ViewResumeTemplate /></Layout>
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
    element: <ProtectedRoute><Layout><AdminHome /></Layout></ProtectedRoute>
  },
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Layout><Companies/></Layout></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><Layout><CompanyCreate/></Layout></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><Layout><CompanySetup/></Layout></ProtectedRoute> 
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><Layout><AdminJobs/></Layout></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><Layout><PostJob/></Layout></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Layout><Applicants/></Layout></ProtectedRoute> 
  },
  {
    path: "/admin/jobs/:id",
    element: <ProtectedRoute><Layout><JobDetails /></Layout></ProtectedRoute>
  },
  {
    path: "/admin/applicants",
    element: <ProtectedRoute><Layout><Applicants /></Layout></ProtectedRoute>
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
