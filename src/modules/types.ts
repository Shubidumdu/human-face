export interface AppState {
  loading: boolean;
  error: Error | null;
  imageURL: string | null;
  formData: FormData | null;
  result: Result | null;
}

export interface Result {
  faceCount: number;
  celebrity: Score;
  gender: Score;
  age: Score;
  emotion: Score;
}

export interface Score {
  value: string;
  score: number;
}

export interface Celebrity {
  celebrity: {
    value: string;
    confidence: number;
  };
}

export interface Info {
  size: Size;
  faceCount: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Face {
  roi: Roi;
  landmark: Landmark;
  gender: Value;
  age: Value;
  emotion: Value;
  pose: Value;
}

export interface Value {
  value: string;
  confidence: number;
}

export interface Landmark {
  leftEye: Position;
  rightEye: Position;
  nose: Position;
  leftMouth: Position;
  rightMouth: Position;
}

export interface Position {
  x: number;
  y: number;
}

export interface Roi {
  x: number;
  y: number;
  width: number;
  height: number;
}
