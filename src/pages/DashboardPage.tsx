import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { useAuth } from '@/features/auth';

const StatCardSimple = ({ label, value }: { label: string; value: string }) => (
  <div className="flex-1 min-w-[150px] p-5 rounded-xl border border-border bg-card-bg flex flex-col gap-2 shadow-sm">
    <Typography variant="caption" className="text-text-muted">{label}</Typography>
    <Typography variant="h3" weight="bold" className={label === '현재 스트릭' ? 'text-accent' : 'text-text-primary'}>{value}</Typography>
  </div>
);

export const DashboardPage = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto">
      {/* Greeting Row */}
      <div className="flex items-center justify-between w-full">
        <Typography variant="h3" weight="bold">안녕하세요, {user?.name || '사용자'}님 👋</Typography>
        <Button variant="primary" className="shadow-orange-400/30 shadow-lg">+ 면접 시작</Button>
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap gap-4 w-full">
        <StatCardSimple label="이번 주 면접" value="3회" />
        <StatCardSimple label="현재 스트릭" value="🔥 7일" />
        <StatCardSimple label="총 면접 횟수" value="24회" />
        <StatCardSimple label="요금제" value="Free" />
      </div>

      {/* Content Columns */}
      <div className="flex flex-col lg:flex-row gap-8 w-full mt-4">
        {/* Left Col */}
        <div className="flex flex-col flex-1 gap-10">
          <section className="flex flex-col gap-4">
            <Typography variant="h4" weight="bold">문서 현황</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-border bg-card-bg shadow-sm flex flex-col gap-2 h-32 justify-center items-center">
                <Typography variant="body" weight="medium">이력서 1건</Typography>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card-bg shadow-sm flex flex-col gap-2 h-32 justify-center items-center">
                <Typography variant="body" weight="medium">채용공고 2건</Typography>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <Typography variant="h4" weight="bold">최근 면접 기록</Typography>
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-xl border border-border bg-card-bg shadow-sm flex items-center justify-between">
                <div>
                  <Typography variant="body" weight="semibold">프론트엔드 모의면접</Typography>
                  <Typography variant="caption" className="text-text-muted mt-1">2026.03.18</Typography>
                </div>
                <div className="bg-accent-light text-accent-dark px-2.5 py-1 rounded-md text-xs font-semibold">완료</div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card-bg shadow-sm flex items-center justify-between">
                <div>
                  <Typography variant="body" weight="semibold">기본 인성면접</Typography>
                  <Typography variant="caption" className="text-text-muted mt-1">2026.03.15</Typography>
                </div>
                <div className="bg-accent-light text-accent-dark px-2.5 py-1 rounded-md text-xs font-semibold">완료</div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Col */}
        <div className="flex flex-col w-full lg:w-[320px] shrink-0 gap-4 mt-4 lg:mt-0">
          <Typography variant="h4" weight="bold">오늘의 스트릭</Typography>
          <div className="p-5 rounded-xl border border-border bg-card-bg shadow-sm flex flex-col gap-6">
            <div className="flex flex-col gap-1 items-center py-4">
               <Typography variant="h2" weight="bold" className="text-accent">🔥</Typography>
               <Typography variant="body" weight="medium" className="mt-2 text-text-muted">7일 연속 달성 중!</Typography>
            </div>
            <div className="bg-accent-light p-4 rounded-lg flex flex-col gap-2 items-center text-accent-dark">
              <Typography variant="body" weight="semibold">오늘의 불꽃 배지 성공</Typography>
              <Typography variant="caption">스터디 활동이 반영되었습니다</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
