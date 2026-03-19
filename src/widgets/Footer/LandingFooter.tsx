import { Link } from 'react-router-dom';

export const LandingFooter = () => {
  return (
    <footer className="w-full bg-[#1C1917] flex flex-col gap-8 px-8 py-12 md:px-[120px] md:py-[48px]">
      {/* footerTop */}
      <div className="flex flex-col md:flex-row gap-16 md:gap-[60px] w-full">
        {/* footerBrand */}
        <div className="flex flex-col gap-4 w-full md:w-[320px]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent opacity-80" />
            <span className="text-white font-inter text-[18px] font-bold">MeFit</span>
          </div>
          <p className="text-[#A8A29E] font-inter text-[14px] leading-relaxed">
            AI 기반 맞춤형 면접 연습 솔루션.<br/>
            언제 어디서나 실제처럼 면접을 준비하세요.
          </p>
        </div>
        
        {/* footerLinks1 */}
        <div className="flex flex-col gap-3 flex-1">
          <h4 className="text-white font-inter text-[14px] font-semibold mb-1">제품</h4>
          <Link to="#" className="text-[#A8A29E] font-inter text-[14px] hover:text-white">주요 기능</Link>
          <Link to="#" className="text-[#A8A29E] font-inter text-[14px] hover:text-white">요금제</Link>
          <Link to="#" className="text-[#A8A29E] font-inter text-[14px] hover:text-white">이용 후기</Link>
        </div>

        {/* footerLinks2 */}
        <div className="flex flex-col gap-3 flex-1">
          <h4 className="text-white font-inter text-[14px] font-semibold mb-1">지원</h4>
          <Link to="#" className="text-[#A8A29E] font-inter text-[14px] hover:text-white">고객 센터</Link>
          <Link to="#" className="text-[#A8A29E] font-inter text-[14px] hover:text-white">자주 묻는 질문</Link>
          <Link to="#" className="text-[#A8A29E] font-inter text-[14px] hover:text-white">문의하기</Link>
        </div>

        {/* footerLinks3 */}
        <div className="flex flex-col gap-3 flex-1">
          <h4 className="text-white font-inter text-[14px] font-semibold mb-1">회사</h4>
          <Link to="#" className="text-[#A8A29E] font-inter text-[14px] hover:text-white">개인정보처리방침</Link>
          <Link to="#" className="text-[#A8A29E] font-inter text-[14px] hover:text-white">이용약관</Link>
        </div>
      </div>

      {/* footerDivider */}
      <div className="w-full h-[1px] bg-[#292524]" />

      {/* footerBottom */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-[#78716C] font-inter text-[13px]">© 2025 MeFit. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 rounded bg-[#44403C]" />
          <div className="w-6 h-6 rounded bg-[#44403C]" />
          <div className="w-6 h-6 rounded bg-[#44403C]" />
        </div>
      </div>
    </footer>
  );
};
