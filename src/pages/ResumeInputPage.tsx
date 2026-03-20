import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';
import { useNavigate } from 'react-router-dom';

export const ResumeInputPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-full max-w-5xl mx-auto gap-8 pb-10">
      <PageHeader 
        title="이력서 직접 입력" 
        subtitle="항목별로 이력서 내용을 직접 입력하고 AI 분석을 받아보세요." 
        step={1} 
        totalSteps={2} 
      />

      <div className="flex flex-col gap-6 w-full px-4 md:px-0">
        
        {/* Field Title */}
        <div className="flex flex-col gap-2">
          <label className="text-text-primary font-semibold">이력서 제목 *</label>
          <Input placeholder="예) 3년차 프론트엔드 개발자 이력서" className="w-full h-12 bg-card-bg" />
        </div>

        {/* Field Summary */}
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex flex-col">
            <label className="text-text-primary font-semibold">자기소개 / 요약</label>
            <Typography variant="caption" className="text-text-secondary">자신을 가장 잘 나타내는 한 줄 소개나 핵심 역량을 요약해주세요.</Typography>
          </div>
          <textarea 
            className="w-full min-h-[120px] p-4 rounded-xl border border-border bg-card-bg text-[15px] outline-none focus:border-accent resize-none transition-colors"
            placeholder="주도적으로 문제를 해결하며, 사용자 경험을 개선하는 것을 즐깁니다..."
          />
        </div>

        {/* Field Experience */}
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex justify-between items-center">
            <label className="text-text-primary font-semibold">경력 사항</label>
            <Button variant="text" size="sm" className="text-accent hover:bg-orange-50">+ 경력 추가</Button>
          </div>
          
          <div className="flex flex-col gap-4 p-5 rounded-xl border border-border bg-card-bg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-secondary">회사명</label>
                <Input placeholder="회사명을 입력하세요" className="h-10" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-secondary">직무</label>
                <Input placeholder="직무를 입력하세요" className="h-10" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">주요 업무 및 성과</label>
              <textarea 
                className="w-full min-h-[100px] p-3 rounded-lg border border-border bg-bg text-sm outline-none focus:border-accent resize-none transition-colors"
                placeholder="- 00 서비스 신규 런칭&#10;- 성능 최적화를 통한 로딩 속도 30% 개선"
              />
            </div>
          </div>
        </div>

        {/* Submit Row */}
        <div className="flex items-center justify-end gap-3 mt-8">
          <Button variant="outline" onClick={() => navigate('/resumes')} className="px-6 h-12 text-text-secondary">취소</Button>
          <Button variant="primary" className="px-8 h-12 shadow-orange-400/30 shadow-lg" onClick={() => navigate('/resumes')}>
            저장 및 분석 시작
          </Button>
        </div>

      </div>
    </div>
  );
};
