import { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { Typography } from '@/shared/ui/Typography';
import { Select } from '@/shared/ui/Select';
import { Icon } from '@/shared/ui/Icon';
import { ArrowRight, ArrowLeft } from 'lucide-react';

/* ───────── types ───────── */
export interface InterviewSettings {
  interviewType: 'tail' | 'full';
  resumeId: string;
  mode: 'practice' | 'real';
  questionCount: number;
  applicationId: string;
}

interface Props {
  onStart?: (settings: InterviewSettings) => void;
  onBack?: () => void;
  /** 현재 스텝 (1=설정, 2=사전점검, 3=면접진행) */
  currentStep?: number;
}

/* ───────── sub-components ───────── */
const StepIndicator = ({ current = 1 }: { current?: number }) => {
  const steps = [
    { num: 1, label: '설정' },
    { num: 2, label: '사전 점검' },
    { num: 3, label: '면접 진행' },
  ];
  return (
    <div className="flex items-center gap-2">
      {steps.map((s) => (
        <span
          key={s.num}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            s.num === current
              ? 'bg-accent text-white'
              : 'bg-border text-text-muted'
          }`}
        >
          {s.num} {s.label}
        </span>
      ))}
    </div>
  );
};

const OptionCard = ({
  label,
  desc,
  selected,
  onClick,
}: {
  label: string;
  desc: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex-1 text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
      selected
        ? 'border-accent bg-accent/5'
        : 'border-border bg-card-bg hover:border-accent/40'
    }`}
  >
    <span
      className={`block text-sm font-semibold ${
        selected ? 'text-accent-dark' : 'text-text-primary'
      }`}
    >
      {label}
    </span>
    <span className="block text-xs text-text-secondary mt-1">{desc}</span>
  </button>
);

const QuestionCountBtn = ({
  value,
  selected,
  onClick,
}: {
  value: number;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
      selected
        ? 'bg-accent text-white shadow-[0_4px_14px_rgba(249,115,22,0.25)]'
        : 'bg-card-bg border border-border text-text-primary hover:border-accent/40'
    }`}
  >
    {value}개
  </button>
);

/* ───────── main ───────── */
export const InterviewSetupForm = ({ onStart, onBack, currentStep = 1 }: Props) => {
  const [interviewType, setInterviewType] = useState<'tail' | 'full'>('tail');
  const [resumeId, setResumeId] = useState('r1');
  const [mode, setMode] = useState<'practice' | 'real'>('practice');
  const [questionCount, setQuestionCount] = useState(10);
  const [applicationId, setApplicationId] = useState('none');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      onStart?.({ interviewType, resumeId, mode, questionCount, applicationId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-text-secondary text-sm hover:bg-muted-bg transition-colors"
        >
          <Icon icon={ArrowLeft} size={14} />
          뒤로
        </button>
        <StepIndicator current={currentStep} />
      </div>

      {/* Title */}
      <Typography variant="h2" weight="bold">
        면접 설정
      </Typography>

      {/* Form Card */}
      <Card className="p-10 border border-border rounded-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          {/* 면접 유형 */}
          <div className="flex flex-col gap-3">
            <Typography variant="body" weight="semibold" className="text-[13px]">
              면접 유형
            </Typography>
            <Typography variant="caption" color="secondary">
              면접 유형과 조건을 설정하세요.
            </Typography>
            <div className="flex gap-3">
              <OptionCard
                label="꼬리질문 방식"
                desc="답변에 따라 심층적으로 꼬리질문이 진행됩니다."
                selected={interviewType === 'tail'}
                onClick={() => setInterviewType('tail')}
              />
              <OptionCard
                label="전체 프로세스 방식"
                desc="지원 직무 전체 프로세스에 맞춰 면접이 진행됩니다."
                selected={interviewType === 'full'}
                onClick={() => setInterviewType('full')}
              />
            </div>
          </div>

          {/* 이력서 선택 */}
          <div className="flex flex-col gap-3">
            <Typography variant="body" weight="semibold" className="text-[13px]">
              이력서 선택
            </Typography>
            <Select
              value={resumeId}
              onChange={(e) => setResumeId(e.target.value)}
              options={[
                { value: 'r1', label: '시니어 프론트엔드 포트폴리오 (2025.03)' },
                { value: 'r2', label: '신입 백엔드 이력서' },
                { value: 'none', label: '기본 인성 면접 (이력서 없음)' },
              ]}
            />
          </div>

          {/* 지원 현황 연동 */}
          <div className="flex flex-col gap-3">
            <Typography variant="body" weight="semibold" className="text-[13px]">
              지원 현황 연동 (선택사항)
            </Typography>
            <Select
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value)}
              options={[
                { value: 'none', label: '작성한 면접을 선택하세요 (선택사항)' },
                { value: 'a1', label: '네이버 프론트엔드 (2025.03)' },
                { value: 'a2', label: '카카오 백엔드 (2025.04)' },
              ]}
            />
          </div>

          {/* 면접 모드 */}
          <div className="flex flex-col gap-3">
            <Typography variant="body" weight="semibold" className="text-[13px]">
              면접 모드
            </Typography>
            <div className="flex gap-3">
              <OptionCard
                label="연습 모드"
                desc="결과가 스트릭에 반영되지 않습니다."
                selected={mode === 'practice'}
                onClick={() => setMode('practice')}
              />
              <OptionCard
                label="실전 모드"
                desc="결과가 스트릭에 반영됩니다."
                selected={mode === 'real'}
                onClick={() => setMode('real')}
              />
            </div>
          </div>

          {/* 질문 수 */}
          <div className="flex flex-col gap-3">
            <Typography variant="body" weight="semibold" className="text-[13px]">
              질문 수
            </Typography>
            <div className="flex gap-3">
              {[5, 10, 15].map((n) => (
                <QuestionCountBtn
                  key={n}
                  value={n}
                  selected={questionCount === n}
                  onClick={() => setQuestionCount(n)}
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex items-center justify-center gap-2 w-full py-4 bg-accent hover:bg-accent-dark text-white font-semibold text-base rounded-xl shadow-[0_4px_14px_rgba(249,115,22,0.25)] transition-all disabled:opacity-50"
          >
            {isLoading ? '준비 중...' : '면접 시작하기'}
            {!isLoading && <Icon icon={ArrowRight} size={18} />}
          </button>
        </form>
      </Card>
    </div>
  );
};
