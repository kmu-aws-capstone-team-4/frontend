import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { ChevronLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const JobAddPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-7 max-w-4xl mx-auto w-full">
      {/* Top Bar Area */}
      <div className="flex items-center justify-between w-full">
        <Typography variant="h3" weight="bold">채용공고 추가</Typography>
        <Button variant="outline" onClick={() => navigate(-1)} className="gap-2 px-4 shadow-sm">
          <ChevronLeft size={16} />
          돌아가기
        </Button>
      </div>

      {/* Form Card */}
      <div className="flex flex-col gap-8 p-6 md:p-10 rounded-2xl border border-border bg-card-bg w-full">
        {/* URL Section */}
        <div className="flex flex-col gap-3">
          <label className="text-text-primary font-semibold text-[15px]">채용공고 URL</label>
          <Input placeholder="https://..." className="w-full h-11" />
        </div>

        <div className="w-full h-[1px] bg-border" />

        {/* Title Section */}
        <div className="flex flex-col gap-3">
          <label className="text-text-primary font-semibold text-[15px]">공고 제목 / 회사명 (선택)</label>
          <Input placeholder="입력하지 않으면 URL에서 정보를 추출하여 자동 완성됩니다." className="w-full h-11" />
        </div>

        {/* Status Section */}
        <div className="flex flex-col gap-3">
          <label className="text-text-primary font-semibold text-[15px]">지원 상태</label>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" className="h-10 px-5 rounded-lg shadow-orange-400/20 shadow-sm">지원 예정</Button>
            <Button variant="outline" className="h-10 px-5 rounded-lg bg-bg border-border text-text-secondary">지원 완료</Button>
            <Button variant="outline" className="h-10 px-5 rounded-lg bg-bg border-border text-text-secondary">관심 저장</Button>
          </div>
        </div>

        <div className="w-full h-[1px] bg-border" />

        {/* Info Box */}
        <div className="flex flex-col gap-2 p-4 md:p-5 rounded-xl bg-blue-50 border border-blue-200 w-full">
          <div className="flex items-center gap-2 text-blue-600">
            <Info size={18} />
            <Typography variant="body" weight="bold" className="text-blue-700">AI 직무 역량 분석</Typography>
          </div>
          <Typography variant="caption" className="text-blue-600/80 leading-relaxed">
            채용공고를 등록하면 AI가 요구 역량을 자동으로 분석해줍니다. 분석이 완료되면 내 이력서/포트폴리오와의 적합도를 확인하고 모의 면접을 생성할 수 있습니다.
          </Typography>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-2 w-full">
          <Button variant="text" onClick={() => navigate(-1)} className="text-text-secondary">취소</Button>
          <Button variant="primary" className="px-8 shadow-orange-400/30 shadow-lg">저장하기</Button>
        </div>
      </div>
    </div>
  );
};
