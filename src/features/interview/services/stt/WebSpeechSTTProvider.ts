import type { ISTTProvider, STTResult } from './STTProvider';

export class WebSpeechSTTProvider implements ISTTProvider {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private recognition: any;
  private resultCallback?: (result: STTResult) => void;
  private errorCallback?: (error: unknown) => void;
  private isIntentionalStop = false;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognitionCtor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionCtor) {
      this.recognition = new SpeechRecognitionCtor();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (this.resultCallback) {
          if (finalTranscript) {
            this.resultCallback({ text: finalTranscript, isFinal: true });
          }
          if (interimTranscript) {
            this.resultCallback({ text: interimTranscript, isFinal: false });
          }
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.recognition.onerror = (event: any) => {
        if (event.error === 'no-speech') return;
        this.errorCallback?.(event.error);
      };

      this.recognition.onend = () => {
        if (!this.isIntentionalStop) {
          try {
            this.recognition?.start();
          } catch {
            // already started
          }
        }
      };
    } else {
      console.error('Web Speech API is not supported in this browser.');
    }
  }

  start(language: string): void {
    if (!this.recognition) return;
    this.isIntentionalStop = false;
    this.recognition.lang = language;
    try {
      this.recognition.start();
    } catch {
      console.warn('Recognition already started');
    }
  }

  stop(): void {
    if (!this.recognition) return;
    this.isIntentionalStop = true;
    try {
      this.recognition.stop();
    } catch {
      // noop
    }
  }

  switchLanguage(language: string): void {
    if (!this.recognition) return;
    this.stop();
    setTimeout(() => {
      this.start(language);
    }, 400);
  }

  onResult(callback: (result: STTResult) => void): void {
    this.resultCallback = callback;
  }

  onError(callback: (error: unknown) => void): void {
    this.errorCallback = callback;
  }
}
