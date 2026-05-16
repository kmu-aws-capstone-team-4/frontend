import { WebSpeechSTTProvider } from "../WebSpeechSTTProvider";
import type { STTResult } from "../types";

interface MockResultEntry {
  transcript: string;
  isFinal: boolean;
}

class MockSpeechRecognition {
  continuous = false;
  interimResults = false;
  lang = "";
  onresult: ((event: unknown) => void) | null = null;
  onerror: ((event: { error: string }) => void) | null = null;
  onend: (() => void) | null = null;
  startCount = 0;
  stopCount = 0;

  start(): void { this.startCount++; }
  stop(): void { this.stopCount++; }
  addEventListener(): void {}
  removeEventListener(): void {}

  emitResult(entries: MockResultEntry[]): void {
    const results = entries.map((e) => ({
      isFinal: e.isFinal,
      0: { transcript: e.transcript, confidence: 1 },
      length: 1,
    }));
    (results as unknown as { length: number }).length = entries.length;
    this.onresult?.({ resultIndex: 0, results });
  }

  emitError(error: string): void {
    this.onerror?.({ error });
  }

  emitEnd(): void {
    this.onend?.();
  }
}

let lastInstance: MockSpeechRecognition | null = null;

function installSpeechRecognition(): void {
  (window as unknown as Record<string, unknown>).SpeechRecognition = function () {
    lastInstance = new MockSpeechRecognition();
    return lastInstance;
  };
}

