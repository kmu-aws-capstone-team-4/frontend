import { useState, useEffect } from 'react';
import { Icon } from '@/shared/ui/Icon';
import { MonitorX, Home } from 'lucide-react';

interface Props {
  onHome?: () => void;
  minWidth?: number;
  minHeight?: number;
}

export const InterviewScreenError = ({
  onHome,
  minWidth = 1024,
  minHeight = 768,
}: Props) => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#111827] px-8">
      <div className="flex flex-col items-center gap-8 max-w-sm w-full">
        {/* Icon */}
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-accent/20">
          <Icon icon={MonitorX} size={36} className="text-accent" />
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-white text-[22px] font-bold mb-3">
            화면이 너무 작습니다
          </h2>
          <p className="text-[#9CA3AF] text-sm leading-relaxed">
            면접 세션은 최소 {minWidth} × {minHeight} 이상의 화면에서만 이용할 수 있습니다.
          </p>
        </div>

        {/* Size comparison box */}
        <div className="w-full p-5 rounded-xl bg-[#1F2937]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#9CA3AF] text-sm">현재 화면 크기</span>
            <span className="text-accent font-semibold text-sm">
              {screenSize.width} × {screenSize.height}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#9CA3AF] text-sm">최소 요구 크기</span>
            <span className="text-accent font-semibold text-sm">
              {minWidth} × {minHeight}
            </span>
          </div>
        </div>

        {/* Home button */}
        <button
          type="button"
          onClick={onHome}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-dark transition-colors shadow-[0_4px_14px_rgba(249,115,22,0.25)]"
        >
          <Icon icon={Home} size={16} />
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};
