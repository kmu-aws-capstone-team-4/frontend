import type { ISTTProvider, STTResult } from "./types";

// SpeechRecognition is not in standard TypeScript lib — declare minimal shim
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}
interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}
interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}
interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

export class WebSpeechSTTProvider implements ISTTProvider {
  private recognition: SpeechRecognitionInstance | null = null;
  private resultCallback?: (result: STTResult) => void;
  private errorCallback?: (error: unknown) => void;
  private isIntentionalStop = false;
  private isActive = false;  // start() ~ stop() 사이에만 true — onresult 결과 기록 gate
  private startTime = 0;
  /**
   * 자동 재시작 허용 여부를 외부에서 제어하는 guard.
   * null(기본값)이면 isIntentionalStop 만으로 판단.
   * 함수가 주입되면 isIntentionalStop=false 이더라도 false 를 반환하면 재시작하지 않는다.
   */
  private shouldRestartGuard: (() => boolean) | null = null;

  constructor() {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      console.error("Web Speech API is not supported in this browser.");
      return;
    }

    this.recognition = new SpeechRecognitionClass();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      // isActive 가 false 이면 speaking phase 가 아니므로 결과를 버린다.
      // stop() 호출 후 브라우저가 비동기로 전달하는 잔여 onresult 를 차단한다.
      if (!this.isActive) return;

      let interimTranscript = "";
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      if (this.resultCallback) {
        const timestampMs = Date.now() - this.startTime;
        if (finalTranscript) this.resultCallback({ text: finalTranscript, isFinal: true, timestampMs });
        if (interimTranscript) this.resultCallback({ text: interimTranscript, isFinal: false, timestampMs });
      }
    };

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "no-speech") return;
      this.errorCallback?.(event.error);
    };

    this.recognition.onend = () => {
      // isIntentionalStop 이 true 이면 재시작하지 않는다.
      // shouldRestartGuard 가 주입된 경우 false 를 반환하면 재시작하지 않는다.
      // 두 조건 모두 통과해야 자동 재시작한다.
      const guardAllows = this.shouldRestartGuard ? this.shouldRestartGuard() : true;
      if (!this.isIntentionalStop && guardAllows) {
        try { this.recognition?.start(); } catch { /* already running */ }
      }
    };
  }

  start(language: string): void {
    if (!this.recognition) return;
    this.isIntentionalStop = false;
    this.isActive = true;
    this.startTime = Date.now();
    this.recognition.lang = language;
    try { this.recognition.start(); } catch { /* already started */ }
  }

  getStartTime(): number {
    return this.startTime;
  }

  stop(): void {
    if (!this.recognition) return;
    // isActive 를 즉시 false 로 설정하여 이후 도착하는 onresult 를 차단한다.
    // isIntentionalStop 을 먼저 true 로 설정한 뒤 stop() 을 호출한다.
    // onend 가 stop() 호출 직전에 이미 큐에 들어가 있는 race condition 을 방지하기 위해
    // onend 핸들러를 일시적으로 null 로 교체하고, stop() 완료 후 복원한다.
    this.isActive = false;
    this.isIntentionalStop = true;
    const savedOnEnd = this.recognition.onend;
    this.recognition.onend = null;
    try { this.recognition.stop(); } catch { /* already stopped */ }
    // 마이크로태스크 이후 복원 — 이미 큐에 들어간 onend 이벤트가 처리된 뒤 재등록된다.
    Promise.resolve().then(() => {
      if (this.recognition) this.recognition.onend = savedOnEnd;
    });
  }

  /**
   * 자동 재시작 guard 를 주입한다.
   * speaking phase 에서만 STT 가 동작해야 하는 경우 외부에서 phase 체크 함수를 전달한다.
   * null 을 전달하면 guard 를 제거한다.
   */
  setShouldRestartGuard(guard: (() => boolean) | null): void {
    this.shouldRestartGuard = guard;
  }

  switchLanguage(language: string): void {
    this.stop();
    setTimeout(() => this.start(language), 400);
  }

  onResult(callback: (result: STTResult) => void): void {
    this.resultCallback = callback;
  }

  onError(callback: (error: unknown) => void): void {
    this.errorCallback = callback;
  }
}
