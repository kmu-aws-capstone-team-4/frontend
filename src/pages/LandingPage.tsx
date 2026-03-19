import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { PlanCard, TestimonialCard, FeatureCard } from '@/shared/ui/WireframeComps';

export const LandingPage = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen pb-24 font-inter">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-[120px] px-6 gap-6 max-w-3xl">
        <h1 className="text-text-primary text-[48px] font-bold leading-[1.2]">
          실전처럼 준비하는<br/>AI 면접 솔루션, <span className="text-accent">MeFit</span>
        </h1>
        <p className="text-text-secondary text-[18px]">
          당신의 이력서를 분석해 맞춤형 꼬리 질문을 던집니다.<br/>
          언제 어디서나, 부담 없이 실제 면접을 연습하세요.
        </p>
        <Link to="/signup">
          <Button size="lg" className="px-10 py-4 h-auto mt-4 text-[16px] font-semibold bg-accent text-white rounded-xl">
            무료로 시작하기
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="mt-[160px] flex flex-col items-center px-6 gap-12 w-full max-w-6xl">
        <div className="text-center">
          <h2 className="text-[32px] font-bold text-text-primary mb-4">어떻게 훈련하나요?</h2>
          <p className="text-text-secondary">MeFit만의 특별한 AI 기능을 확인해보세요.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            iconName="A" title="AI 이력서 분석" 
            desc="업로드한 이력서를 실시간으로 분석하여 직무 및 역량 기반의 맞춤형 질문을 생성합니다." 
          />
          <FeatureCard 
            iconName="Q" title="심층 꼬리질문" 
            desc="단순한 문답이 아닌, 지원자의 답변을 바탕으로 논리력과 전문성을 검증하는 꼬리질문을 이어갑니다." 
          />
          <FeatureCard 
            iconName="R" title="상세 피드백 리포트" 
            desc="면접이 종료되면 시선 처리, 목소리, 답변 내용에 대한 종합적인 피드백 리포트를 제공합니다." 
          />
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="mt-[160px] flex flex-col items-center px-6 gap-12 w-full max-w-6xl">
        <div className="text-center">
          <h2 className="text-[32px] font-bold text-text-primary mb-4">합격자들의 생생한 후기</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <TestimonialCard 
            review="MeFit 덕분에 압박 면접에 대한 두려움이 사라졌어요. 꼬리질문이 실제 네카라쿠배 면접과 너무 비슷해서 놀랐습니다!" 
            author="김*영, 프론트엔드 개발자" 
          />
          <TestimonialCard 
            review="내 이력서 기반으로 질문을 만들어주니까, 혼자 거울 보고 준비할 때보다 훨씬 효율적이었습니다. 강력 추천합니다." 
            author="박*준, 서비스 기획자" 
          />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mt-[160px] flex flex-col items-center px-6 gap-12 w-full max-w-6xl">
        <div className="text-center">
          <h2 className="text-[32px] font-bold text-text-primary mb-4">합리적인 요금제</h2>
          <p className="text-text-secondary">나에게 맞는 플랜을 선택하고 완벽한 면접을 준비하세요.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <PlanCard 
            badge="Starter" price="무료" desc="기본적인 면접 연습을 원하시는 분"
            features={[
              { text: "월 3회 AI 모의 면접", included: true },
              { text: "기본 피드백 리포트", included: true },
              { text: "심층 꼬리질문 기능", included: false }
            ]}
            btnText="시작하기"
          />
          <PlanCard 
            badge="Pro" price="₩15,000" desc="집중적으로 취업을 준비하시는 분"
            features={[
              { text: "무제한 AI 모의 면접", included: true },
              { text: "상세 피드백 리포트 (영상/음성 분석)", included: true },
              { text: "심층 꼬리질문 무제한", included: true }
            ]}
            btnText="Pro 플랜 시작하기"
          />
        </div>
      </section>
    </div>
  );
};
export default LandingPage;
