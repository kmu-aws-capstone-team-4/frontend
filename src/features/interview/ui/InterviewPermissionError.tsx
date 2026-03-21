import { Icon } from '@/shared/ui/Icon';
import { ShieldAlert, Camera, Mic, Cpu, RefreshCw, Home } from 'lucide-react';

/* ───────── types ───────── */
interface PermissionStatus {
  camera: boolean;
  mic: boolean;
  gpu: boolean;
}

interface Props {
  permissions?: PermissionStatus;
  onRetry?: () => void;
  onEnd?: () => void;
}

/* ───────── sub: Nav ───────── */
const ErrorNav = () => (
  <div className="flex items-center justify-between h-[60px] px-8 bg-[#1C1917]">
    <div className="flex items-center gap-2">
      <span className="w-7 h-7 rounded-md bg-accent" />
      <span className="text-white text-[15px] font-bold">MeFit</span>
    </div>
    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-semibold">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
      면접 중단됨
    </span>
  </div>
);

/* ───────── sub: Permission Item ───────── */
const PermItem = ({
  icon,
  label,
  allowed,
}: {
  icon: typeof Camera;
  label: string;
  allowed: boolean;
}) => (
  <div
    className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border ${
      allowed
        ? 'border-green-500/30 bg-green-500/5'
        : 'border-red-500/30 bg-red-500/5'
    }`}
  >
    <span
      className={`w-2 h-2 rounded-full ${allowed ? 'bg-green-500' : 'bg-red-500'}`}
    />
    <Icon
      icon={icon}
      size={18}
      className={allowed ? 'text-green-400' : 'text-red-400'}
    />
    <span className={`text-sm ${allowed ? 'text-green-300' : 'text-red-300'}`}>
      {label} 권한 {allowed ? '허용됨' : '차단됨'}
    </span>
  </div>
);

/* ───────── main ───────── */
export const InterviewPermissionError = ({
  permissions = { camera: false, mic: false, gpu: true },
  onRetry,
  onEnd,
}: Props) => {
  return (
    <div className="flex flex-col h-screen w-screen bg-[#111827] overflow-hidden">
      <ErrorNav />

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="flex flex-col gap-8 p-12 rounded-2xl bg-[#1F2937] max-w-[560px] w-full">
          {/* Icon */}
          <div className="flex items-center justify-center w-[72px] h-[72px] rounded-full bg-red-500/20 self-center">
            <Icon icon={ShieldAlert} size={32} className="text-red-400" />
          </div>

          {/* Title */}
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold mb-3">
              권한이 차단되었습니다
            </h2>
            <p className="text-[#9CA3AF] text-sm leading-relaxed">
              면접 진행 중 카메라 또는 마이크 권한이 차단되었습니다.
              면접을 계속하려면 브라우저 권한을 다시 허용해야 합니다.
            </p>
          </div>

          {/* Permission items */}
          <div className="flex flex-col gap-3">
            <PermItem icon={Camera} label="카메라" allowed={permissions.camera} />
            <PermItem icon={Mic} label="마이크" allowed={permissions.mic} />
            <PermItem icon={Cpu} label="그래픽 가속" allowed={permissions.gpu} />
          </div>

          {/* How-to box */}
          <div className="p-4 rounded-xl bg-[#111827] text-[#9CA3AF] text-xs leading-relaxed">
            <p className="font-semibold text-white mb-2">권한 복구 방법</p>
            <p>
              브라우저 주소 표시줄 왼쪽의 🔒 아이콘 → 사이트 설정 →
              카메라/마이크/그래픽 가속 → 허용으로 변경해주세요.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onRetry}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-dark transition-colors shadow-[0_4px_14px_rgba(249,115,22,0.25)]"
            >
              <Icon icon={RefreshCw} size={16} />
              권한 재확인
            </button>
            <button
              type="button"
              onClick={onEnd}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#374151] text-[#9CA3AF] font-semibold text-sm hover:bg-[#374151]/50 transition-colors"
            >
              <Icon icon={Home} size={16} />
              면접 종료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
