import { Typography } from '@/shared/ui/Typography';
import { Flame, Trophy, Gift } from 'lucide-react';

export const StreakPage = () => {
  // Generate dummy grass data
  const days = Array.from({ length: 364 }, () => {
    // Random intensity 0-4
    const intensity = Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0;
    return intensity;
  });

  const getColor = (intensity: number) => {
    switch(intensity) {
      case 1: return 'bg-orange-200';
      case 2: return 'bg-orange-300';
      case 3: return 'bg-orange-500';
      case 4: return 'bg-orange-600';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center justify-between w-full">
        <Typography variant="h3" weight="bold">스트릭</Typography>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="flex flex-col justify-center p-6 bg-card-bg border border-border rounded-2xl shadow-sm gap-2">
          <Typography variant="caption" className="text-text-muted flex items-center gap-1.5"><Flame size={14} /> 현재 스트릭</Typography>
          <Typography variant="h2" weight="bold" className="text-accent text-3xl">🔥 7일</Typography>
        </div>
        <div className="flex flex-col justify-center p-6 bg-card-bg border border-border rounded-2xl shadow-sm gap-2">
          <Typography variant="caption" className="text-text-muted flex items-center gap-1.5"><Trophy size={14} /> 최장 스트릭</Typography>
          <Typography variant="h2" weight="bold" className="text-text-primary text-3xl">21일</Typography>
        </div>
        <div className="flex flex-col justify-center p-6 bg-card-bg border border-border rounded-2xl shadow-sm gap-2">
          <Typography variant="caption" className="text-text-muted flex items-center gap-1.5"><Gift size={14} /> 다음 보상까지</Typography>
          <Typography variant="h2" weight="bold" className="text-text-primary text-3xl">3일</Typography>
        </div>
      </div>

      {/* Grass Chart */}
      <div className="flex flex-col p-6 md:p-8 bg-card-bg border border-border rounded-2xl gap-6 w-full overflow-hidden">
        <div className="flex items-center justify-between w-full">
          <Typography variant="body" weight="semibold" className="text-lg">연간 활동 기록</Typography>
          <select className="border-border text-text-primary text-sm p-1.5 rounded-lg outline-none">
            <option>2026년</option>
            <option>2025년</option>
          </select>
        </div>

        <div className="overflow-x-auto w-full pb-2">
          <div className="flex gap-1 min-w-max">
            {/* Days Column */}
            <div className="flex flex-col gap-[3px] mt-6 mr-2 text-[10px] text-text-muted justify-between h-[106px] w-[20px]">
              <span>월</span>
              <span>수</span>
              <span>금</span>
            </div>

            {/* Weeks Container */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-8 text-[11px] text-text-muted mb-1">
                <span>1월</span><span>2월</span><span>3월</span><span>4월</span>
                <span>5월</span><span>6월</span><span>7월</span><span>8월</span>
                <span>9월</span><span>10월</span><span>11월</span><span>12월</span>
              </div>
              <div className="grid grid-cols-[repeat(52,1fr)] gap-[3px] h-[106px] grid-rows-7">
                {days.map((intensity, i) => (
                  <div key={i} className={`w-[13px] h-[13px] rounded-sm ${getColor(intensity)}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between w-full mt-2">
          <Typography variant="caption" className="text-text-secondary">총 87회 활동 (2026년)</Typography>
          <div className="flex items-center gap-2 text-[11px] text-text-muted">
            <span>적음</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-[2px] bg-gray-100"></div>
              <div className="w-3 h-3 rounded-[2px] bg-orange-200"></div>
              <div className="w-3 h-3 rounded-[2px] bg-orange-300"></div>
              <div className="w-3 h-3 rounded-[2px] bg-orange-500"></div>
              <div className="w-3 h-3 rounded-[2px] bg-orange-600"></div>
            </div>
            <span>많음</span>
          </div>
        </div>
      </div>
    </div>
  );
};
