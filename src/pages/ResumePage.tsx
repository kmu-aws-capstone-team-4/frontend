import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { ResumeItem } from '@/features/resume/ui/ResumeItem';
import { Upload, PenTool, Loader2, FileDown, Plus, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ResumePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <Typography variant="h3" weight="bold">이력서 관리</Typography>
        <Button variant="primary" className="shadow-orange-400/30 shadow-lg px-5 gap-2" onClick={() => navigate('/resumes/upload')}>
          <Plus size={18} />
          이력서 추가
        </Button>
      </div>

      {/* Upload Promo Card */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 rounded-2xl bg-muted-bg border-2 border-accent-light w-full gap-6">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center text-accent shrink-0">
            <Upload size={24} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Typography variant="body" weight="bold" className="text-[17px]">이력서를 업로드하거나 직접 입력하세요</Typography>
            <Typography variant="caption" className="text-text-secondary">PDF, DOCX 파일 업로드 또는 자유 텍스트 입력 가능</Typography>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="outline" className="h-11 px-5 border-border bg-white text-text-primary gap-2 w-full md:w-auto" onClick={() => navigate('/resumes/input')}>
            <PenTool size={16} />
            직접 작성
          </Button>
          <Button variant="primary" className="h-11 px-6 shadow-sm gap-2 w-full md:w-auto" onClick={() => navigate('/resumes/upload')}>
            <FileDown size={16} />
            파일 업로드
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-5 w-full">
        <Typography variant="body" weight="bold" className="text-[17px] mb-2">등록된 이력서</Typography>

        {/* Analyzing Card (Yellow) */}
        <div className="flex items-center justify-between p-5 md:p-6 rounded-2xl bg-[#FFFBEB] border border-[#FCD34D] w-full">
          <div className="flex flex-col gap-1">
            <Typography variant="body" weight="semibold" className="text-[#92400E]">이력서_최종_진짜최종.pdf</Typography>
            <Typography variant="caption" className="text-[#B45309]">AI가 이력서의 역량 키워드를 추출하고 있습니다...</Typography>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#FCD34D] flex items-center justify-center text-[#92400E] shrink-0 animate-spin">
            <Loader2 size={16} />
          </div>
        </div>

        {/* Active Resume Items */}
        {/* Reusing ResumeItem built in Phase 2 */}
        <ResumeItem 
          title="3년차 프론트엔드 엔지니어 이력서"
          type="직접 작성"
          date="2026.03.15"
          active={true}
          isDefault={true}
        />
        <ResumeItem 
          title="Toss 지원용 이력서.pdf"
          type="파일 업로드"
          date="2026.03.10"
          active={false}
          isDefault={false}
        />

        {/* Inactive Card (Failed/Expired/Error) */}
        <div className="flex items-center justify-between p-5 rounded-2xl bg-card-bg border border-border w-full opacity-60">
          <div className="flex flex-col gap-1">
            <Typography variant="body" weight="semibold" className="text-text-secondary line-through decoration-1 text-opacity-70">예전_이력서(분석실패).docx</Typography>
            <Typography variant="caption" className="text-red-500 font-medium flex items-center gap-1">
              <AlertCircle size={12} />
              지원할 수 없는 파일 형식입니다.
            </Typography>
          </div>
          <Button variant="outline" size="sm" className="text-text-secondary">삭제</Button>
        </div>
      </div>
    </div>
  );
};
