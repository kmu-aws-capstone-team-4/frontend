import { Bell } from 'lucide-react';
import { Button } from '../../shared/ui/Button';
import { useLocation } from 'react-router-dom';

const getPageTitle = (path: string) => {
  if (path.includes('/dashboard')) return '대시보드';
  if (path.includes('/resume')) return '이력서 관리';
  if (path.includes('/streak')) return '나의 활동';
  if (path.includes('/jobs')) return '채용 공고 (베타)';
  if (path.includes('/subscription')) return '요금제';
  if (path.includes('/settings')) return '설정';
  return '모의 면접'; // Default or interview
};

export const TopBar = ({ showBadge = false }: { showBadge?: boolean }) => {
  const { pathname } = useLocation();
  const title = getPageTitle(pathname);
  
  return (
    <header className="h-[64px] bg-card-bg border-b border-border flex items-center justify-between px-10 w-full shrink-0">
      {/* tbLeft */}
      <div className="flex items-center gap-2">
        <h1 className="text-text-primary font-inter text-[20px] font-bold">{title}</h1>
        {showBadge && (
          <div className="h-6 px-2.5 bg-accent-light text-accent rounded-xl flex items-center justify-center font-inter text-[12px] font-semibold">
            PRO
          </div>
        )}
      </div>

      {/* tbRight */}
      <div className="flex items-center gap-2">
        <Button variant="outline" className="h-9 px-4 gap-1.5 border-border rounded-lg text-[13px] font-medium text-text-secondary">
          <Bell size={16} />
          알림
        </Button>
      </div>
    </header>
  );
};
