import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

export const EmailVerificationPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-bg font-inter w-full overflow-hidden">
      {/* evLeft */}
      <div className="flex flex-col justify-center bg-accent text-white p-10 md:p-20 flex-1 md:w-[720px] shrink-0 gap-10">
        <h1 className="text-[32px] md:text-[44px] font-bold leading-[1.2]">
          이메일 인증을<br/>완료해주세요 ✉️
        </h1>
        <p className="text-[16px] opacity-85">
          인증 완료 후 모든 면접 연습 기능을 이용하실 수 있습니다.
        </p>
      </div>

      {/* evRight */}
      <div className="flex flex-col justify-center items-center bg-bg p-10 md:p-20 flex-1 w-full relative">
        <Link to="/" className="absolute top-10 right-10 text-text-muted hover:text-text-primary text-[14px]">
          홈으로 가기
        </Link>
        <div className="flex flex-col items-center w-full max-w-[440px] bg-card-bg border border-border rounded-[20px] p-10 md:px-12 gap-5 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-accent-light text-accent flex items-center justify-center mb-2">
            <Mail size={32} />
          </div>
          <h2 className="text-text-primary text-[22px] font-bold text-center">이메일 주소를 인증해 주세요</h2>
          <p className="text-text-secondary text-[14px] text-center leading-[1.7] mb-2">
            안녕하세요!<br/>
            MeFit에 가입해 주셔서 감사합니다.<br/>
            아래 인증 메일로 발송된 링크를 클릭하여<br/>서비스 이용을 시작하세요.
          </p>
          <div className="w-full text-center py-3 bg-muted-bg border border-border rounded-lg text-accent text-[15px] font-semibold break-all">
            hong@example.com
          </div>
          <div className="w-full h-[1px] bg-border my-2" />
          <button className="h-[52px] bg-accent hover:bg-orange-600 transition-colors text-white font-inter text-[16px] font-semibold rounded-[10px] shadow-[0_4px_14px_rgba(249,115,22,0.25)] w-full">
            인증 링크 재전송
          </button>
          
          <div className="flex flex-col items-center justify-center gap-1.5 mt-2">
            <span className="text-text-secondary font-inter text-[13px] font-normal">
              이미 계정이 있으신가요?
            </span>
            <Link to="/login" className="text-accent font-inter text-[13px] font-semibold">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmailVerificationPage;
