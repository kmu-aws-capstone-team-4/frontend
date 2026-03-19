import type { ReactNode } from 'react';
import { Button } from '../Button';

export const StatCard = ({ label, value, sub }: { label: string; value: string | number; sub?: ReactNode }) => {
  return (
    <div className="flex flex-col gap-2 p-6 rounded-2xl bg-card-bg border border-border w-full min-w-[200px] max-w-[260px]">
      <span className="text-text-secondary font-inter text-[13px] font-normal">{label}</span>
      <span className="text-text-primary font-inter text-[32px] font-bold">{value}</span>
      {sub && <span className="text-accent font-inter text-[12px] font-normal">{sub}</span>}
    </div>
  );
};

export const PlanCard = ({ 
  badge, price, desc, features, btnText 
}: { 
  badge: string; price: string; desc: string; features: { text: string; included: boolean }[]; btnText: string; 
}) => {
  return (
    <div className="flex flex-col gap-4 p-8 rounded-2xl bg-card-bg border border-border w-full max-w-[360px]">
      <span className="text-text-secondary font-inter text-[12px] font-semibold">{badge}</span>
      <span className="text-text-primary font-inter text-[36px] font-bold">{price}</span>
      <span className="text-text-secondary font-inter text-[14px] font-normal mb-2">{desc}</span>
      
      <div className="flex flex-col gap-2 w-full">
        {features.map((f, i) => (
          <span key={i} className={`font-inter text-[14px] font-normal ${f.included ? 'text-text-secondary' : 'text-text-muted'}`}>
            {f.included ? '✓' : '✗'} {f.text}
          </span>
        ))}
      </div>
      
      <Button className="w-full mt-4 h-11 bg-border text-text-secondary rounded-lg font-inter text-[14px] font-semibold">
        {btnText}
      </Button>
    </div>
  );
};

export const CheckItem = ({ icon, title, desc, status }: { icon: string; title: string; desc: string; status: '통과' | '대기' | '실패' }) => {
  const statusClasses = {
    '통과': { box: 'bg-[#DCFCE7] border-[#22C55E40]', badge: 'bg-[#DCFCE7] text-[#16A34A]', iconBg: 'bg-[#DCFCE7]' },
    '대기': { box: 'bg-orange-50 border-orange-200', badge: 'bg-orange-50 text-orange-600', iconBg: 'bg-orange-50' },
    '실패': { box: 'bg-red-50 border-red-200', badge: 'bg-red-50 text-red-600', iconBg: 'bg-red-50' },
  };

  const style = statusClasses[status];

  return (
    <div className={`flex items-center gap-4 h-[72px] px-5 rounded-xl bg-card-bg border w-full max-w-[400px] ${style.box}`}>
      <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${style.iconBg} shrink-0`}>
        <span className="font-inter text-[16px]">{icon}</span>
      </div>
      <div className="flex flex-col gap-[3px] flex-1">
        <span className="text-text-primary font-inter text-[14px] font-semibold">{title}</span>
        <span className="text-text-secondary font-inter text-[12px] font-normal">{desc}</span>
      </div>
      <div className={`px-3 py-1 rounded-full text-[12px] font-semibold ${style.badge}`}>
        {status}
      </div>
    </div>
  );
};

export const TestimonialCard = ({ review, author }: { review: string; author: string }) => {
  return (
    <div className="flex flex-col gap-3 p-7 rounded-xl bg-card-bg border border-border w-full max-w-[360px]">
      <span className="text-accent font-inter text-[14px]">★★★★★</span>
      <span className="text-text-secondary font-inter text-[14px] leading-relaxed">"{review}"</span>
      <span className="text-text-muted font-inter text-[12px] mt-1">— {author}</span>
    </div>
  );
};

export const FeatureCard = ({ iconName, title, desc }: { iconName: string; title: string; desc: string }) => {
  return (
    <div className="flex flex-col gap-3 p-6 rounded-2xl bg-card-bg border border-border w-full max-w-[320px]">
      <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center text-white mb-1">
        <span className="font-inter font-bold">{iconName[0]}</span>
      </div>
      <span className="text-text-primary font-inter text-[16px] font-semibold">{title}</span>
      <span className="text-text-secondary font-inter text-[13px] leading-relaxed">{desc}</span>
    </div>
  );
};

export const EmptyState = ({ icon, title, desc, btnText, onAction }: { icon: string; title: string; desc: string; btnText: string; onAction: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl bg-card-bg border border-border w-full max-w-[480px] mx-auto">
      <div className="w-16 h-16 rounded-[24px] bg-muted-bg flex items-center justify-center text-[28px]">
        {icon}
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-text-primary font-inter text-[16px] font-semibold">{title}</span>
        <span className="text-text-secondary font-inter text-[14px] font-normal">{desc}</span>
      </div>
      <Button onClick={onAction} className="mt-2 text-[14px] px-6 py-3 h-auto font-semibold rounded-lg bg-accent text-white">
        {btnText}
      </Button>
    </div>
  );
};

export const PageHeader = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="flex flex-col gap-1 w-full max-w-[500px]">
      <span className="text-text-primary font-inter text-[24px] font-bold">{title}</span>
      <span className="text-text-secondary font-inter text-[14px] font-normal">{desc}</span>
    </div>
  );
};
