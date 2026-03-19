import { Menu } from 'lucide-react';
import { useLayoutStore } from '@/shared/store/layout';

export const TopBar = () => {
  const { openSidebar } = useLayoutStore();
  
  return (
    <header className="h-[52px] md:h-[56px] lg:hidden bg-sidebar-bg border-b border-border flex items-center justify-between px-5 shrink-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={openSidebar}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted-bg text-text-primary transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-accent shrink-0" />
          <span className="text-text-primary font-inter text-[15px] font-bold">MeFit</span>
        </div>
      </div>
    </header>
  );
};
