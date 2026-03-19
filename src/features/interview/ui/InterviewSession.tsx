import { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { Avatar } from '@/shared/ui/Avatar';
import { Icon } from '@/shared/ui/Icon';
import { Mic, Video, PhoneOff } from 'lucide-react';

export const InterviewSession = ({ onEnd }: { onEnd: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] w-full gap-4 max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between px-4 py-2 bg-card-bg border border-border rounded-xl">
        <Typography variant="h4" weight="semibold">Interview Session</Typography>
        <Typography variant="h4" className="font-mono text-error font-medium">{formatTime(timeLeft)}</Typography>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4">
        {/* Main Video Area (Interviewer) */}
        <Card className="flex-1 flex flex-col items-center justify-center bg-gray-900 border-transparent relative overflow-hidden">
          <Avatar size="xl" fallbackName="AI" className="w-32 h-32 border-4 border-accent" />
          <Typography color="muted" className="mt-4">AI Interviewer Speaking...</Typography>
        </Card>

        {/* User Video Area */}
        <Card className="w-full md:w-80 h-64 md:h-full flex flex-col items-center justify-center bg-gray-800 border-transparent relative overflow-hidden">
          {isCameraOn ? (
            <div className="text-gray-400">Camera Feed</div>
          ) : (
            <Avatar size="lg" fallbackName="Me" className="w-20 h-20" />
          )}
        </Card>
      </div>

      <Card className="p-4 flex items-center justify-center gap-6 bg-card-bg border-border">
        <Button 
          variant={isMicOn ? 'outline' : 'danger'} 
          className="rounded-full w-14 h-14 p-0 flex items-center justify-center"
          onClick={() => setIsMicOn(!isMicOn)}
        >
          <Icon icon={Mic} />
        </Button>
        <Button 
          variant={isCameraOn ? 'outline' : 'danger'} 
          className="rounded-full w-14 h-14 p-0 flex items-center justify-center"
          onClick={() => setIsCameraOn(!isCameraOn)}
        >
          <Icon icon={Video} />
        </Button>
        <Button 
          variant="danger"
          className="rounded-full px-6 h-14 flex items-center justify-center gap-2"
          onClick={onEnd}
        >
          <Icon icon={PhoneOff} />
          End Interview
        </Button>
      </Card>
    </div>
  );
};
