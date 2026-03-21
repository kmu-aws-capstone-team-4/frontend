import { create } from 'zustand';

export type LogMessage = {
  id: string;
  timestamp: number;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
};

interface AnalysisState {
  isAnalyzing: boolean;
  fps: number;
  logs: LogMessage[];
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setFps: (fps: number) => void;
  addLog: (type: LogMessage['type'], message: string) => void;
  clearLogs: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  isAnalyzing: false,
  fps: 0,
  logs: [],
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setFps: (fps) => set({ fps }),
  addLog: (type, message) =>
    set((state) => {
      const newLog: LogMessage = {
        id: Math.random().toString(36).substring(7),
        timestamp: Date.now(),
        type,
        message,
      };
      return { logs: [newLog, ...state.logs].slice(0, 100) };
    }),
  clearLogs: () => set({ logs: [] }),
}));
