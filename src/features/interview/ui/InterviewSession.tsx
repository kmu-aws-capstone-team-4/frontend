import { useState, useEffect, useRef, useCallback } from 'react';
import { Icon } from '@/shared/ui/Icon';
import {
  Mic, Play, Square, Loader2, Timer, MonitorX,
  UserRound, EyeOff, Activity,
} from 'lucide-react';
import { useAnalysisStore } from '@/shared/store/useAnalysisStore';
import type { LogMessage } from '@/shared/store/useAnalysisStore';
import { initializeMediaPipe, getFaceLandmarker } from '@/shared/lib/mediapipe/MediaPipeService';
import { checkBehavioralFlags } from '@/shared/lib/mediapipe/AnalysisLogic';
import { MediaStreamManager } from '@/shared/lib/media/MediaStreamManager';

import type { ISTTProvider } from '@/features/interview/services/stt/STTProvider';
import { WebSpeechSTTProvider } from '@/features/interview/services/stt/WebSpeechSTTProvider';
import { SpeechAnalyzer } from '@/features/interview/services/analysis/SpeechAnalyzer';
import type { SpeechMetrics } from '@/features/interview/services/analysis/SpeechAnalyzer';
import { LLMCoach } from '@/features/interview/services/ai/LLMCoach';
import type { CoachingResult } from '@/features/interview/services/ai/LLMCoach';
import { SessionStorage } from '@/features/interview/services/storage/SessionStorage';
import { AvatarViewer } from './AvatarViewer';
import { FeedbackResult } from './FeedbackResult';

/* ───────── sub: Log Item ───────── */
function LogItem({ log }: { log: LogMessage }) {
  const bgColor = {
    info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500',
    error: 'bg-red-500/10 border-red-500/20 text-red-500',
    success: 'bg-green-500/10 border-green-500/20 text-green-400',
  }[log.type];

  const timeStr = new Date(log.timestamp).toLocaleTimeString([], {
    hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit',
  });

  return (
    <div className={`p-2.5 rounded-lg border mb-1.5 text-xs flex gap-2.5 ${bgColor}`}>
      <span className="opacity-50 font-mono shrink-0">{timeStr}</span>
      <span>{log.message}</span>
    </div>
  );
}

/* ───────── types ───────── */
interface Props {
  onEnd: () => void;
  onPermissionError?: () => void;
}

