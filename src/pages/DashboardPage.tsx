import { Typography } from '@/shared/ui/Typography';
import { StatCard, PageHeader } from '@/shared/ui/WireframeComps';
import { StreaksDisplay, ProfileEditForm } from '@/features/profile';
import { useAuth } from '@/features/auth';

export const DashboardPage = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-10">
      <PageHeader 
        title={`${user?.name || '사용자'}님, 환영합니다!`} 
        desc="오늘도 새로운 면접 세션을 통해 역량을 키워보세요." 
      />
      
      {/* Stats Row */}
      <div className="flex flex-wrap gap-6">
        <StatCard label="총 면접 횟수" value="24" sub="이번 달 +3" />
        <StatCard label="평균 코칭 점수" value="85" sub="우수함" />
        <StatCard label="연속 출석" value="5일" sub="불꽃 뱃지 유지중" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <section>
            <Typography variant="h4" weight="semibold" className="mb-4">프로필 설정</Typography>
            <ProfileEditForm />
          </section>
        </div>
        <div className="flex flex-col gap-6">
          <section>
            <Typography variant="h4" weight="semibold" className="mb-4">활동 요약</Typography>
            <StreaksDisplay streakCount={5} />
          </section>
        </div>
      </div>
    </div>
  );
};
