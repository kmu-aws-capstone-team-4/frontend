import type { IAvatarProvider } from './IAvatarProvider';

export class PrettyAvatarProvider implements IAvatarProvider {
  private container: HTMLElement | null = null;
  private audio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaElementAudioSourceNode | null = null;
  private animationFrameId: number | null = null;

  private mouthElement: HTMLElement | null = null;
  private avatarWrapper: HTMLElement | null = null;
  private isDestroyed = false;

  private blinkIntervalId: number | null = null;

  async initialize(container: HTMLElement): Promise<void> {
    this.container = container;

    const wrapper = document.createElement('div');
    wrapper.className = 'w-full h-full flex flex-col items-center justify-center relative overflow-hidden text-center';
    wrapper.style.background = 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)';

    const styleId = 'pretty-avatar-style';
    if (!document.getElementById(styleId)) {
      const styleString = `
        @keyframes floatHead {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        @keyframes hairSway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(2deg); }
        }
        .pretty-face {
          background: linear-gradient(135deg, #ffe0d2 0%, #ffcba4 100%);
          box-shadow:
              inset -10px -10px 20px rgba(200, 100, 50, 0.2),
              0 20px 40px rgba(0, 0, 0, 0.4);
        }
        .pretty-eye {
          transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }
        .pretty-hair {
          background: linear-gradient(180deg, #2d3748 0%, #1a202c 100%);
        }
        .avatar-container {
          animation: floatHead 6s ease-in-out infinite;
        }
        .speaking-glow {
           box-shadow:
              inset -10px -10px 20px rgba(200, 100, 50, 0.2),
              0 0 60px rgba(249, 115, 22, 0.3) !important;
        }
      `;
      const styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.innerHTML = styleString;
      document.head.appendChild(styleEl);
    }

    wrapper.innerHTML = `
      <div id="avatar-body-wrapper" class="avatar-container relative w-64 h-64 shrink-0 transition-transform duration-300">
        <div class="pretty-hair absolute -top-8 -left-4 w-72 h-40 rounded-t-[100px] rounded-b-3xl -z-10 animate-[hairSway_4s_ease-in-out_infinite]"></div>
        <div id="pretty-face" class="pretty-face w-full h-full rounded-[45%] flex flex-col items-center relative overflow-hidden border-4 border-white/5 transition-all duration-300">
            <div class="absolute top-[45%] left-[10%] w-12 h-6 bg-rose-400/30 rounded-full blur-md"></div>
            <div class="absolute top-[45%] right-[10%] w-12 h-6 bg-rose-400/30 rounded-full blur-md"></div>
            <div class="absolute top-[35%] w-full flex justify-between px-16">
                <div class="pretty-eye w-8 h-10 bg-white rounded-[50%] relative overflow-hidden shadow-inner">
                    <div class="absolute bottom-1 right-1 w-5 h-6 bg-slate-800 rounded-full flex items-center justify-center">
                        <div class="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
                    </div>
                </div>
                <div class="pretty-eye w-8 h-10 bg-white rounded-[50%] relative overflow-hidden shadow-inner">
                    <div class="absolute bottom-1 left-1 w-5 h-6 bg-slate-800 rounded-full flex items-center justify-center">
                        <div class="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
                    </div>
                </div>
            </div>
            <div class="absolute top-[32%] w-full flex justify-between px-10 pointer-events-none opacity-80">
                <div class="w-16 h-16 border-4 border-amber-600/60 rounded-[40%]"></div>
                <div class="absolute w-6 h-1 bg-amber-600/60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                <div class="w-16 h-16 border-4 border-amber-600/60 rounded-[40%]"></div>
            </div>
            <div class="absolute top-[55%] w-3 h-2 border-b-2 border-orange-900/10 rounded-full"></div>
            <div class="absolute top-[65%] w-full flex justify-center">
                <div id="pretty-mouth" class="w-8 h-2 bg-[#881337] rounded-full transition-all duration-75 relative overflow-hidden" style="border-radius: 10px;">
                    <div class="absolute top-0 w-full h-[30%] bg-white/90"></div>
                    <div class="absolute bottom-0 w-full h-[40%] bg-rose-400/80 rounded-full transform translate-y-1/2"></div>
                </div>
            </div>
            <svg class="absolute top-0 left-0 w-full h-24" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M 0 0 L 100 0 L 100 15 Q 75 35 50 20 Q 25 35 0 15 Z" fill="#1e293b"/>
            </svg>
        </div>
        <div class="absolute -bottom-16 left-1/2 -translate-x-1/2 w-16 h-20 bg-[#e6bca0] -z-10 rounded-b-xl shadow-inner border-x border-[#c1967a]"></div>
        <div class="absolute -bottom-24 left-1/2 -translate-x-1/2 w-48 h-24 bg-accent -z-20 rounded-t-[40px] shadow-2xl overflow-hidden border-t-4 border-accent-dark">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-10 bg-white clip-polygon-collar flex justify-center pt-2">
                <div class="w-2 h-2 rounded-full bg-slate-800"></div>
            </div>
        </div>
      </div>
      <div id="avatar-status" class="mt-24 px-6 py-2 rounded-full bg-slate-800/80 border border-white/5 backdrop-blur-md text-sm text-slate-300 font-medium tracking-wide flex items-center gap-3 shadow-lg">
         <span class="w-2.5 h-2.5 rounded-full bg-slate-500 shadow-[0_0_10px_rgba(100,116,139,0.5)]"></span>
         <span class="status-text">AI 면접관 대기 중</span>
      </div>
    `;

