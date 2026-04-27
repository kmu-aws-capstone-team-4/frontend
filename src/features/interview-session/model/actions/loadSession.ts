/** 세션 로드: 진행 중이면 현재 위치를 복원, 완료면 종료 상태로 표시. 재방문 시 자동 takeover 로 ownership 인수. */
import { interviewApi } from "../../api/interviewApi";
import type { InterviewSessionStore } from "../types";

type Set = (partial: Partial<InterviewSessionStore>) => void;

async function autoTakeoverIfPossible(set: Set, interviewSessionUuid: string) {
  try {
    const ownership = await interviewApi.takeoverInterviewSession(interviewSessionUuid);
    set({
      ownerToken: ownership.ownerToken,
      ownerVersion: ownership.ownerVersion,
      wsTicket: ownership.wsTicket,
    });
  } catch {
    /* takeover 실패 (예: 권한 없음) — 페이지는 read-only 상태로 표시될 수 있음 */
  }
}

export async function loadInterviewSession(set: Set, interviewSessionUuid: string) {
  try {
    set({ interviewPhase: "connecting" });
    const interviewSession = await interviewApi.getInterviewSession(interviewSessionUuid);

    if (interviewSession.interviewSessionStatus !== "in_progress") {
      set({ interviewSession, interviewPhase: "idle" });
      return;
    }

    const turns = await interviewApi.getInterviewTurns(interviewSessionUuid);

    if (turns.length === 0) {
      set({ interviewSession, interviewTurns: [], interviewPhase: "idle" });
      return;
    }

    const firstUnansweredIdx = turns.findIndex((t) => !t.answer);

    if (firstUnansweredIdx < 0) {
      try { await interviewApi.finishInterview(interviewSessionUuid); } catch { /* ignore */ }
      set({ interviewSession, interviewTurns: turns, interviewPhase: "finished" });
      return;
    }

    await autoTakeoverIfPossible(set, interviewSessionUuid);

    set({
      interviewSession,
      interviewTurns: turns,
      currentInterviewTurnIndex: firstUnansweredIdx,
      currentInterviewTurn: turns[firstUnansweredIdx],
      interviewPhase: "listening",
    });
  } catch {
    set({ interviewPhase: "error", interviewError: "면접 세션을 불러올 수 없습니다." });
  }
}

export async function loadInterviewTurns(set: Set, interviewSessionUuid: string) {
  try {
    const interviewTurns = await interviewApi.getInterviewTurns(interviewSessionUuid);
    set({ interviewTurns });
  } catch { /* ignore */ }
}

export async function startInterview(set: Set, interviewSessionUuid: string) {
  try {
    set({ interviewPhase: "starting" });
    const response = await interviewApi.startInterview(interviewSessionUuid);
    const interviewTurns = response.turns;
    const firstTurn = interviewTurns[0] ?? null;
    set({
      interviewTurns,
      currentInterviewTurnIndex: 0,
      currentInterviewTurn: firstTurn,
      interviewPhase: "listening",
      ownerToken: response.ownerToken,
      ownerVersion: response.ownerVersion,
      wsTicket: response.wsTicket,
    });
  } catch {
    set({ interviewPhase: "error", interviewError: "면접 시작에 실패했습니다." });
  }
}

export async function finishInterview(set: Set, interviewSessionUuid: string) {
  try {
    await interviewApi.finishInterview(interviewSessionUuid);
  } catch {
    /* 서버 오류여도 클라이언트 상태는 finished로 전환 */
  }
  set({ interviewPhase: "finished" });
}
