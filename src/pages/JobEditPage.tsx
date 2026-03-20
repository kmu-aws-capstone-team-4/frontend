import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export const JobEditPage = () => {
  const navigate = useNavigate();
  // const { uuid } = useParams(); // Could use UUID to fetch generic info

  return (
    <div className="flex flex-col gap-7 max-w-4xl mx-auto w-full">
      {/* Top Bar Area */}
      <div className="flex items-center justify-between w-full">
        <Typography variant="h3" weight="bold">채용공고 수정</Typography>
        <Button variant="outline" onClick={() => navigate(-1)} className="gap-2 px-4 shadow-sm">
          <ChevronLeft size={16} />
          돌아가기
        </Button>
      </div>

      {/* Form Card */}
      <div className="flex flex-col gap-8 p-6 md:p-10 rounded-2xl border border-border bg-card-bg w-full">
        {/* URL Section */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-text-primary font-semibold text-[15px]">채용공고 URL *</label>
            <Typography variant="caption" className="text-text-secondary">URL을 변경하면 공고 내용이 재분석됩니다.</Typography>
          </div>
          <Input defaultValue="https://toss.im/career/job-detail?job_id=123" className="w-full h-11 border-accent" />
        </div>

        <div className="w-full h-[1px] bg-border" />

        {/* Title Section */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-text-primary font-semibold text-[15px]">공고 제목 (선택사항)</label>
            <Typography variant="caption" className="text-text-secondary">입력하지 않으면 크롤링된 공고 제목이 자동으로 사용됩니다.</Typography>
          </div>
          <Input defaultValue="프론트엔드 엔지니어 - 토스" className="w-full h-11" />
        </div>

        {/* Status Section */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-text-primary font-semibold text-[15px]">지원 상태</label>
            <Typography variant="caption" className="text-text-secondary">이 채용공고에 대한 현재 지원 상태를 선택하세요.</Typography>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" className="h-10 px-5 rounded-lg shadow-orange-400/20 shadow-sm">지원 예정</Button>
            <Button variant="outline" className="h-10 px-5 rounded-lg bg-bg border-border text-text-secondary">지원 완료</Button>
            <Button variant="outline" className="h-10 px-5 rounded-lg bg-bg border-border text-text-secondary">관심 저장</Button>
          </div>
        </div>

        <div className="w-full h-[1px] bg-border" />

        {/* Actions */}
        <div className="flex items-center justify-between w-full mt-2">
          {/* Delete Button Area (Left) */}
          <Button variant="outline" className="text-red-500 border-red-200 bg-red-50 hover:bg-red-100 hover:text-red-600 px-6 h-12">
            삭제하기
          </Button>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate(-1)} className="px-6 h-12 text-text-secondary">취소</Button>
            <Button variant="primary" className="px-8 h-12 shadow-orange-400/30 shadow-lg">저장하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
