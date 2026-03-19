import { Typography } from '../shared/ui/Typography';
import { StreaksDisplay, ProfileEditForm } from '../features/profile';
import { useAuth } from '../features/auth';

export const DashboardPage = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <Typography variant="h2" weight="bold">Welcome, {user?.name || 'User'}!</Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-6">
          <section>
            <Typography variant="h4" weight="semibold" className="mb-4">Profile Settings</Typography>
            <ProfileEditForm />
          </section>
        </div>
        <div className="flex flex-col gap-6">
          <section>
            <Typography variant="h4" weight="semibold" className="mb-4">Activity</Typography>
            <StreaksDisplay streakCount={5} />
          </section>
        </div>
      </div>
    </div>
  );
};
