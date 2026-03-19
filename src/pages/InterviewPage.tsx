import { useState } from 'react';
import { InterviewSetupForm, InterviewSession } from '../features/interview';
import { Typography } from '../shared/ui/Typography';
import { useNavigate } from 'react-router-dom';

export const InterviewPage = () => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const navigate = useNavigate();

  if (isSessionActive) {
    return <InterviewSession onEnd={() => {
      setIsSessionActive(false);
      navigate('/dashboard');
    }} />;
  }

  return (
    <div className="flex flex-col gap-8 h-full">
      <Typography variant="h2" weight="bold">Start Interview</Typography>
      <div className="flex justify-center mt-12">
        <InterviewSetupForm onStart={() => setIsSessionActive(true)} />
      </div>
    </div>
  );
};
