import { Link, useNavigate } from 'react-router-dom';
import { LoginForm, useAuth } from '@/features/auth';
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
    <div className="flex w-full min-h-screen font-inter bg-bg">
      {/* Left Area (Desktop Only) */}
      <div className="hidden lg:flex flex-col justify-center gap-10 w-1/2 p-20 bg-accent text-white">
        <div className="flex flex-col gap-4">
          <h1 className="text-[44px] font-bold leading-[1.2]">다시 만나서<br/>반갑습니다 👋</h1>
          <p className="text-[16px] text-white/85 max-w-[480px]">AI 면접관과 함께 오늘도 실전 면접을 연습하세요.</p>
        </div>
        
        <div className="flex gap-10 mt-10">
          <div className="flex flex-col gap-1">
            <span className="text-[28px] font-bold">12,000+</span>
            <span className="text-[13px] text-white/75">누적 면접 세션</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[28px] font-bold">4.8★</span>
            <span className="text-[13px] text-white/75">평균 만족도</span>
          </div>
        </div>
      </div>

      {/* Right Area (Form) */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 md:p-10">
        <div className="flex flex-col gap-6 w-full max-w-[420px] lg:border-none lg:shadow-none border border-border bg-card-bg shadow-sm rounded-[24px] p-8 md:p-10">
          <div className="flex flex-col gap-3 mb-2 lg:items-start items-center">
            <div className="w-12 h-12 rounded-[14px] bg-accent lg:hidden flex self-center mb-2" />
            <h1 className="text-text-primary text-[28px] lg:text-[32px] font-bold tracking-tight lg:text-left text-center">로그인</h1>
            <p className="text-text-secondary text-[14px] lg:text-left text-center">계정에 로그인하여 면접 연습을 계속하세요.</p>
          </div>
          
          <LoginForm />

          <div className="flex items-center justify-center gap-1.5 mt-2">
            <span className="text-text-secondary font-inter text-[13px] font-normal">계정이 없으신가요?</span>
            <Link to="/signup" className="text-accent font-inter text-[13px] font-semibold hover:underline">회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