/* ───────── main ───────── */
export const InterviewSession = ({ onEnd }: Props) => {
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const audioRAFRef = useRef<number | null>(null);

  // State
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [showGuideline, setShowGuideline] = useState(true);
  const [timeLeft, setTimeLeft] = useState(1800);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Analysis store
  const { logs, fps, isAnalyzing, setIsAnalyzing, setFps, addLog, clearLogs } = useAnalysisStore();
  const rAFRef = useRef<number | null>(null);
  const lastVideoTimeRef = useRef(-1);
  const behavioralStateRef = useRef({ lookingAway: false, headTurned: false });
  const framesCountRef = useRef(0);
  const lastFpsTimeRef = useRef(performance.now());
  const videoWarningCountRef = useRef(0);

  // AI state
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Audio & NLP
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [finalText, setFinalText] = useState('');
  const [metrics, setMetrics] = useState<SpeechMetrics>({
    wpm: 0, fillerCount: 0, badWordCount: 0, pauseWarnings: 0, highlightedHtml: '',
  });
  const [isCoachAnalyzing, setIsCoachAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<CoachingResult | null>(null);
  const [language] = useState<'ko-KR' | 'en-US'>('ko-KR');

  const sttProviderRef = useRef<ISTTProvider | null>(null);
  const speechAnalyzerRef = useRef(new SpeechAnalyzer());

  /* ── Cleanup function ── */
  const cleanup = useCallback(() => {
    if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    if (audioRAFRef.current) cancelAnimationFrame(audioRAFRef.current);
    if (timerRef.current) clearInterval(timerRef.current);

    sttProviderRef.current?.stop();
    setIsAnalyzing(false);

    // Release all media resources
    MediaStreamManager.releaseAll();

    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(console.error);
      audioCtxRef.current = null;
    }
  }, [setIsAnalyzing]);

  /* ── Initialize devices ── */
  useEffect(() => {
    // Install beforeunload guard
    MediaStreamManager.installBeforeUnloadGuard();

    const setupAudioMeter = (mediaStream: MediaStream) => {
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }
        const audioCtx = audioCtxRef.current;
        if (audioCtx.state === 'suspended') audioCtx.resume();

        MediaStreamManager.registerAudioContext(audioCtx);

        const source = audioCtx.createMediaStreamSource(mediaStream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyserRef.current = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const drawMeter = () => {
          if (!analyserRef.current || !meterRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
          const avg = sum / dataArray.length;
          const pct = Math.min(100, (avg / 128) * 100);
          meterRef.current.style.width = `${pct}%`;
          audioRAFRef.current = requestAnimationFrame(drawMeter);
        };
        drawMeter();
      } catch (e) {
        console.error('Audio context init failed', e);
      }
    };

    const initDevices = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: true,
        });
        setStream(mediaStream);
        MediaStreamManager.registerStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setupAudioMeter(mediaStream);
        addLog('success', '카메라와 마이크가 연결되었습니다.');
      } catch {
        addLog('error', '카메라/마이크 권한을 허용해주세요.');
      }
    };

    initDevices();

    // Setup STT
    sttProviderRef.current = new WebSpeechSTTProvider();
    sttProviderRef.current.onResult((result) => {
      if (result.isFinal) {
        setFinalText((prev) => prev + (prev ? ' ' : '') + result.text);
        setInterimText('');
      } else {
        setInterimText(result.text);
      }
    });
    sttProviderRef.current.onError((e) => {
      addLog('error', `오디오 오류: ${String(e)}`);
    });

    // Timer
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Video Analysis ── */
  const predictWebcam = useCallback(() => {
    const video = videoRef.current;
    if (!video || !useAnalysisStore.getState().isAnalyzing) return;

    const startTimeMs = performance.now();
    framesCountRef.current++;
    if (startTimeMs - lastFpsTimeRef.current >= 1000) {
      setFps(framesCountRef.current);
      framesCountRef.current = 0;
      lastFpsTimeRef.current = startTimeMs;
    }

    if (lastVideoTimeRef.current !== video.currentTime) {
      lastVideoTimeRef.current = video.currentTime;
      const faceLandmarker = getFaceLandmarker();

      if (faceLandmarker) {
        const result = faceLandmarker.detectForVideo(video, startTimeMs);
        const flags = checkBehavioralFlags(result);
        const prev = behavioralStateRef.current;

        if (flags.lookingAway && !prev.lookingAway) {
          addLog('warning', `시선 이탈: ${flags.details?.gazeDetails || ''}`);
          videoWarningCountRef.current++;
        } else if (!flags.lookingAway && prev.lookingAway) {
          addLog('success', '시선이 정면으로 돌아왔습니다.');
        }

        if (flags.headTurned && !prev.headTurned) {
          addLog('warning', `자세 이상: ${flags.details?.headDetails || ''}`);
          videoWarningCountRef.current++;
        } else if (!flags.headTurned && prev.headTurned) {
          addLog('success', '자세가 정상으로 돌아왔습니다.');
        }
        behavioralStateRef.current = flags;
      }
    }
    rAFRef.current = requestAnimationFrame(predictWebcam);
  }, [addLog, setFps]);

  const startVideoAnalysis = async () => {
    if (!videoRef.current) return;
    setIsModelLoading(true);
    try {
      await initializeMediaPipe();
      setIsAnalyzing(true);
      addLog('info', '비디오 분석 엔진 시작됨');
      predictWebcam();
    } catch {
      addLog('error', '비전 모델 로딩 실패. 하드웨어 가속을 확인하세요.');
    } finally {
      setIsModelLoading(false);
    }
  };

  /* ── Speech metrics ── */
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (isListening) {
      intervalId = setInterval(() => {
        const m = speechAnalyzerRef.current.analyze(finalText + ' ' + interimText, language, isListening);
        setMetrics(m);
      }, 500);
    } else {
      const resetMetrics = speechAnalyzerRef.current.analyze('', language, false);
      setMetrics(resetMetrics);
    }
    return () => clearInterval(intervalId);
  }, [finalText, interimText, isListening, language]);

  /* ── Handlers ── */
  const handleStartInterview = async () => {
    if (!sttProviderRef.current) return;
    setFinalText('');
    setInterimText('');
    setFeedback(null);
    clearLogs();
    videoWarningCountRef.current = 0;

    if (!isAnalyzing) await startVideoAnalysis();

    sttProviderRef.current.start(language);
    setIsListening(true);
  };

  const handleStopInterview = async () => {
    setIsListening(false);
    setIsAnalyzing(false);
    if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    sttProviderRef.current?.stop();
    setFps(0);

    const completeTranscript = (finalText + ' ' + interimText).trim();
    if (completeTranscript.length === 0) {
      addLog('warning', '기록된 텍스트가 없어 분석을 건너뜁니다.');
      return;
    }

    setIsCoachAnalyzing(true);
    const result = await LLMCoach.analyze(completeTranscript, metrics, language, videoWarningCountRef.current);
    setFeedback(result);
    setIsCoachAnalyzing(false);

    SessionStorage.saveSession(completeTranscript, metrics, result);
    addLog('success', '면접 세션 완료 및 저장됨.');
  };

  const handleAskAI = async () => {
    if (!isListening) return;
    const currentTranscript = (finalText + ' ' + interimText).trim();
    if (!currentTranscript) {
      addLog('warning', '먼저 답변을 말씀해주세요.');
      return;
    }

    setIsAiThinking(true);
    sttProviderRef.current?.stop();

    try {
      const res = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: currentTranscript, language }),
      });
      if (!res.ok) throw new Error('API failed');

      const data = await res.json();
      addLog('info', `AI 응답: ${data.text}`);

      const aiAvatar = (window as unknown as Record<string, unknown>).aiAvatar as { speak?: (audio: string, text: string) => Promise<void> } | undefined;
      if (aiAvatar?.speak && data.audio_base64) {
        await aiAvatar.speak(data.audio_base64, data.text);
      }

      setFinalText('');
      setInterimText('');
      sttProviderRef.current?.start(language);
    } catch {
      addLog('error', 'AI 아바타 서버 연결 실패 (포트 8000 확인)');
      sttProviderRef.current?.start(language);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleFinish = () => {
    cleanup();
    onEnd();
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  /* ═══════════════════════ render ═══════════════════════ */
  return (
    <div className="w-full h-screen bg-[#0f172a] text-white flex flex-col font-sans">
      {/* ──── Header ──── */}
      <header className="h-14 border-b border-white/10 flex items-center justify-between px-6 shrink-0 bg-[#1e293b]">
        <h1 className="text-lg font-bold bg-gradient-to-r from-accent to-amber-400 text-transparent bg-clip-text flex items-center gap-2">
          <Activity className="text-accent" size={18} />
          MeFit 면접
        </h1>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-white/70 text-sm">
            <Icon icon={Timer} size={14} />
            {formatTime(timeLeft)}
          </span>
          <div className="text-sm text-slate-400 font-mono">
            {isAnalyzing ? <span className="text-green-400 w-16 inline-block text-right">{fps} FPS</span> : 'OFF'}
          </div>
          <button
            onClick={handleFinish}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/30 transition-colors"
          >
            <Icon icon={MonitorX} size={14} />
            면접 종료
          </button>
        </div>
      </header>

      {/* ──── Main ──── */}
      <main className="flex-1 overflow-hidden flex">
        {/* Left: Avatar + Video + Transcript */}
        <section className="flex-[2] p-5 flex flex-col overflow-y-auto border-r border-white/10 relative">
          <div className="flex gap-5 relative">
            {/* Main Avatar */}
            <div className="flex-[1.5] relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0f172a] min-h-[400px]">
              <AvatarViewer className="w-full h-full absolute inset-0" />

              {/* PIP Camera */}
              <div className="absolute bottom-4 right-4 w-48 aspect-video bg-black rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] border-2 border-accent/50 z-10">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform -scale-x-100" />

                {stream && showGuideline && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-60">
                    <svg viewBox="0 0 100 100" className="w-[80%] h-full max-h-[90%] text-accent drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 50 10 C 35 10, 35 45, 50 45 C 65 45, 65 10, 50 10 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 6" />
                      <path d="M 10 95 C 10 60, 90 60, 90 95" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 6" />
                    </svg>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="absolute top-2 left-2 flex gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/50 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      AI
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* NLP Metrics */}
            <div className="w-56 bg-slate-800/80 rounded-xl p-4 border border-white/10 flex flex-col shrink-0 gap-3">
              <h3 className="font-semibold text-slate-300 border-b border-white/10 pb-2 flex gap-2 items-center text-sm">
                <Mic size={14} /> NLP 분석
              </h3>
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">속도 (SPM)</span>
                  <span className="text-lg font-mono text-blue-300">{metrics.wpm}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">습관어</span>
                  <span className={`text-lg font-mono ${metrics.fillerCount > 0 ? 'text-yellow-400 font-bold' : 'text-slate-300'}`}>{metrics.fillerCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">비속어</span>
                  <span className={`text-lg font-mono ${metrics.badWordCount > 0 ? 'text-red-500 font-bold' : 'text-slate-300'}`}>{metrics.badWordCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">침묵 (&gt;2s)</span>
                  <span className={`text-lg font-mono ${metrics.pauseWarnings > 0 ? 'text-accent font-bold' : 'text-slate-300'}`}>{metrics.pauseWarnings}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/10">
                  <span className="text-xs text-slate-400">시선 경고</span>
                  <span className={`text-lg font-mono ${videoWarningCountRef.current > 0 ? 'text-pink-400 font-bold' : 'text-slate-300'}`}>{videoWarningCountRef.current}</span>
                </div>
              </div>

              {/* Volume meter */}
              <div className="mt-auto">
                <div className="text-[10px] text-slate-500 mb-1">마이크 볼륨</div>
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div ref={meterRef} className="h-full bg-gradient-to-r from-accent to-amber-400 transition-all duration-75 w-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex gap-3 w-full justify-center shrink-0 flex-wrap">
            {!isListening && !isCoachAnalyzing && !feedback && (
              <button
                onClick={handleStartInterview}
                className="bg-accent hover:bg-accent-dark px-6 flex items-center gap-2 py-3 rounded-xl font-bold text-sm transition-all shadow-[0_4px_20px_rgba(249,115,22,0.4)]"
                disabled={!stream || isModelLoading}
              >
                <Play size={16} /> 면접 시작
              </button>
            )}

            {isListening && (
              <>
                <button
                  onClick={handleAskAI}
                  disabled={isAiThinking}
                  className="bg-accent/20 hover:bg-accent/30 text-accent border border-accent/50 px-6 flex items-center gap-2 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-50"
                >
                  {isAiThinking ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
                  답변 완료 · AI 질문
                </button>
                <button
                  onClick={handleStopInterview}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-500 border border-red-500/50 px-6 flex items-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
                >
                  <Square size={16} /> 면접 중단
                </button>
              </>
            )}

            <button
              onClick={() => setShowGuideline(!showGuideline)}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all bg-[#1e293b] hover:bg-[#334155] border border-white/10 text-slate-300"
            >
              {showGuideline ? <EyeOff size={14} /> : <UserRound size={14} />}
              {showGuideline ? '가이드 숨김' : '가이드 표시'}
            </button>
          </div>

          {/* Transcript */}
          <div className="mt-6 bg-[#1e293b]/50 rounded-xl border border-white/10 flex-1 p-5 relative overflow-hidden flex flex-col min-h-[160px]">
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3 shrink-0">
              실시간 텍스트 변환
            </h3>
            <div className="flex-1 overflow-y-auto bg-black/20 rounded-lg p-3 font-mono text-sm leading-relaxed shadow-inner">
              <span className="text-white" dangerouslySetInnerHTML={{ __html: metrics.highlightedHtml }} />
              <span className="text-accent/70 italic animate-pulse ml-2">{interimText}</span>
              {finalText.length === 0 && interimText.length === 0 && !isListening && (
                <span className="text-slate-500 italic block mt-1">면접 시작 후 텍스트 변환이 시작됩니다...</span>
              )}
            </div>
          </div>
        </section>

        {/* Right: Logs */}
        <aside className="flex-1 flex flex-col bg-[#1e293b]/50 border-l border-white/10 max-w-sm">
          <div className="p-3 border-b border-white/10 flex justify-between items-center backdrop-blur bg-[#1e293b]/80 shrink-0">
            <h2 className="font-semibold text-slate-200 text-sm">분석 로그</h2>
            <button onClick={clearLogs} className="text-[10px] text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-white/10 transition-colors">
              초기화
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-0.5">
            {logs.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-500 text-xs italic">
                로그가 여기에 표시됩니다...
              </div>
            ) : (
              logs.map((log) => <LogItem key={log.id} log={log} />)
            )}
          </div>
        </aside>
      </main>

      {/* Coach Loading Overlay */}
      {isCoachAnalyzing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1e293b] p-8 rounded-2xl flex flex-col items-center border border-white/10 shadow-2xl">
            <Loader2 className="w-12 h-12 animate-spin mb-4 text-accent" />
            <h2 className="text-xl font-bold bg-gradient-to-r from-accent to-amber-400 text-transparent bg-clip-text">AI 피드백 분석 중...</h2>
            <p className="text-slate-400 mt-2 text-sm">자세, 시선, 음성 데이터를 분석하고 있습니다...</p>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {feedback && <FeedbackResult result={feedback} onClose={handleFinish} />}
    </div>
  );
};
