import type { CoachingResult } from '@/features/interview/services/ai/LLMCoach';
import { Icon } from '@/shared/ui/Icon';
import { X, Award, MessageCircle } from 'lucide-react';

interface Props {
  result: CoachingResult;
  onClose: () => void;
}

export function FeedbackResult({ result, onClose }: Props) {
  const scoreColor =
    result.score >= 70
      ? 'text-green-400 border-green-500/30'
      : result.score >= 40
        ? 'text-accent border-accent/30'
        : 'text-red-400 border-red-500/30';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1e293b] rounded-2xl p-10 max-w-xl w-full mx-4 border border-white/10 shadow-2xl flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl font-bold flex items-center gap-2">
            <Icon icon={Award} size={22} className="text-accent" />
            AI 코칭 피드백
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:bg-white/10 transition-colors"
          >
            <Icon icon={X} size={20} />
          </button>
        </div>

        {/* Score circle */}
        <div className="flex justify-center">
          <div
            className={`w-28 h-28 rounded-full border-4 ${scoreColor} flex flex-col items-center justify-center`}
          >
            <span className={`text-3xl font-bold ${scoreColor.split(' ')[0]}`}>
              {result.score}
            </span>
            <span className="text-xs text-slate-400">점수</span>
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-white/5 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-accent mb-2">분석 결과</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{result.feedback}</p>
        </div>

        {/* Follow-up */}
        {result.followUpQuestion && (
          <div className="bg-accent/10 rounded-xl p-5 border border-accent/20">
            <h3 className="text-sm font-semibold text-accent flex items-center gap-1.5 mb-2">
              <Icon icon={MessageCircle} size={14} />
              추천 연습 질문
            </h3>
            <p className="text-sm italic text-slate-300">"{result.followUpQuestion}"</p>
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-colors shadow-[0_4px_14px_rgba(249,115,22,0.25)]"
        >
          면접 종료
        </button>
      </div>
    </div>
  );
}
