import { useState, useEffect, useCallback } from 'react';
import {
  InterviewSetupForm,
  InterviewPreCheck,
  InterviewSession,
  InterviewPermissionError,
  InterviewScreenError,
} from '@/features/interview';
import type { InterviewSettings } from '@/features/interview';
import { useNavigate } from 'react-router-dom';

type Phase = 'setup' | 'precheck' | 'session' | 'error-permission' | 'error-screen';

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
      if (phase === 'session' || phase === 'precheck') {
        checkScreenSize();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [phase, checkScreenSize]);

  /* ── Phase handlers ── */
  const handleSetupComplete = (s: InterviewSettings) => {
    setSettings(s);
    if (checkScreenSize()) {
      setPhase('precheck');
    }
  };

  const handlePreCheckComplete = () => {
    if (checkScreenSize()) {
      setPhase('session');
    }
  };

  const handleEnd = () => {
    navigate('/dashboard');
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

    case 'error-permission':
      return (
        <InterviewPermissionError
          onRetry={() => setPhase('precheck')}
          onEnd={handleEnd}
        />
      );

    case 'session':
      return (
        <InterviewSession
          onEnd={handleEnd}
          onPermissionError={() => setPhase('error-permission')}
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
