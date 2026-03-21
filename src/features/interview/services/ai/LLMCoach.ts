import type { SpeechMetrics } from '../analysis/SpeechAnalyzer';

export interface CoachingResult {
  score: number;
  feedback: string;
  followUpQuestion: string;
}

export class LLMCoach {
  static async analyze(
    transcript: string,
    metrics: SpeechMetrics,
    language: string,
    videoWarningCount: number
  ): Promise<CoachingResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let score = 90;
        let feedback = '';

        if (transcript.length < 20) {
          score -= 10;
          feedback += '답변이 너무 짧습니다. ';
        }

        if (videoWarningCount > 0) {
          score -= videoWarningCount * 5;
          feedback += `시선 또는 자세 관련 경고가 ${videoWarningCount}회 발생했습니다. 카메라를 바라보는 것이 중요합니다. `;
        }

        if (metrics.badWordCount > 0) {
          score -= 30 * metrics.badWordCount;
          feedback += '부적절한 표현이 사용되었습니다. 면접에서는 반드시 피해야 합니다. ';
        }

        if (metrics.fillerCount > 5) {
          score -= 10;
          feedback += '습관어 사용이 많았습니다. 자연스러운 멈춤을 활용해보세요. ';
        } else {
          feedback += '습관어 사용이 적어 좋았습니다. ';
        }

        if (metrics.wpm < 100) {
          score -= 5;
          feedback += '말하기 속도가 다소 느립니다. 좀 더 활기차게 말해보세요. ';
        } else if (metrics.wpm > 300) {
          score -= 5;
          feedback += '말하기 속도가 다소 빠릅니다. 천천히 발음해보세요. ';
        } else {
          feedback += '말하기 속도가 적절했습니다. ';
        }

        if (metrics.pauseWarnings > 2) {
          score -= 10;
          feedback += '2초 이상의 긴 침묵이 여러 번 있었습니다. 생각을 미리 정리해보세요. ';
        }

        const isKr = language === 'ko-KR';
        const followUpQuestion = isKr
          ? '위에서 말씀하신 프로젝트에서 마주친 가장 큰 기술적 어려움은 무엇이었으며 어떻게 해결하셨나요?'
          : 'Based on what you just said, what was the biggest technical challenge you faced and how did you resolve it?';

        resolve({
          score: Math.max(0, score),
          feedback: feedback.trim(),
          followUpQuestion,
        });
      }, 1500);
    });
  }
}
