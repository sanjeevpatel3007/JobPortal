import { lazy } from 'react';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/admin/ProtectedRoute';

const AdminHome = lazy(() => import('../components/admin/AdminHome'));
const Companies = lazy(() => import('../components/admin/Companies'));
const CompanyCreate = lazy(() => import('../components/admin/CompanyCreate'));
const CompanySetup = lazy(() => import('../components/admin/CompanySetup'));
const AdminJobs = lazy(() => import('../components/admin/AdminJobs'));
const PostJob = lazy(() => import('../components/admin/PostJob'));
const Applicants = lazy(() => import('../components/admin/Applicants'));
const JobDetails = lazy(() => import('../components/admin/JobDetails'));

export const adminRoutes = [
  {
    path: '/admin',
    element: <ProtectedRoute><MainLayout><AdminHome /></MainLayout></ProtectedRoute>
  },
  {
    path: '/admin/companies',
    element: <ProtectedRoute><MainLayout><Companies /></MainLayout></ProtectedRoute>
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoute><MainLayout><CompanyCreate /></MainLayout></ProtectedRoute>
  },
  {
    path: '/admin/companies/:id',
    element: <ProtectedRoute><MainLayout><CompanySetup /></MainLayout></ProtectedRoute>
  },
  {
    path: '/admin/jobs',
    element: <ProtectedRoute><MainLayout><AdminJobs /></MainLayout></ProtectedRoute>
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoute><MainLayout><PostJob /></MainLayout></ProtectedRoute>
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <ProtectedRoute><MainLayout><Applicants /></MainLayout></ProtectedRoute>
  },
  {
    path: '/admin/jobs/:id',
    element: <ProtectedRoute><MainLayout><JobDetails /></MainLayout></ProtectedRoute>
  },
  {
    path: '/admin/applicants',
    element: <ProtectedRoute><MainLayout><Applicants /></MainLayout></ProtectedRoute>
  }
]; 