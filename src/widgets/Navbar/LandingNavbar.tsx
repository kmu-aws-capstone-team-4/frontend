import { Link } from 'react-router-dom';
import { Button } from '../../shared/ui/Button';

export const LandingNavbar = () => {
  return (
    <header className="h-[64px] bg-nav-bg border-b border-border flex items-center justify-between px-12 w-full">
      {/* navLogo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-accent" />
        <span className="text-text-primary font-inter text-[18px] font-semibold">MeFit</span>
      </Link>

      {/* navLinks */}
      <nav className="hidden md:flex items-center gap-8">
        <Link to="#features" className="text-text-secondary font-inter text-[14px] hover:text-text-primary">기능</Link>
        <Link to="#pricing" className="text-text-secondary font-inter text-[14px] hover:text-text-primary">요금제</Link>
        <Link to="#reviews" className="text-text-secondary font-inter text-[14px] hover:text-text-primary">후기</Link>
      </nav>

      {/* navActions */}
      <div className="flex items-center gap-3">
        <Link to="/login">
          <Button variant="outline" className="px-5 py-2.5 rounded-lg font-inter text-[14px] h-auto">로그인</Button>
        </Link>
        <Link to="/signup">
          <Button className="px-5 py-2.5 rounded-lg bg-accent text-white font-inter text-[14px] h-auto">가입하기</Button>
        </Link>
      </div>
    </header>
  );
};
