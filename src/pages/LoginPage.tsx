import { Link, useNavigate } from 'react-router-dom';
import { LoginForm, useAuth } from '../features/auth';
import { Typography } from '../shared/ui/Typography';
import { useEffect } from 'react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="text-center">
        <Typography variant="h3" weight="bold">Welcome Back</Typography>
        <Typography color="muted" className="mt-2">Enter your details to sign in.</Typography>
      </div>
      <LoginForm />
      <Typography variant="caption" color="secondary">
        Don't have an account? <Link to="/signup" className="text-accent hover:underline">Sign up</Link>
      </Typography>
    </div>
  );
};

export default LoginPage;
