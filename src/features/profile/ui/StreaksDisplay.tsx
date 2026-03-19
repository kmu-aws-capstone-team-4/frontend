import { Card } from '../../../shared/ui/Card';
import { Typography } from '../../../shared/ui/Typography';
import { Icon } from '../../../shared/ui/Icon';
import { Flame } from 'lucide-react';

export const StreaksDisplay = ({ streakCount = 0 }: { streakCount?: number }) => {
  return (
    <Card className="p-4 flex flex-col items-center justify-center gap-2 bg-orange-50 border-orange-200">
      <div className="flex items-center gap-2 text-accent-dark">
        <Icon icon={Flame} size={32} />
        <Typography variant="h3" weight="bold">{streakCount}</Typography>
      </div>
      <Typography variant="caption" color="secondary" className="font-medium">
        Day Study Streak
      </Typography>
    </Card>
  );
};
