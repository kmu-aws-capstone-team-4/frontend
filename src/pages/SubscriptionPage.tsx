import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { Check } from 'lucide-react';

export const SubscriptionPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full pt-10 pb-20 px-4">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="px-3.5 py-1.5 rounded-full bg-accent-light text-accent text-xs font-bold uppercase tracking-wide">Pricing</div>
        <Typography variant="h2" weight="bold" className="text-3xl md:text-4xl text-text-primary">나에게 맞는 플랜을 선택하세요</Typography>
        <Typography variant="body" className="text-text-secondary mt-2 max-w-lg">MeFit의 맞춤형 AI 면접 코칭을 통해 합격률을 높여보세요. 언제든지 요금제를 변경하거나 취소할 수 있습니다.</Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-6">
        {/* Free Plan */}
        <div className="flex flex-col p-8 bg-card-bg border border-border rounded-3xl gap-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-2">
            <span className="text-text-muted font-inter text-sm font-semibold uppercase">Free</span>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold font-inter text-text-primary">₩0</span>
              <span className="text-text-muted text-sm pb-1">/ 월</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 my-4 flex-grow">
            {['월 3회 면접 무료', '기본 질문 셋 제공', '이력서 기반 맞춤형 질문 (기본)', '음성/영상 부분 분석'].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check size={18} className="text-gray-400 shrink-0" />
                <span className="text-[15px] font-medium text-text-secondary">{f}</span>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full h-12 text-[15px] font-semibold">현재 요금제</Button>
        </div>

        {/* Pro Plan */}
        <div className="flex flex-col p-8 bg-accent rounded-3xl gap-6 shadow-[0_8px_24px_rgba(249,115,22,0.25)] scale-100 md:scale-105 origin-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 py-1.5 px-4 bg-[#FFEDD5] text-accent text-xs font-bold font-inter rounded-bl-xl uppercase tracking-wider">Most Popular</div>
          <div className="flex flex-col gap-2 relative z-10">
            <span className="text-orange-100 font-inter text-sm font-semibold uppercase">Pro</span>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold font-inter text-white">₩14,900</span>
              <span className="text-orange-200 text-sm pb-1">/ 월</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 my-4 flex-grow relative z-10">
            {['무제한 AI 모의 면접', '시크릿 전문 면접관 페르소나 적용', '이력서 & 포트폴리오 심층 분석 연동', '음성/영상/표정 복합 상세 피드백 레포트', '오답노트 및 재답변 텍스트 교정 지원'].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check size={18} className="text-orange-200 shrink-0" />
                <span className="text-[15px] font-medium text-white">{f}</span>
              </div>
            ))}
          </div>

          <Button variant="primary" className="w-full h-12 text-[15px] font-semibold bg-white text-accent hover:bg-orange-50 active:bg-orange-100 shadow-none relative z-10">업그레이드 시작하기</Button>
        </div>
      </div>
    </div>
  );
};
