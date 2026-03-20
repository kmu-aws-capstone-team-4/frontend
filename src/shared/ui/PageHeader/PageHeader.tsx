import { Typography } from '../Typography';
import { Button } from '../Button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  step?: number;
  totalSteps?: number;
  onBack?: () => void;
}

export const PageHeader = ({ title, subtitle, step, totalSteps, onBack }: PageHeaderProps) => {
  const navigate = useNavigate();
  const handleBack = onBack || (() => navigate(-1));

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <Typography variant="h3" weight="bold">{title}</Typography>
          {subtitle && (
            <Typography variant="body" className="text-text-secondary">{subtitle}</Typography>
          )}
        </div>
        <div className="flex items-center gap-4">
          {step && totalSteps && (
             <div className="flex items-center gap-1">
               <Typography variant="body" weight="bold" className="text-accent">{step}</Typography>
               <Typography variant="body" className="text-text-muted">/ {totalSteps}</Typography>
             </div>
          )}
          <Button variant="outline" onClick={handleBack} className="gap-2 shadow-sm rounded-lg px-4 hidden md:flex">
            <ChevronLeft size={16} />
            이전으로
          </Button>
        </div>
      </div>
    </div>
  );
};
