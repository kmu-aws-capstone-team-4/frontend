import { Outlet, Link } from 'react-router-dom';
import { Typography } from '../Typography';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
      <Link to="/" className="mb-8">
        <Typography variant="h2" weight="bold" color="accent">Everyday Mail</Typography>
      </Link>
      <Outlet />
    </div>
  );
};
