import { Outlet } from 'react-router-dom';
import { LandingNavbar } from '@/widgets/Navbar/LandingNavbar';
import { LandingFooter } from '@/widgets/Footer/LandingFooter';

export const LandingLayout = () => {
  return (
    <div className="min-h-screen bg-bg flex flex-col font-inter text-text-primary">
      <LandingNavbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <LandingFooter />
    </div>
  );
};
