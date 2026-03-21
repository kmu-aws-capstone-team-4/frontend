import { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '@/shared/ui/Card';
import { Typography } from '@/shared/ui/Typography';
import { Icon } from '@/shared/ui/Icon';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Mic,
  Monitor,
  Cpu,
  Wifi,
  Check,
  AlertTriangle,
  X,
} from 'lucide-react';

/* ───────── types ───────── */
type CheckStatus = 'pending' | 'checking' | 'pass' | 'warn' | 'fail';

interface CheckItemData {
  id: string;
  label: string;
  desc: string;
  icon: typeof Camera;
  status: CheckStatus;
  detail?: string;
}

interface Props {
  onNext?: () => void;
  onBack?: () => void;
  currentStep?: number;
}

/* ───────── sub-components ───────── */
const StepIndicator = ({ current = 2 }: { current?: number }) => {
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

const statusBorderColor: Record<CheckStatus, string> = {
  pending: 'border-border',
  checking: 'border-accent/40',
  pass: 'border-green-500/40',
  warn: 'border-accent/40',
  fail: 'border-red-500/40',
};

const StatusIcon = ({ status }: { status: CheckStatus }) => {
  switch (status) {
    case 'pass':
      return (
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20">
          <Icon icon={Check} size={16} className="text-green-500" />
        </span>
      );
    case 'warn':
      return (
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/20">
          <Icon icon={AlertTriangle} size={16} className="text-accent" />
        </span>
      );
    case 'fail':
      return (
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20">
          <Icon icon={X} size={16} className="text-red-500" />
        </span>
      );
    case 'checking':
      return (
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/20">
          <span className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </span>
      );
    default:
      return (
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-border">
          <span className="w-3 h-3 rounded-full bg-text-muted" />
        </span>
      );
  }
};

const CheckItemRow = ({ item }: { item: CheckItemData }) => (
  <div
    className={`flex items-center gap-4 px-5 py-4 rounded-xl border ${statusBorderColor[item.status]} bg-card-bg transition-all`}
  >
    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted-bg">
      <Icon icon={item.icon} size={20} className="text-text-secondary" />
    </span>
    <div className="flex-1 min-w-0">
      <Typography variant="body" weight="semibold" className="text-sm">
        {item.label}
      </Typography>
      <Typography variant="caption" color="secondary" className="text-xs">
        {item.detail || item.desc}
      </Typography>
    </div>
    <StatusIcon status={item.status} />
  </div>
);

/* ───────── main ───────── */
export const InterviewPreCheck = ({ onNext, onBack, currentStep = 2 }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const [checks, setChecks] = useState<CheckItemData[]>([
    { id: 'camera', label: '카메라', desc: '카메라 접근 권한을 확인합니다', icon: Camera, status: 'pending' },
    { id: 'mic', label: '마이크', desc: '마이크 접근 권한을 확인합니다', icon: Mic, status: 'pending' },
    { id: 'screen', label: '화면 크기', desc: '최소 화면 크기를 확인합니다', icon: Monitor, status: 'pending' },
    { id: 'gpu', label: '그래픽 가속', desc: '하드웨어 가속 지원을 확인합니다', icon: Cpu, status: 'pending' },
    { id: 'network', label: '네트워크', desc: '네트워크 연결 상태를 확인합니다', icon: Wifi, status: 'pending' },
  ]);

  const updateCheck = useCallback((id: string, status: CheckStatus, detail?: string) => {
    setChecks((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status, detail: detail || c.detail } : c))
    );
  }, []);

  /* ── run checks ── */
  useEffect(() => {
    const runChecks = async () => {
      // Camera
      updateCheck('camera', 'checking');
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        updateCheck('camera', 'pass', '카메라가 정상적으로 감지되었습니다');
        updateCheck('mic', 'pass', '마이크가 정상적으로 입력되고 있습니다');
      } catch {
        updateCheck('camera', 'fail', '카메라 접근이 차단되었습니다');
        updateCheck('mic', 'fail', '마이크 접근이 차단되었습니다');
      }

      // Screen size
      updateCheck('screen', 'checking');
      await new Promise((r) => setTimeout(r, 300));
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w >= 1024 && h >= 768) {
        updateCheck('screen', 'pass', `현재 화면 크기: ${w} × ${h}`);
      } else {
        updateCheck('screen', 'warn', `현재 ${w}×${h} — 최소 1024×768 필요`);
      }

      // GPU / hardware acceleration
      updateCheck('gpu', 'checking');
      await new Promise((r) => setTimeout(r, 300));
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
          updateCheck('gpu', 'pass', '하드웨어 가속이 활성화되어 있습니다');
        } else {
          updateCheck('gpu', 'warn', '그래픽 가속이 비활성화되어 있습니다');
        }
      } catch {
        updateCheck('gpu', 'warn', '그래픽 가속 확인에 실패했습니다');
      }

      // Network
      updateCheck('network', 'checking');
      await new Promise((r) => setTimeout(r, 300));
      if (navigator.onLine) {
        updateCheck('network', 'pass', '네트워크가 정상적으로 연결되어 있습니다');
      } else {
        updateCheck('network', 'fail', '네트워크 연결이 끊어져 있습니다');
      }
    };

    runChecks();

    return () => {
      // cleanup stream on unmount
      stream?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allPassed = checks.every((c) => c.status === 'pass');
  const hasFailure = checks.some((c) => c.status === 'fail' || c.status === 'warn');
  const isChecking = checks.some((c) => c.status === 'checking' || c.status === 'pending');

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-text-secondary text-sm hover:bg-muted-bg transition-colors"
        >
          <Icon icon={ArrowLeft} size={14} />
          면접 설정으로
        </button>
        <StepIndicator current={currentStep} />
      </div>

      {/* Title */}
      <Typography variant="h2" weight="bold">
        사전 환경 점검
      </Typography>

      {/* Content: 2-column on desktop, 1-column on mobile */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Info + Camera Preview */}
        <Card className="p-8 border border-border rounded-2xl lg:w-[480px] flex-shrink-0">
          <div className="flex flex-col gap-6">
            <span className="self-start px-3 py-1.5 rounded-full bg-accent-light text-accent-dark text-xs font-semibold">
              2단계 · 사전 점검
            </span>
            <div>
              <Typography variant="h3" weight="bold" className="leading-snug">
                면접 시작 전
                <br />
                환경을 확인합니다
              </Typography>
            </div>
            <Typography variant="body" color="secondary" className="text-sm leading-relaxed">
              원활한 면접 진행을 위해 카메라, 마이크, 화면 크기, 그래픽 가속 기능을 확인합니다.
              모든 항목이 통과되어야 면접을 시작할 수 있습니다.
            </Typography>

            <div className="p-4 rounded-xl bg-accent-light">
              <Typography className="text-accent-dark text-[13px]">
                💡 카메라와 마이크 권한을 허용해주세요
              </Typography>
            </div>

            {/* Camera preview */}
            <div className="rounded-xl bg-[#1C1917] h-40 overflow-hidden flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover scale-x-[-1]"
              />
              {!stream && (
                <span className="absolute text-[#78716C] text-sm">카메라 미리보기</span>
              )}
            </div>
          </div>
        </Card>

        {/* Right: System Checks */}
        <Card className="p-8 border border-border rounded-2xl flex-1">
          <div className="flex flex-col gap-5">
            <Typography variant="h4" weight="bold">
              시스템 점검 항목
            </Typography>

            <div className="flex flex-col gap-2.5">
              {checks.map((item) => (
                <CheckItemRow key={item.id} item={item} />
              ))}
            </div>

            {hasFailure && !isChecking && (
              <Typography className="text-accent-dark text-[13px]">
                ⚠️ 경고 항목이 있습니다. 모든 요소를 통과해야 면접을 진행할 수 있습니다.
              </Typography>
            )}

            <button
              type="button"
              onClick={onNext}
              disabled={!allPassed || isChecking}
              className={`mt-2 flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-[15px] transition-all ${
                allPassed
                  ? 'bg-accent text-white shadow-[0_4px_16px_rgba(249,115,22,0.25)] hover:bg-accent-dark'
                  : 'bg-border text-text-muted cursor-not-allowed'
              }`}
            >
              면접 시작하기
              <Icon icon={ArrowRight} size={18} />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