function uninstallSpeechRecognition(): void {
  delete (window as { SpeechRecognition?: unknown }).SpeechRecognition;
  delete (window as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
}

beforeEach(() => {
  uninstallSpeechRecognition();
  lastInstance = null;
});

afterEach(() => {
  uninstallSpeechRecognition();
  lastInstance = null;
});

// ── 미지원 환경 ────────────────────────────────────────────────────────────

describe("WebSpeechSTTProvider — 미지원 환경", () => {
  it("SpeechRecognition 가 window 에 없음 → console.error + recognition=null", () => {
    const errSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const p = new WebSpeechSTTProvider();
    expect(errSpy).toHaveBeenCalledWith(expect.stringContaining("Web Speech API"));

    expect(() => p.start("ko-KR")).not.toThrow();
    expect(() => p.stop()).not.toThrow();

    errSpy.mockRestore();
  });
});

// ── 정상 동작 ──────────────────────────────────────────────────────────────

describe("WebSpeechSTTProvider — 정상 동작", () => {
  beforeEach(() => {
    installSpeechRecognition();
  });

  it("constructor → continuous=true, interimResults=true 설정", () => {
    new WebSpeechSTTProvider();
    expect(lastInstance).not.toBeNull();
    expect(lastInstance!.continuous).toBe(true);
    expect(lastInstance!.interimResults).toBe(true);
  });

  it("start(lang) → recognition.lang 설정 + recognition.start() 호출 + startTime 갱신", () => {
    const before = Date.now();
    const p = new WebSpeechSTTProvider();
    p.start("en-US");
    expect(lastInstance!.lang).toBe("en-US");
    expect(lastInstance!.startCount).toBe(1);
    expect(p.getStartTime()).toBeGreaterThanOrEqual(before);
  });

  it("recognition.start 가 throw 해도 swallow (already started)", () => {
    const p = new WebSpeechSTTProvider();
    lastInstance!.start = () => { throw new Error("already started"); };
    expect(() => p.start("ko-KR")).not.toThrow();
  });

  it("stop() → isIntentionalStop=true + recognition.stop()", () => {
    const p = new WebSpeechSTTProvider();
    p.start("ko-KR");
    p.stop();
    expect(lastInstance!.stopCount).toBe(1);
  });

  it("onresult: final transcript → resultCallback({ text, isFinal:true, timestampMs })", () => {
    const p = new WebSpeechSTTProvider();
    const cb = jest.fn();
    p.onResult(cb);
    p.start("ko-KR");
    lastInstance!.emitResult([{ transcript: "최종 결과", isFinal: true }]);
    expect(cb).toHaveBeenCalledTimes(1);
    const result = cb.mock.calls[0][0] as STTResult;
    expect(result.text).toBe("최종 결과");
    expect(result.isFinal).toBe(true);
    expect(result.timestampMs).toBeGreaterThanOrEqual(0);
  });

  it("onresult: interim transcript → resultCallback({ isFinal:false })", () => {
    const p = new WebSpeechSTTProvider();
    const cb = jest.fn();
    p.onResult(cb);
    p.start("ko-KR");
    lastInstance!.emitResult([{ transcript: "임시 결과", isFinal: false }]);
    expect(cb).toHaveBeenCalledTimes(1);
    expect((cb.mock.calls[0][0] as STTResult).isFinal).toBe(false);
  });

  it("onresult: final + interim 동시 존재 → 2 회 호출 (final 먼저, interim 다음)", () => {
    const p = new WebSpeechSTTProvider();
    const cb = jest.fn();
    p.onResult(cb);
    p.start("ko-KR");
    lastInstance!.emitResult([
      { transcript: "확정", isFinal: true },
      { transcript: "임시", isFinal: false },
    ]);
    expect(cb).toHaveBeenCalledTimes(2);
    expect((cb.mock.calls[0][0] as STTResult).isFinal).toBe(true);
    expect((cb.mock.calls[1][0] as STTResult).isFinal).toBe(false);
  });

  it("onresult: resultCallback 미설정 → 호출 안전 (no throw)", () => {
    const p = new WebSpeechSTTProvider();
    p.start("ko-KR");
    expect(() =>
      lastInstance!.emitResult([{ transcript: "x", isFinal: true }]),
    ).not.toThrow();
  });

  it("onerror: 'no-speech' → errorCallback 미호출 (정상 종료 케이스 무시)", () => {
    const p = new WebSpeechSTTProvider();
    const errCb = jest.fn();
    p.onError(errCb);
    lastInstance!.emitError("no-speech");
    expect(errCb).not.toHaveBeenCalled();
  });

  it("onerror: 'no-speech' 외 에러 → errorCallback 호출", () => {
    const p = new WebSpeechSTTProvider();
    const errCb = jest.fn();
    p.onError(errCb);
    lastInstance!.emitError("network");
    expect(errCb).toHaveBeenCalledWith("network");
  });

  it("onend: isIntentionalStop=false (stop 호출 안 함) → recognition.start() 자동 재시작", () => {
    const p = new WebSpeechSTTProvider();
    p.start("ko-KR");
    expect(lastInstance!.startCount).toBe(1);
    lastInstance!.emitEnd();
    expect(lastInstance!.startCount).toBe(2);
  });

  it("onend: stop() 후 isIntentionalStop=true → 재시작 안 함", async () => {
    const p = new WebSpeechSTTProvider();
    p.start("ko-KR");
    expect(lastInstance!.startCount).toBe(1);
    p.stop();
    lastInstance!.emitEnd();
    expect(lastInstance!.startCount).toBe(1);
    await Promise.resolve();
    lastInstance!.emitEnd();
    expect(lastInstance!.startCount).toBe(1);
  });

  it("switchLanguage: stop → 400ms 후 새 lang 으로 start", () => {
    jest.useFakeTimers();
    const p = new WebSpeechSTTProvider();
    p.start("ko-KR");
    p.switchLanguage("en-US");
    expect(lastInstance!.stopCount).toBe(1);
    expect(lastInstance!.startCount).toBe(1);
    jest.advanceTimersByTime(400);
    expect(lastInstance!.startCount).toBe(2);
    expect(lastInstance!.lang).toBe("en-US");
    jest.useRealTimers();
  });
});

// ── webkit prefix fallback ─────────────────────────────────────────────────

describe("WebSpeechSTTProvider — webkit prefix fallback", () => {
  it("webkitSpeechRecognition 만 있을 때 → 정상 인스턴스화", () => {
    let webkitInstance: MockSpeechRecognition | null = null;
    (window as unknown as Record<string, unknown>).webkitSpeechRecognition = function () {
      webkitInstance = new MockSpeechRecognition();
      return webkitInstance;
    };
    const p = new WebSpeechSTTProvider();
    p.start("ko-KR");
    expect(webkitInstance).not.toBeNull();
    expect(webkitInstance!.startCount).toBe(1);
  });
});

// ── isActive gate ──────────────────────────────────────────────────────────

describe("WebSpeechSTTProvider — isActive gate", () => {
  beforeEach(() => {
    installSpeechRecognition();
  });

  it("start() 전에는 onresult 결과가 resultCallback 에 전달되지 않는다", () => {
    const p = new WebSpeechSTTProvider();
    const cb = jest.fn();
    p.onResult(cb);
    lastInstance!.emitResult([{ transcript: "조기 결과", isFinal: true }]);
    expect(cb).not.toHaveBeenCalled();
  });

  it("start() 후 onresult 결과가 resultCallback 에 전달된다", () => {
    const p = new WebSpeechSTTProvider();
    const cb = jest.fn();
    p.onResult(cb);
    p.start("ko-KR");
    lastInstance!.emitResult([{ transcript: "정상 결과", isFinal: true }]);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it("stop() 직후 onresult 가 발생해도 resultCallback 에 전달되지 않는다", () => {
    const p = new WebSpeechSTTProvider();
    const cb = jest.fn();
    p.onResult(cb);
    p.start("ko-KR");
    p.stop();
    lastInstance!.emitResult([{ transcript: "잔여 결과", isFinal: true }]);
    expect(cb).not.toHaveBeenCalled();
  });

  it("stop() 후 start() 재호출 시 onresult 가 다시 전달된다", () => {
    const p = new WebSpeechSTTProvider();
    const cb = jest.fn();
    p.onResult(cb);
    p.start("ko-KR");
    p.stop();
    p.start("ko-KR");
    lastInstance!.emitResult([{ transcript: "재시작 후 결과", isFinal: true }]);
    expect(cb).toHaveBeenCalledTimes(1);
    expect((cb.mock.calls[0][0] as STTResult).text).toBe("재시작 후 결과");
  });
});

// ── stop() race condition 방어 ─────────────────────────────────────────────

describe("WebSpeechSTTProvider — stop() race condition 방어", () => {
  beforeEach(() => {
    installSpeechRecognition();
  });

  it("stop() 직후 onend 가 동기적으로 발생해도 재시작하지 않는다", () => {
    const p = new WebSpeechSTTProvider();
    p.start("ko-KR");
    expect(lastInstance!.startCount).toBe(1);
    p.stop();
    lastInstance!.emitEnd();
    expect(lastInstance!.startCount).toBe(1);
  });

  it("stop() 후 마이크로태스크 완료 시점에 onend 가 복원되어도 isIntentionalStop=true 로 재시작 안 함", async () => {
    const p = new WebSpeechSTTProvider();
    p.start("ko-KR");
    p.stop();
    await Promise.resolve();
    lastInstance!.emitEnd();
    expect(lastInstance!.startCount).toBe(1);
  });

  it("stop() 후 start() 재호출 시 isIntentionalStop 이 false 로 리셋되어 자동 재시작 동작", async () => {
    const p = new WebSpeechSTTProvider();
    p.start("ko-KR");
    p.stop();
    await Promise.resolve();
    p.start("ko-KR");
    expect(lastInstance!.startCount).toBe(2);
    lastInstance!.emitEnd();
    expect(lastInstance!.startCount).toBe(3);
  });
});

// ── setShouldRestartGuard ──────────────────────────────────────────────────

describe("WebSpeechSTTProvider — setShouldRestartGuard", () => {
  beforeEach(() => {
    installSpeechRecognition();
  });

  it("guard 가 false 를 반환하면 isIntentionalStop=false 여도 재시작하지 않는다", () => {
    const p = new WebSpeechSTTProvider();
    p.setShouldRestartGuard(() => false);
    p.start("ko-KR");
    lastInstance!.emitEnd();
    expect(lastInstance!.startCount).toBe(1);
  });

  it("guard 가 true 를 반환하면 isIntentionalStop=false 일 때 정상 재시작한다", () => {
    const p = new WebSpeechSTTProvider();
    p.setShouldRestartGuard(() => true);
    p.start("ko-KR");
    lastInstance!.emitEnd();
    expect(lastInstance!.startCount).toBe(2);
  });

  it("guard 를 null 로 제거하면 기본 동작(isIntentionalStop 만 체크)으로 복귀한다", () => {
    const p = new WebSpeechSTTProvider();
    p.setShouldRestartGuard(() => false);
    p.setShouldRestartGuard(null);
    p.start("ko-KR");
    lastInstance!.emitEnd();
    expect(lastInstance!.startCount).toBe(2);
  });

  it("speaking phase 시뮬레이션: guard 가 phase 를 추적하여 tts_playing 중 재시작 차단", () => {
    let currentPhase = "tts_playing";
    const p = new WebSpeechSTTProvider();
    p.setShouldRestartGuard(() => currentPhase === "speaking");
    p.start("ko-KR");
    expect(lastInstance!.startCount).toBe(1);

    lastInstance!.emitEnd();
    expect(lastInstance!.startCount).toBe(1); // tts_playing → 재시작 없음

    currentPhase = "speaking";
    lastInstance!.emitEnd();
    expect(lastInstance!.startCount).toBe(2); // speaking → 재시작

    currentPhase = "submitting";
    lastInstance!.emitEnd();
    expect(lastInstance!.startCount).toBe(2); // submitting → 재시작 없음
  });
});
