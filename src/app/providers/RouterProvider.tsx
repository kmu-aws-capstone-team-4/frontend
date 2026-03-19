import { createBrowserRouter, RouterProvider as Router, Navigate } from 'react-router-dom';
import { MainLayout, AuthLayout } from '../../shared/ui/Layout';
import LandingPage from '../../pages/LandingPage';
import LoginPage from '../../pages/LoginPage';
import SignUpPage from '../../pages/SignUpPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { ResumePage } from '../../pages/ResumePage';
import { InterviewPage } from '../../pages/InterviewPage';
import { useAuth } from '../../features/auth';
import type { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { 
        path: '/dashboard', 
        element: <ProtectedRoute><DashboardPage /></ProtectedRoute> 
      },
      { 
        path: '/resumes', 
        element: <ProtectedRoute><ResumePage /></ProtectedRoute> 
      },
      { 
        path: '/interview', 
        element: <ProtectedRoute><InterviewPage /></ProtectedRoute> 
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignUpPage /> },
    ],
  },
]);

export const AppRouterProvider = () => {
  return <Router router={router} />;
};
