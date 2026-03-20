import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { ChevronLeft, Edit, ExternalLink } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';

export const JobDetailPage = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();

  // In a real app we would load from MSW/API based on the UUID.
  const isAnalyzing = uuid === 'analyzing';

  return (
    <div className="flex flex-col gap-7 max-w-6xl mx-auto w-full">
      {/* Top Bar Area */}
      <div className="flex items-center justify-between w-full">
        <Typography variant="h3" weight="bold">
          {isAnalyzing ? 'UX/UI 디자이너 - 당근마켓 (Daangn)' : '프론트엔드 엔지니어 - 토스 (Toss)'}
        </Typography>
        <div className="flex items-center gap-2">
          <Link to={`/jobs/${uuid || '123e4567-e89b-12d3-a456-426614174000'}/edit`}>
            <Button variant="outline" className="gap-2 px-4 shadow-sm h-10">
              <Edit size={16} />
              수정
            </Button>
          </Link>
          <Button variant="outline" onClick={() => navigate('/jobs')} className="gap-2 px-4 shadow-sm h-10">
            <ChevronLeft size={16} />
            목록으로
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
        {/* Left Column - Main Details */}
        <div className="flex-1 flex flex-col gap-5 w-full">
          {/* Info Summary */}
          <div className="flex flex-col gap-6 p-8 rounded-2xl border border-border bg-card-bg w-full">
            <div className="flex justify-between items-start w-full">
              <div className="flex flex-col gap-2">
                <Typography variant="h4" weight="bold">채용공고 요약</Typography>
                <a href="#" className="flex items-center gap-1 text-accent hover:underline">
                  <Typography variant="body" weight="medium">원문 공고 보러가기</Typography>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
            <div className="w-full h-[1px] bg-border" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
              <div className="flex flex-col gap-1">
                <Typography variant="caption" className="text-text-secondary">모집 기한</Typography>
                <Typography variant="body" weight="medium">2026.04.15</Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" className="text-text-secondary">경력</Typography>
                <Typography variant="body" weight="medium">경력무관</Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" className="text-text-secondary">근무 형태</Typography>
                <Typography variant="body" weight="medium">정규직</Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="caption" className="text-text-secondary">기술 스택</Typography>
                <Typography variant="body" weight="medium">React, TypeScript</Typography>
              </div>
            </div>
          </div>

          {/* Analysis View */}
          <div className="flex flex-col gap-4 p-8 rounded-2xl border border-border bg-card-bg w-full min-h-[400px]">
            <div className="flex justify-between items-center w-full">
              <Typography variant="h4" weight="bold">AI 직무 역량 분석 결과</Typography>
            </div>
            
            {isAnalyzing ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 animate-pulse pt-10">
                <div className="w-16 h-16 rounded-full border-4 border-accent-light border-t-accent animate-spin" />
                <Typography variant="body" className="text-text-secondary">분석이 진행 중입니다. 잠시만 기다려주세요...</Typography>
              </div>
            ) : (
              <div className="flex flex-col gap-6 mt-4">
                {/* Mock Content */}
                <div className="flex flex-col gap-2">
                  <Typography variant="body" weight="semibold">주요 업무</Typography>
                  <ul className="list-disc pl-5 text-text-secondary space-y-1">
                    <li>토스증권 프론트엔드 서비스 개발 및 유지보수</li>
                    <li>웹 성능 최적화 및 사용자 경험 개선</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <Typography variant="body" weight="semibold">자격 요건</Typography>
                  <ul className="list-disc pl-5 text-text-secondary space-y-1">
                    <li>React.js 기반 앱 개발 경험이 있으신 분</li>
                    <li>TypeScript 활용 능력이 뛰어나신 분</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Status & Actions */}
        <div className="flex flex-col gap-4 w-full lg:w-[360px] shrink-0">
          
          {isAnalyzing ? (
            /* Analyzing Status Card */
            <div className="flex flex-col gap-4 p-7 rounded-2xl bg-card-bg border-accent-light border-2 w-full">
               <Typography variant="body" weight="bold">분석 중</Typography>
               <Typography variant="caption" className="text-text-secondary leading-relaxed w-64">
                 AI가 채용공고를 분석하고 있습니다. 완료 후 면접 질문 생성에 활용됩니다.
               </Typography>
               <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                 <div className="w-2/3 h-full bg-accent animate-pulse" />
               </div>
               <Typography variant="caption" className="text-text-muted text-[12px]">보통 1~2분 소요됩니다</Typography>
            </div>
          ) : (
            /* Practice Card */
            <div className="flex flex-col gap-4 p-7 rounded-2xl bg-accent text-white w-full shadow-orange-400/20 shadow-xl">
               <Typography variant="body" weight="bold" className="text-white text-[16px]">이 공고로 면접 연습하기</Typography>
               <Typography variant="caption" className="text-white/90 leading-relaxed w-[290px]">
                 분석된 공고 내용을 바탕으로 맞춤형 면접 질문을 생성합니다.
               </Typography>
               <Button className="w-full bg-white text-accent hover:bg-gray-50 border-none mt-2 h-11 font-bold">
                 모의면접 시작하기
               </Button>
            </div>
          )}

          {/* Status Changer Card */}
          <div className="flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card-bg w-full">
            <Typography variant="body" weight="bold">지원 상태 변경</Typography>
            <div className="flex flex-col gap-2">
              <Button variant="primary" className="w-full justify-start h-10 shadow-sm border border-orange-500">지원 예정</Button>
              <Button variant="outline" className="w-full justify-start h-10 bg-bg border-border text-text-secondary">지원 완료</Button>
              <Button variant="outline" className="w-full justify-start h-10 bg-bg border-border text-text-secondary">관심 저장</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
