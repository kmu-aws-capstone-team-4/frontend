import type { Meta } from '@storybook/react';
import { Sidebar } from '@/widgets/Sidebar/Sidebar';
import { TopBar } from '@/widgets/Navbar/TopBar';
import { LandingNavbar } from '@/widgets/Navbar/LandingNavbar';
import { LandingFooter } from '@/widgets/Footer/LandingFooter';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'Wireframe/Layout Widgets',
  decorators: [(Story) => <BrowserRouter><div className="bg-bg w-full font-inter"><Story /></div></BrowserRouter>]
} satisfies Meta;
export default meta;

export const SidebarWidget = () => (
  <div className="h-screen bg-[#FDFDFD]">
    <Sidebar />
  </div>
);

export const TopBarWidget = () => (
  <div className="h-screen bg-[#FDFDFD] flex-1">
    <TopBar showBadge={true} />
  </div>
);

export const LandingNavbarWidget = () => <LandingNavbar />;
export const LandingFooterWidget = () => <LandingFooter />;
