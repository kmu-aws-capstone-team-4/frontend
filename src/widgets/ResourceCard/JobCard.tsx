import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { Play } from 'lucide-react';

export interface JobCardProps {
  title: string;
  company: string;
  status: '지원 예정' | '지원 완료' | '관심 저장' | '분석 중';
  deadline: string;
  onViewDetail?: () => void;
  onLinkClick?: () => void;
  onAnalyzeStart?: () => void;
}

const statusConfig = {
  '지원 예정': { bg: 'bg-accent-light', text: 'text-accent' },
  '지원 완료': { bg: 'bg-muted-bg', text: 'text-text-secondary' },
  '관심 저장': { bg: 'bg-muted-bg', text: 'text-text-secondary' },
  '분석 중': { bg: 'bg-orange-100', text: 'text-orange-500' }, // #FEF3C7 map to orange-100 roughly
};

export const JobCard = ({
  title,
  company,
  status,
  deadline,
  onViewDetail,
  onLinkClick,
  onAnalyzeStart
}: JobCardProps) => {
  const isAnalyzing = status === '분석 중';
  
  return (
    <div className={`flex flex-col gap-4 p-6 rounded-2xl border w-full ${
      isAnalyzing 
        ? 'bg-[#FFFBF7] border-accent-light border-2' 
        : 'bg-card-bg border-border border-1'
    }`}>
      {/* Top Section */}
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col gap-1.5">
          <Typography variant="body" weight="semibold">{title}</Typography>
          <Typography variant="caption" className="text-text-secondary">{company}</Typography>
        </div>
        <div className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold ${statusConfig[status].bg} ${statusConfig[status].text}`}>
          {status}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-auto w-full">
        {isAnalyzing ? (
          <div className="flex flex-col gap-1">
            <Typography variant="caption" className="text-text-secondary">AI가 직무 역량을 분석하고 있습니다...</Typography>
            <div className="w-32 h-1.5 bg-accent-light rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-accent animate-pulse rounded-full" />
            </div>
          </div>
        ) : (
          <Typography variant="caption" className="text-text-muted">마감일: {deadline}</Typography>
        )}
        
        <div className="flex items-center gap-2">
          {isAnalyzing ? (
            <Button variant="outline" size="sm" onClick={onViewDetail}>상세 보기</Button>
          ) : (
            <>
              {status === '지원 예정' && (
                <Button variant="outline" size="sm" onClick={onAnalyzeStart} className="gap-1.5">
                  <Play size={14} /> 직무 분석
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={onLinkClick}>공고 링크</Button>
              <Button variant="outline" size="sm" onClick={onViewDetail}>상세 보기</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
