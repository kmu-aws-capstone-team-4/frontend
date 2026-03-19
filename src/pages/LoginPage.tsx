import { Link, useNavigate } from 'react-router-dom';
import { LoginForm, useAuth } from '../features/auth';
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
    <div className="flex flex-col items-center gap-6 p-10 w-full max-w-[420px] border border-border shadow-sm rounded-[24px] mx-auto mt-20 bg-card-bg">
      <div className="flex flex-col items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-[14px] bg-accent" />
        <h1 className="text-text-primary text-[24px] font-bold font-inter tracking-tight">MeFit 로그인</h1>
      </div>
      
      <LoginForm />

      <div className="flex items-center justify-center gap-1.5 mt-2">
        <span className="text-text-secondary font-inter text-[13px] font-normal">계정이 없으신가요?</span>
        <Link to="/signup" className="text-accent font-inter text-[13px] font-semibold hover:underline">회원가입</Link>
      </div>
    </div>
  );
};

export default LoginPage;
