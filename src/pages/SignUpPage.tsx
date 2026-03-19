import { Link, useNavigate } from 'react-router-dom';
import { SignUpForm, useAuth } from '../features/auth';
import { Typography } from '../shared/ui/Typography';
import { useEffect } from 'react';

export const SignUpPage = () => {
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
        <Typography variant="h3" weight="bold">Create an Account</Typography>
        <Typography color="muted" className="mt-2">Start your interview journey today.</Typography>
      </div>
      <SignUpForm />
      <Typography variant="caption" color="secondary">
        Already have an account? <Link to="/login" className="text-accent hover:underline">Log in</Link>
      </Typography>
    </div>
  );
};

export default SignUpPage;
