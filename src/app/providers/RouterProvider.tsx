import { createBrowserRouter, RouterProvider as Router, Navigate } from 'react-router-dom';
import { AppLayout } from '@/shared/ui/Layout/AppLayout';
import { LandingLayout } from '@/shared/ui/Layout/LandingLayout';
import { AuthLayout } from '@/shared/ui/Layout/AuthLayout';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import EmailVerificationPage from '@/pages/EmailVerificationPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ResumePage } from '@/pages/ResumePage';
import { InterviewPage } from '@/pages/InterviewPage';
import { useAuth } from '@/features/auth';
import type { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    element: <LandingLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
    ]
  },
  {
    element: <AppLayout />,
    children: [
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
      { path: '/verify-email', element: <EmailVerificationPage /> },
    ],
  },
]);

export const AppRouterProvider = () => {
  return <Router router={router} />;
};
