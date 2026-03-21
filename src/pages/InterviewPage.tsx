import { useState, useEffect, useCallback } from 'react';
import {
  InterviewSetupForm,
  InterviewPreCheck,
  InterviewScreenError,
} from '@/features/interview';
import type { InterviewSettings } from '@/features/interview';
import { useNavigate } from 'react-router-dom';

type Phase = 'setup' | 'precheck' | 'error-screen';

const MIN_WIDTH = 1024;
const MIN_HEIGHT = 768;

export const InterviewPage = () => {
  const [phase, setPhase] = useState<Phase>('setup');
  const [, setSettings] = useState<InterviewSettings | null>(null);
  const navigate = useNavigate();

  /* ── Screen size check ── */
  const checkScreenSize = useCallback(() => {
    if (window.innerWidth < MIN_WIDTH || window.innerHeight < MIN_HEIGHT) {
      setPhase('error-screen');
      return false;
    }
    return true;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (phase === 'precheck') {
        checkScreenSize();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [phase, checkScreenSize]);

  /* ── Listen for interview-ended postMessage from child window ── */
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'interview-ended') {
        // Interview session window was closed / finished
        // Optionally navigate or refresh
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  /* ── Phase handlers ── */
  const handleSetupComplete = (s: InterviewSettings) => {
    setSettings(s);
    if (checkScreenSize()) {
      setPhase('precheck');
    }
  };

  const handlePreCheckComplete = () => {
    if (!checkScreenSize()) return;

    // Open interview session in a NEW WINDOW (no nav)
    const width = Math.min(window.screen.width, 1600);
    const height = Math.min(window.screen.height, 1000);
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    window.open(
      '/interview/session',
      'interview-session',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,location=no,status=no,scrollbars=no`
    );
  };

  const handleBack = () => {
    navigate(-1);
  };

  /* ── Render by phase ── */
  switch (phase) {
    case 'error-screen':
      return (
        <InterviewScreenError
          onHome={() => navigate('/dashboard')}
          minWidth={MIN_WIDTH}
          minHeight={MIN_HEIGHT}
        />
      );

    case 'precheck':
      return (
        <div className="p-8 lg:p-10">
          <InterviewPreCheck
            currentStep={2}
            onNext={handlePreCheckComplete}
            onBack={() => setPhase('setup')}
          />
        </div>
      );

    case 'setup':
    default:
      return (
        <div className="p-8 lg:p-10">
          <InterviewSetupForm
            currentStep={1}
            onStart={handleSetupComplete}
            onBack={handleBack}
          />
        </div>
      );
  }
};
