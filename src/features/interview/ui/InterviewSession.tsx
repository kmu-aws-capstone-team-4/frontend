import { useState, useEffect, useMemo } from 'react';
import { Icon } from '@/shared/ui/Icon';
import { Video, MicOff, ArrowRight, Timer, MonitorX } from 'lucide-react';

/* ───────── types ───────── */
interface Props {
  onEnd: () => void;
  onPermissionError?: () => void;
  questionNumber?: number;
  questionLabel?: string;
  questionText?: string;
}

/* ───────── sub: AI Avatar ───────── */
const AIAvatar = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div
      className="flex flex-col items-center justify-center gap-5 rounded-full"
      style={{
        width: 480,
        height: 480,
        background: 'radial-gradient(circle, #292524 0%, #1C1917 100%)',
      }}
    >
      {/* Glowing orb */}
      <div
        className="rounded-full"
        style={{
          width: 140,
          height: 140,
          background: 'radial-gradient(circle, #FED7AA 0%, #F97316 100%)',
          boxShadow: '0 0 60px rgba(249, 115, 22, 0.4), 0 0 120px rgba(249, 115, 22, 0.2)',
        }}
      />
      <span className="text-white font-semibold text-base">AI 면접관</span>
      <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent text-white text-xs font-semibold">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        질문 중
      </span>
    </div>
  </div>
);

/* ───────── sub: dB Indicator ───────── */
const DBIndicator = () => {
  const heights = useMemo(() => [16, 28, 44, 60, 36], []);
  const colors = ['#F97316', '#F97316', '#F97316', '#FB923C', '#FED7AA'];
  return (
    <div className="flex flex-col items-center justify-end gap-[3px] p-2 rounded-xl bg-[#1F2937] h-[200px] w-12">
      {heights.map((h, i) => (
        <div
          key={i}
          className="rounded"
          style={{
            width: 8,
            height: h,
            backgroundColor: colors[i],
            transition: 'height 0.3s ease',
          }}
        />
      ))}
      <span className="text-[10px] font-semibold text-accent mt-1">dB</span>
    </div>
  );
};

/* ───────── sub: Question Box ───────── */
const QuestionBox = ({
  number = 3,
  label = '꼬리 질문',
  text = '방금 말씀하신 프로젝트에서 가장 어려웠던 기술적 문제는 무엇이었나요?',
}: {
  number?: number;
  label?: string;
  text?: string;
}) => (
  <div className="flex flex-col gap-1.5 p-4 px-5 rounded-xl bg-[#1F2937] max-w-xl">
    <span className="text-accent text-[11px] font-semibold">
      Q{number}. {label}
    </span>
    <span className="text-white text-sm leading-relaxed">{text}</span>
  </div>
);

/* ───────── sub: User Camera ───────── */
const UserCamera = () => (
  <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#1C1917] border-3 border-accent w-60 h-[180px]">
    <Icon icon={Video} size={32} className="text-white" />
    <span className="text-white text-xs">나의 화면</span>
    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
      <span className="w-[5px] h-[5px] rounded-full bg-white" />
      LIVE
    </span>
  </div>
);

/* ───────── sub: STT Bar ───────── */
const STTBar = ({ text = '' }: { text?: string }) => (
  <div className="flex flex-col gap-2 p-3.5 px-5 rounded-xl bg-[#1F2937] max-w-4xl w-full">
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
      <span className="text-accent text-[11px] font-semibold">실시간 STT 변환 중</span>
    </div>
    <span className="text-white text-[13px] leading-relaxed">{text}</span>
  </div>
);

/* ───────── sub: Control Bar ───────── */
const ControlBar = ({ onReady }: { onReady: () => void }) => (
  <div className="flex items-center justify-center gap-4 h-[60px] bg-[#0F172A] px-12 w-full">
    <span className="flex items-center gap-1.5 px-3.5 h-9 rounded-full bg-[#1F2937] text-[#78716C] text-xs">
      <Icon icon={MicOff} size={14} className="text-[#78716C]" />
      침묵 감지됨
    </span>
    <button
      type="button"
      onClick={onReady}
      className="flex items-center gap-2 px-8 h-11 rounded-full bg-accent text-white text-[15px] font-bold shadow-[0_4px_14px_rgba(249,115,22,0.25)] hover:bg-accent-dark transition-colors"
    >
      답변 완료
    </button>
  </div>
);

/* ───────── sub: Nav ───────── */
const SessionNav = ({
  timeLeft,
  questionNumber,
  totalQuestions,
  onEnd,
}: {
  timeLeft: number;
  questionNumber: number;
  totalQuestions: number;
  onEnd: () => void;
}) => {
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between h-[60px] px-8 bg-[#1C1917] border-b border-[#374151]">
      {/* Left: progress */}
      <div className="flex items-center gap-3">
        <span className="text-white text-sm font-bold">
          {questionNumber} of {totalQuestions}
        </span>
        <span className="px-3 py-1 rounded-full bg-accent text-white text-xs font-semibold">
          진행 중 질문 ●
        </span>
      </div>
      {/* Right: timer + end */}
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-white/70 text-sm">
          <Icon icon={Timer} size={14} />
          {formatTime(timeLeft)}
        </span>
        <button
          type="button"
          onClick={onEnd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/30 transition-colors"
        >
          <Icon icon={MonitorX} size={14} />
          면접 종료
        </button>
      </div>
    </div>
  );
};

/* ───────── main ───────── */
export const InterviewSession = ({
  onEnd,
  questionNumber = 3,
  questionLabel = '꼬리 질문',
  questionText = '방금 말씀하신 프로젝트에서 가장 어려웠던 기술적 문제는 무엇이었나요?',
}: Props) => {
  const [timeLeft, setTimeLeft] = useState(1800);
  const [sttText, setSttText] = useState(
    '네, 그 프로젝트에서 가장 어려웠던 부분은 실시간 데이터 처리였습니다. 특히...'
  );

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNextQuestion = () => {
    setSttText('');
    // In real implementation, this would signal the backend
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#111827] overflow-hidden">
      {/* Nav */}
      <SessionNav
        timeLeft={timeLeft}
        questionNumber={questionNumber}
        totalQuestions={10}
        onEnd={onEnd}
      />

      {/* Main body – absolute positioning like wireframe */}
      <div className="relative flex-1 bg-[#111827] overflow-hidden">
        {/* AI Avatar center */}
        <AIAvatar />

        {/* dB Indicator – left */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2">
          <DBIndicator />
        </div>

        {/* Question Box – bottom left */}
        <div className="absolute left-[calc(50%-280px)] bottom-[140px]">
          <QuestionBox
            number={questionNumber}
            label={questionLabel}
            text={questionText}
          />
        </div>

        {/* User Camera – bottom right */}
        <div className="absolute right-10 bottom-[140px]">
          <UserCamera />
        </div>

        {/* STT Bar – above control bar */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[70px] w-[min(1000px,calc(100%-200px))]">
          <STTBar text={sttText} />
        </div>

        {/* Control Bar – bottom fixed */}
        <div className="absolute left-0 right-0 bottom-0">
          <ControlBar onReady={handleNextQuestion} />
        </div>
      </div>
    </div>
  );
};
