import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';

export const EmailVerificationPage = () => {
  return (
    <div className="flex w-full min-h-screen font-inter bg-bg">
      {/* Left Area (Desktop Only) */}
      <div className="hidden lg:flex flex-col justify-center gap-10 w-1/2 p-20 bg-accent text-white">
        <div className="flex flex-col gap-4">
          <h1 className="text-[44px] font-bold leading-[1.2]">이메일 인증을<br/>완료해주세요 ✉️</h1>
          <p className="text-[16px] text-white/85 max-w-[480px]">인증 완료 후 모든 면접 연습 기능을 이용하실 수 있습니다.</p>
        </div>
      </div>

      {/* Right Area (Card) */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 md:p-10">
        <div className="flex flex-col items-center w-full max-w-[460px] border border-border bg-card-bg shadow-sm rounded-[24px] lg:rounded-[20px] p-8 md:p-12 gap-6">
          <div className="w-[72px] h-[72px] rounded-[36px] bg-accent-light flex items-center justify-center">
            <span className="text-[32px]">✉️</span>
          </div>
          
          <div className="flex flex-col items-center gap-2 text-center mt-2">
            <h2 className="text-[20px] lg:text-[22px] font-bold text-text-primary">인증 이메일을 보냈습니다</h2>
            <p className="text-[14px] lg:text-[15px] font-semibold text-accent">hong@example.com</p>
          </div>
          
          <p className="text-[13px] lg:text-[14px] text-text-secondary text-center leading-[1.6]">
            위 이메일로 인증 링크를 발송했습니다.<br/>받은 편지함을 확인하고 링크를 클릭해 주세요.
          </p>

          <div className="w-full h-px bg-border my-2" />

          <div className="flex flex-col items-center gap-3 w-full">
            <p className="text-[13px] text-text-muted">혹시 인증 이메일을 못 받으셨나요?</p>
            <Button variant="outline" fullWidth>이메일 재전송하기</Button>
            <p className="text-[12px] text-text-muted mt-1">재전송은 60초 후 가능합니다</p>
          </div>
          
          <Link to="/login" className="text-accent text-[13px] font-semibold hover:underline mt-2">
            로그인 화면으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
