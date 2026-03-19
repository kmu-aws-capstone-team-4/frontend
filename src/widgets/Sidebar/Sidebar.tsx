import { useLocation, Link } from 'react-router-dom';
import { Home, Video, FileText, Briefcase, Flame, CreditCard, LogOut } from 'lucide-react';
import { useAuth } from '@/features/auth';

const NAV_ITEMS = [
  { path: '/dashboard', label: '홈', icon: Home },
  { path: '/interview', label: '면접 시작', icon: Video },
  { path: '/resumes', label: '이력서', icon: FileText },
  { path: '/jobs', label: '채용공고', icon: Briefcase },
  { path: '/streak', label: '스트릭', icon: Flame },
  { path: '/subscription', label: '요금제', icon: CreditCard },
];

export const Sidebar = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside className="w-[240px] h-screen bg-sidebar-bg border-r border-border flex flex-col py-6 sticky top-0 shrink-0">
      {/* logo */}
      <div className="flex items-center gap-2 h-12 px-5 w-full mb-1">
        <div className="w-7 h-7 rounded-md bg-accent shrink-0" />
        <span className="text-text-primary font-inter text-[16px] font-bold">MeFit</span>
      </div>
      
      {/* divider */}
      <div className="w-full h-[1px] bg-border mb-2" />

      {/* navItems */}
      <nav className="flex-1 w-full px-3 flex flex-col gap-[2px] overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center gap-2.5 h-10 px-3 rounded-lg w-full transition-colors ${
                isActive ? 'bg-accent text-white' : 'text-text-secondary hover:bg-muted-bg hover:text-text-primary'
              }`}
            >
              <item.icon size={18} className={isActive ? 'text-white' : 'text-text-muted'} />
              <span className="font-inter text-[14px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* userArea */}
      <div className="w-full px-3 mt-4">
        <div className="flex items-center gap-2.5 p-3 rounded-lg bg-card-bg border border-border w-full">
          <div className="w-8 h-8 rounded-full bg-accent-light flex flex-col items-center justify-center text-accent font-bold shrink-0">
            {user?.name?.[0] || 'U'}
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-text-primary font-inter text-[14px] font-semibold truncate">{user?.name || '사용자'}</span>
            <span className="text-text-muted font-inter text-[12px] truncate">{user?.email || 'user@example.com'}</span>
          </div>
          <button onClick={logout} className="p-1.5 text-text-muted hover:text-error transition-colors rounded-md hover:bg-muted-bg shrink-0">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
