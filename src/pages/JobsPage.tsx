import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/shared/ui/Input';
import { JobCard } from '@/widgets/ResourceCard/JobCard';
import { Link, useNavigate } from 'react-router-dom';

export const JobsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-7 max-w-6xl mx-auto w-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full">
        <Typography variant="h3" weight="bold">채용공고 관리</Typography>
        <Link to="/jobs/add">
          <Button variant="primary" className="shadow-orange-400/30 shadow-lg px-5 gap-2">
            <Plus size={18} />
            채용공고 추가
          </Button>
        </Link>
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
        <JobCard 
          title="프론트엔드 엔지니어" company="토스 (Toss)" status="지원 예정" deadline="2026.04.15" 
          onViewDetail={() => navigate('/jobs/123e4567-e89b-12d3-a456-426614174000')}
        />
        <JobCard 
          title="UX/UI 디자이너" company="당근마켓 (Daangn)" status="분석 중" deadline="2026.05.01" 
          onViewDetail={() => navigate('/jobs/analyzing')}
        />
        <JobCard 
          title="백엔드 개발자" company="네이버 (NAVER)" status="지원 완료" deadline="2026.04.01" 
          onViewDetail={() => navigate('/jobs/987e6543-e21b-12d3-a456-426614174111')}
        />
        <JobCard 
          title="React Native 주니어" company="카카오 (Kakao)" status="관심 저장" deadline="2026.05.15" 
          onViewDetail={() => navigate('/jobs/555e4444-e33b-12d3-a456-426614174222')}
        />
      </div>
    </div>
  );
};
