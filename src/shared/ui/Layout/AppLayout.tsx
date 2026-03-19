import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/widgets/Sidebar/Sidebar';
import { TopBar } from '@/widgets/Navbar/TopBar';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF9] flex font-inter text-text-primary">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full h-screen overflow-hidden">
        <TopBar showBadge={true} />
        <main className="flex-1 overflow-y-auto p-10 bg-bg">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
