import { useState } from 'react';
import { Card } from '../../../shared/ui/Card';
import { Select } from '../../../shared/ui/Select';
import { Typography } from '../../../shared/ui/Typography';
import { Button } from '../../../shared/ui/Button';

export const InterviewSetupForm = ({ onStart }: { onStart?: (settings: Record<string, unknown>) => void }) => {
  const [selectedResume, setSelectedResume] = useState('r1');
  const [interviewType, setInterviewType] = useState('tail'); // 'tail' or 'full'
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/interviews/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId: selectedResume, type: interviewType })
      });
      if (res.ok) {
        const data = await res.json();
        onStart?.(data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-lg w-full">
      <form onSubmit={handleStart} className="flex flex-col gap-6">
        <Typography variant="h3" weight="semibold">Mock Interview Setup</Typography>
        
        <Select
          label="Select Context Document (Resume)"
          value={selectedResume}
          onChange={(e) => setSelectedResume(e.target.value)}
          options={[
            { value: 'r1', label: 'Senior Frontend Resume' },
            { value: 'r2', label: 'Backend Experience' },
            { value: 'none', label: 'No Resume (General Frontend)' },
          ]}
        />
        
        <Select
          label="Interview Type"
          value={interviewType}
          onChange={(e) => setInterviewType(e.target.value)}
          options={[
            { value: 'tail', label: 'Tail-Question (Deep Dive)' },
            { value: 'full', label: 'Full Process (Broad Coverage)' },
          ]}
        />

        <Button type="submit" size="lg" disabled={isLoading} className="mt-4">
          {isLoading ? 'Preparing environment...' : 'Start Interview'}
        </Button>
      </form>
    </Card>
  );
};
