import type { FaceLandmarkerResult, NormalizedLandmark } from '@mediapipe/tasks-vision';

/**
 * Analyze gaze direction based on iris center relative to eye corners.
 * Returns ratio (0.0-1.0); ~0.5 is looking forward.
 * Threshold: 0.35-0.65 indicates center gaze.
 */
export const analyzeGaze = (landmarks: NormalizedLandmark[]) => {
  const getRatio = (inner: number, outer: number, iris: number) => {
    const ptInner = landmarks[inner];
    const ptOuter = landmarks[outer];
    const ptIris = landmarks[iris];

    const fullDist = Math.abs(ptOuter.x - ptInner.x);
    if (fullDist === 0) return 0.5;

    const ratio = Math.abs(ptIris.x - ptInner.x) / fullDist;
    return ratio;
  };

  const rightEyeRatio = getRatio(33, 133, 468);
  const leftEyeRatio = getRatio(362, 263, 473);

  return { rightEyeRatio, leftEyeRatio };
};

/**
 * Decompose 4x4 transformation matrix into Euler angles (degrees).
 */
export const analyzeHeadPose = (matrix: number[] | Float32Array) => {
  if (!matrix || matrix.length !== 16) {
    return { yaw: 0, pitch: 0, roll: 0 };
  }

  const pitch = Math.atan2(matrix[6], matrix[10]);
  const yaw = Math.atan2(-matrix[2], Math.sqrt(matrix[6] * matrix[6] + matrix[10] * matrix[10]));
  const roll = Math.atan2(matrix[1], matrix[0]);

  return {
    pitch: (pitch * 180) / Math.PI,
    yaw: (yaw * 180) / Math.PI,
    roll: (roll * 180) / Math.PI,
  };
};

/**
 * Check behavioral flags (gaze avoidance + abnormal head pose).
 */
export const checkBehavioralFlags = (result: FaceLandmarkerResult) => {
  if (!result.faceLandmarks || result.faceLandmarks.length === 0) {
    return { lookingAway: false, headTurned: false, details: null };
  }

  const landmarks = result.faceLandmarks[0];
  const matrices = result.facialTransformationMatrixes;

  // 1. Check Gaze
  let lookingAway = false;
  let gazeDetails = '';
  const { rightEyeRatio, leftEyeRatio } = analyzeGaze(landmarks);

  const isRightAway = rightEyeRatio < 0.35 || rightEyeRatio > 0.65;
  const isLeftAway = leftEyeRatio < 0.35 || leftEyeRatio > 0.65;

  if (isRightAway || isLeftAway) {
    lookingAway = true;
    gazeDetails = `시선 이탈: 우(${rightEyeRatio.toFixed(2)}), 좌(${leftEyeRatio.toFixed(2)})`;
  }

  // 2. Check Head Pose
  let headTurned = false;
  let headDetails = '';

  if (matrices && matrices.length > 0) {
    const { yaw, pitch } = analyzeHeadPose(matrices[0].data);

    if (Math.abs(yaw) > 30 || Math.abs(pitch) > 20) {
      headTurned = true;
      headDetails = `좌우 회전(Yaw): ${yaw.toFixed(0)}°, 상하 기울기(Pitch): ${pitch.toFixed(0)}°`;
    }
  }

  return {
    lookingAway,
    headTurned,
    details: { gazeDetails, headDetails },
  };
};