    const collarStyle = document.createElement('style');
    collarStyle.innerHTML = `.clip-polygon-collar { clip-path: polygon(0 0, 100% 0, 70% 100%, 30% 100%); }`;
    wrapper.appendChild(collarStyle);

    this.container.appendChild(wrapper);
    this.avatarWrapper = wrapper.querySelector('#avatar-body-wrapper');
    this.mouthElement = wrapper.querySelector('#pretty-mouth');

    this.startBlinking();
  }

  private startBlinking() {
    const blink = () => {
      if (this.isDestroyed || !this.container) return;
      const eyes = this.container.querySelectorAll('.pretty-eye') as NodeListOf<HTMLElement>;

      eyes.forEach((eye) => {
        eye.style.transform = 'scaleY(0.1)';
      });

      setTimeout(() => {
        if (this.isDestroyed) return;
        eyes.forEach((eye) => {
          eye.style.transform = 'scaleY(1)';
        });
      }, 150);

      this.blinkIntervalId = window.setTimeout(blink, Math.random() * 4000 + 2000);
    };
    blink();
  }

  async speak(audioUrlOrBase64: string, text: string): Promise<void> {
    this.stopAudio();

    const statusDot = this.container?.querySelector('#avatar-status span');
    const statusText = this.container?.querySelector('.status-text');
    const faceElement = this.container?.querySelector('#pretty-face');

    if (statusDot && statusText) {
      statusDot.className = 'w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]';
      statusText.textContent = '답변 중...';
    }

    if (faceElement) {
      faceElement.classList.add('speaking-glow');
    }

    if (this.avatarWrapper) {
      if (text.includes('?') || text.includes('어려움')) {
        this.avatarWrapper.style.transform = 'rotate(-3deg) scale(1.02)';
      } else if (text.includes('!') || text.includes('좋습니다') || text.includes('훌륭')) {
        this.avatarWrapper.style.transform = 'translateY(-10px) scale(1.05)';
      } else {
        this.avatarWrapper.style.transform = '';
      }
    }

    return new Promise((resolve) => {
      this.audio = new Audio(audioUrlOrBase64);
      this.audio.crossOrigin = 'anonymous';

      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 256;
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      if (this.source) {
        this.source.disconnect();
      }
      this.source = this.audioCtx.createMediaElementSource(this.audio);
      this.source.connect(this.analyser!);
      this.analyser!.connect(this.audioCtx.destination);

      const bufferLength = this.analyser!.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const renderFrame = () => {
        if (!this.analyser || !this.mouthElement || !this.audio || this.audio.paused) return;

        this.analyser.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const averageVolume = sum / bufferLength;

        if (averageVolume > 5) {
          const height = Math.min(48, 8 + (averageVolume / 255) * 50);
          const width = Math.max(24, 32 - (averageVolume / 255) * 10);
          const radius = Math.min(24, 10 + (averageVolume / 255) * 20);

          this.mouthElement.style.height = `${height}px`;
          this.mouthElement.style.width = `${width}px`;
          this.mouthElement.style.borderRadius = `${radius}px`;
        } else {
          this.mouthElement.style.height = `8px`;
          this.mouthElement.style.width = `32px`;
          this.mouthElement.style.borderRadius = `10px`;
        }

        this.animationFrameId = requestAnimationFrame(renderFrame);
      };

      this.audio.onplay = () => {
        renderFrame();
      };

      this.audio.onended = () => {
        this.stopAudio();
        resolve();
      };

      this.audio.onerror = () => {
        this.stopAudio();
        resolve();
      };

      this.audio.play().catch(() => {
        this.stopAudio();
        resolve();
      });
    });
  }

  private stopAudio() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }

    if (this.mouthElement) {
      this.mouthElement.style.height = `8px`;
      this.mouthElement.style.width = `32px`;
      this.mouthElement.style.borderRadius = `10px`;
    }

    if (this.avatarWrapper) {
      this.avatarWrapper.style.transform = '';
    }

    const faceElement = this.container?.querySelector('#pretty-face');
    if (faceElement) {
      faceElement.classList.remove('speaking-glow');
    }

    const statusDot = this.container?.querySelector('#avatar-status span');
    const statusText = this.container?.querySelector('.status-text');
    if (statusDot && statusText) {
      statusDot.className = 'w-2.5 h-2.5 rounded-full bg-slate-500 shadow-[0_0_10px_rgba(100,116,139,0.5)]';
      statusText.textContent = 'AI 면접관 대기 중';
    }
  }

  stop(): void {
    this.stopAudio();
  }

  destroy(): void {
    this.isDestroyed = true;
    this.stopAudio();
    if (this.blinkIntervalId) {
      clearTimeout(this.blinkIntervalId);
    }
    if (this.source) {
      this.source.disconnect();
    }
    if (this.audioCtx) {
      this.audioCtx.close();
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
    this.mouthElement = null;
    this.avatarWrapper = null;
  }
}
