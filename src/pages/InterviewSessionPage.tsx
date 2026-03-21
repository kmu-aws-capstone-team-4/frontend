import { useCallback, useEffect } from 'react';
import { InterviewSession } from '@/features/interview/ui/InterviewSession';
import { MediaStreamManager } from '@/shared/lib/media/MediaStreamManager';

/**
 * InterviewSessionPage — runs in a NEW WINDOW with no nav bars.
 * Handles:
 *  - Full-screen interview session
 *  - beforeunload resource cleanup
 *  - postMessage to parent window on close
 */
export const InterviewSessionPage = () => {
  const handleEnd = useCallback(() => {
    // Notify opener (parent window) that interview is done
    if (window.opener) {
      try {
        window.opener.postMessage({ type: 'interview-ended' }, '*');
      } catch {
        // opener may be closed already
      }
    }
    // Close this window
    window.close();
    // Fallback if window.close() is blocked
    window.location.href = '/dashboard';
  }, []);

  useEffect(() => {
    // Install cleanup guard
    MediaStreamManager.installBeforeUnloadGuard();

    const handleBeforeUnload = () => {
      MediaStreamManager.releaseAll();
      // Notify parent
      if (window.opener) {
        try {
          window.opener.postMessage({ type: 'interview-ended' }, '*');
        } catch {
          // noop
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      MediaStreamManager.releaseAll();
    };
  }, []);

  return <InterviewSession onEnd={handleEnd} />;
};
