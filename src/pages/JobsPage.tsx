import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { Search } from 'lucide-react';
import { Input } from '@/shared/ui/Input';

const JobCardPlaceholder = ({ title, company, status }: { title: string, company: string, status: string }) => (
  <div className="flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card-bg w-full">
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-1">
        <Typography variant="body" weight="semibold">{title}</Typography>
        <Typography variant="caption" className="text-text-secondary">{company}</Typography>
      </div>
      <div className="px-2.5 py-1 bg-muted-bg text-text-secondary rounded-md text-xs font-medium">
        {status}
      </div>
    </div>
    <div className="flex justify-between items-center mt-2">
      <Typography variant="caption" className="text-text-muted">마감일: 2026.04.15</Typography>
      <Button variant="outline" size="sm">상세 보기</Button>
    </div>
  </div>
);

export const JobsPage = () => {
  return (
    <div className="flex flex-col gap-7 max-w-6xl mx-auto w-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full">
        <Typography variant="h3" weight="bold">채용공고 관리</Typography>
        <Button variant="primary" className="shadow-orange-400/30 shadow-lg">+ 채용공고 추가</Button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 w-full">
        <div className="relative flex-1 max-w-sm">
          <Input 
            placeholder="회사명, 직무, 키워드로 검색" 
            className="pl-10 h-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 hide-scrollbar w-full md:w-auto shrink-0">
          <Button variant="primary" size="sm" className="rounded-lg px-4 h-10">전체</Button>
          <Button variant="outline" size="sm" className="rounded-lg px-4 h-10 bg-card-bg border-border text-text-secondary">지원 예정</Button>
          <Button variant="outline" size="sm" className="rounded-lg px-4 h-10 bg-card-bg border-border text-text-secondary">지원 완료</Button>
          <Button variant="outline" size="sm" className="rounded-lg px-4 h-10 bg-card-bg border-border text-text-secondary">관심 저장</Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <JobCardPlaceholder title="프론트엔드 엔지니어" company="토스 (Toss)" status="지원 예정" />
        <JobCardPlaceholder title="백엔드 개발자" company="네이버 (NAVER)" status="지원 완료" />
        <JobCardPlaceholder title="React Native 주니어" company="카카오 (Kakao)" status="관심 저장" />
      </div>
    </div>
  );
};
