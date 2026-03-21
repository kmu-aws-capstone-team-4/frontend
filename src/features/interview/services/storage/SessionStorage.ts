import type { SpeechMetrics } from '../analysis/SpeechAnalyzer';
import type { CoachingResult } from '../ai/LLMCoach';

export interface InterviewSessionRecord {
  id: string;
  date: number;
  transcript: string;
  metrics: SpeechMetrics;
  feedback: CoachingResult;
}

export class SessionStorage {
  private static STORAGE_KEY = 'virtual_interview_sessions';

  static getSessions(): InterviewSessionRecord[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static saveSession(transcript: string, metrics: SpeechMetrics, feedback: CoachingResult): void {
    const session: InterviewSessionRecord = {
      id: crypto.randomUUID(),
      date: Date.now(),
      transcript,
      metrics,
      feedback,
    };
    const sessions = this.getSessions();
    sessions.unshift(session);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessions));
  }

  static clearAll(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
