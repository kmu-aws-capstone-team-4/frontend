/**
 * MediaStreamManager — centralized media resource management.
 * Ensures all camera/mic streams and AudioContexts are properly released on cleanup.
 */

type CleanupFn = () => void;

class MediaStreamManagerClass {
  private streams: Set<MediaStream> = new Set();
  private audioContexts: Set<AudioContext> = new Set();
  private cleanups: Set<CleanupFn> = new Set();

  /** Register a MediaStream for tracking. */
  registerStream(stream: MediaStream) {
    this.streams.add(stream);
  }

  /** Register an AudioContext for tracking. */
  registerAudioContext(ctx: AudioContext) {
    this.audioContexts.add(ctx);
  }

  /** Register an arbitrary cleanup function. */
  registerCleanup(fn: CleanupFn) {
    this.cleanups.add(fn);
  }

  /** Stop all tracks on a specific stream and unregister it. */
  releaseStream(stream: MediaStream) {
    stream.getTracks().forEach((t) => t.stop());
    this.streams.delete(stream);
  }

  /** Release ALL registered resources. */
  releaseAll() {
    // Stop all streams
    this.streams.forEach((stream) => {
      stream.getTracks().forEach((t) => t.stop());
    });
    this.streams.clear();

    // Close all audio contexts
    this.audioContexts.forEach((ctx) => {
      ctx.close().catch(console.error);
    });
    this.audioContexts.clear();

    // Run all custom cleanups
    this.cleanups.forEach((fn) => {
      try {
        fn();
      } catch (e) {
        console.error('[MediaStreamManager] cleanup error:', e);
      }
    });
    this.cleanups.clear();
  }

  /** Install beforeunload handler for guaranteed cleanup. */
  installBeforeUnloadGuard() {
    window.addEventListener('beforeunload', () => {
      this.releaseAll();
    });
  }
}

export const MediaStreamManager = new MediaStreamManagerClass();
