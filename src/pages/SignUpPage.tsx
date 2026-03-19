import { Link, useNavigate } from 'react-router-dom';
import { SignUpForm, useAuth } from '@/features/auth';
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
    <div className="flex w-full min-h-screen font-inter bg-bg">
      {/* Left Area (Desktop Only) */}
      <div className="hidden lg:flex flex-col justify-center gap-10 w-1/2 p-20 bg-accent text-white">
        <div className="flex flex-col gap-4">
          <h1 className="text-[44px] font-bold leading-[1.2]">면접 합격의<br/>첫 걸음 🚀</h1>
          <p className="text-[16px] text-white/85 max-w-[480px]">지금 가입하고 AI 면접관과 함께 실전 면접을 무료로 연습해보세요.</p>
        </div>
        
        <div className="flex flex-col gap-4 mt-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-accent font-bold text-[13px]">1</div>
            <span className="text-[14px]">이메일로 계정 생성</span>
          </div>
          <div className="flex items-center gap-3 opacity-70">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/30 text-white font-bold text-[13px]">2</div>
            <span className="text-[14px]">이메일 인증 완료</span>
          </div>
          <div className="flex items-center gap-3 opacity-70">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/30 text-white font-bold text-[13px]">3</div>
            <span className="text-[14px]">프로필 작성 후 면접 시작</span>
          </div>
        </div>
      </div>

      {/* Right Area (Form) */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 md:p-10">
        <div className="flex flex-col gap-6 w-full max-w-[420px] lg:border-none lg:shadow-none border border-border bg-card-bg shadow-sm rounded-[24px] p-8 md:p-10">
          <div className="flex flex-col gap-2 mb-2 lg:items-start items-center">
            <div className="w-12 h-12 rounded-[14px] bg-accent lg:hidden flex self-center mb-2" />
            <h1 className="text-text-primary text-[28px] lg:text-[32px] font-bold tracking-tight lg:text-left text-center">회원가입</h1>
            <p className="text-text-secondary text-[14px] lg:text-left text-center">무료로 시작하세요. 신용카드 불필요.</p>
          </div>
          
          <SignUpForm />

          <div className="flex items-center justify-center gap-1.5 mt-2">
            <span className="text-text-secondary font-inter text-[13px] font-normal">이미 계정이 있으신가요?</span>
            <Link to="/login" className="text-accent font-inter text-[13px] font-semibold hover:underline">로그인</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
