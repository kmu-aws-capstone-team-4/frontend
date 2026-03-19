import { Outlet, Link } from 'react-router-dom';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { Avatar } from '@/shared/ui/Avatar';
import { useAuth } from '@/features/auth';
import { Icon } from '@/shared/ui/Icon';
import { Flame } from 'lucide-react';

export const MainLayout = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-bg text-text-primary flex flex-col">
      <header className="h-16 border-b border-border bg-nav-bg flex items-center justify-between px-6 sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <Typography variant="h3" weight="bold" color="accent">MeFit</Typography>
        </Link>
        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/resumes"><Button variant="text">Resumes</Button></Link>
              <Link to="/interview"><Button variant="text" className="text-accent">Mock Interview</Button></Link>
              <div className="flex items-center gap-1 text-accent px-3 py-1 bg-orange-50 rounded-full border border-orange-200">
                <Icon icon={Flame} size={16} />
                <Typography variant="caption" weight="bold">5</Typography>
              </div>
              <Link to="/dashboard">
                <Avatar size="sm" fallbackName={user?.name || 'User'} />
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="text">Login</Button></Link>
              <Link to="/signup"><Button>Sign Up</Button></Link>
            </>
          )}
        </nav>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};
