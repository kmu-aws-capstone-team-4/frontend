import type { Meta } from '@storybook/react';
import { 
  StatCard, PlanCard, CheckItem, TestimonialCard, FeatureCard, EmptyState, PageHeader 
} from './WireframeComps';

const meta = {
  title: 'Wireframe/Cards & States',
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="p-8 bg-bg w-full min-h-screen flex items-center justify-center font-inter"><Story /></div>]
} satisfies Meta;
export default meta;

export const StatCardExample = () => <StatCard label="총 면접 횟수" value="24" sub="이번 달 +3" />;

export const PlanCardExample = () => (
  <PlanCard 
    badge="Pro" price="₩15,000" desc="집중적으로 취업을 준비하시는 분"
    features={[
      { text: "무제한 AI 모의 면접", included: true }, 
      { text: "상세 피드백 리포트", included: true },
      { text: "심층 꼬리질문 기능", included: true }
    ]}
    btnText="시작하기"
  />
);

export const CheckItemExample = () => (
  <div className="flex flex-col gap-4">
    <CheckItem icon="📷" title="카메라" desc="카메라가 정상적으로 감지되었습니다" status="통과" />
    <CheckItem icon="🎙️" title="마이크" desc="마이크 연결을 대기 중입니다" status="대기" />
    <CheckItem icon="📡" title="네트워크" desc="네트워크 연결이 불안정합니다" status="실패" />
  </div>
);

export const TestimonialCardExample = () => (
  <TestimonialCard review="이 앱 덕분에 네카라쿠배 면접에 합격했습니다! 꼬리질문이 완벽했어요." author="취준생 김*영" />
);

export const FeatureCardExample = () => (
  <FeatureCard iconName="A" title="AI 이력서 분석" desc="이력서를 실시간으로 분석하여 직무 기반 질문을 생성합니다." />
);

export const EmptyStateExample = () => (
  <EmptyState icon="📭" title="항목이 없습니다" desc="새로운 이력서를 추가해보세요" btnText="+ 추가하기" onAction={() => {}} />
);

export const PageHeaderExample = () => (
  <PageHeader title="환영합니다!" desc="오늘도 새로운 면접 세션을 통해 역량을 키워보세요." />
);
