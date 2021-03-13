export type AppState = {
  loading: boolean;
  error?: Error | null;
  modalOpen: boolean;
  imageURL: string;
  formData: FormData;
  result: Result;
};

export interface Result {
  imageInfo: {
    url: string;
    size: {
      width: number;
      height: number;
    };
    faceCount: number;
  };
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
