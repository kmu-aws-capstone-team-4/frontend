declare module '@mediapipe/tasks-vision' {
  export class FilesetResolver {
    static forVisionTasks(wasmPath: string): Promise<FilesetResolver>;
  }

  export interface FaceLandmarkerOptions {
    baseOptions: {
      modelAssetPath: string;
      delegate: 'GPU' | 'CPU';
    };
    runningMode: 'VIDEO' | 'IMAGE';
    numFaces: number;
    outputFaceBlendshapes?: boolean;
    outputFacialTransformationMatrixes?: boolean;
  }

  export interface NormalizedLandmark {
    x: number;
    y: number;
    z: number;
    visibility?: number;
  }

  export interface FaceLandmarkerResult {
    faceLandmarks: NormalizedLandmark[][];
    faceBlendshapes?: Array<{
      categories: Array<{ categoryName: string; score: number }>;
    }>;
    facialTransformationMatrixes?: Array<{
      data: Float32Array;
    }>;
  }

  export class FaceLandmarker {
    static createFromOptions(
      filesetResolver: FilesetResolver,
      options: FaceLandmarkerOptions
    ): Promise<FaceLandmarker>;

    detectForVideo(
      video: HTMLVideoElement,
      timestampMs: number
    ): FaceLandmarkerResult;

    close(): void;
  }
}
