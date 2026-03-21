import { useEffect, useRef } from 'react';
import type { IAvatarProvider } from '@/features/interview/services/avatar/IAvatarProvider';
import { PrettyAvatarProvider } from '@/features/interview/services/avatar/PrettyAvatarProvider';

interface Props {
  className?: string;
}

export function AvatarViewer({ className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const providerRef = useRef<IAvatarProvider | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    providerRef.current = new PrettyAvatarProvider();
    providerRef.current.initialize(containerRef.current);

    // Make available globally for AI chat integration
    (window as unknown as Record<string, unknown>).aiAvatar = providerRef.current;

    return () => {
      providerRef.current?.destroy();
      (window as unknown as Record<string, unknown>).aiAvatar = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden border border-white/10 ring-1 ring-white/5 bg-black/40 ${className}`}
    />
  );
}
