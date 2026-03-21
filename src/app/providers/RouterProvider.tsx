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
import { ResumeUploadPage } from '@/pages/ResumeUploadPage';
import { ResumeInputPage } from '@/pages/ResumeInputPage';
import { StreakPage } from '@/pages/StreakPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { SubscriptionPage } from '@/pages/SubscriptionPage';
import { InterviewPage } from '@/pages/InterviewPage';
import { InterviewSessionPage } from '@/pages/InterviewSessionPage';
import { JobsPage } from '@/pages/JobsPage';
import { JobAddPage } from '@/pages/JobAddPage';
import { JobEditPage } from '@/pages/JobEditPage';
import { JobDetailPage } from '@/pages/JobDetailPage';
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
        path: '/resumes/upload', 
        element: <ProtectedRoute><ResumeUploadPage /></ProtectedRoute> 
      },
      { 
        path: '/resumes/input', 
        element: <ProtectedRoute><ResumeInputPage /></ProtectedRoute> 
      },
      { 
        path: '/interview', 
        element: <ProtectedRoute><InterviewPage /></ProtectedRoute> 
      },
      { 
        path: '/streak', 
        element: <ProtectedRoute><StreakPage /></ProtectedRoute> 
      },
      { 
        path: '/settings', 
        element: <ProtectedRoute><SettingsPage /></ProtectedRoute> 
      },
      { 
        path: '/subscription', 
        element: <ProtectedRoute><SubscriptionPage /></ProtectedRoute> 
      },
      { 
        path: '/jobs', 
        element: <ProtectedRoute><JobsPage /></ProtectedRoute> 
      },
      { 
        path: '/jobs/add', 
        element: <ProtectedRoute><JobAddPage /></ProtectedRoute> 
      },
      { 
        path: '/jobs/:uuid', 
        element: <ProtectedRoute><JobDetailPage /></ProtectedRoute> 
      },
      { 
        path: '/jobs/:uuid/edit', 
        element: <ProtectedRoute><JobEditPage /></ProtectedRoute> 
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
  // Standalone: new-window interview session (no layout/nav)
  {
    path: '/interview/session',
    element: <InterviewSessionPage />,
  },
]);

export const AppRouterProvider = () => {
  return <Router router={router} />;
};
