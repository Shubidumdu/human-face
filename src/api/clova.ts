import axios from 'axios';
import { Celebrity, Face, Info } from '../modules/types';

export interface CelebrityResult {
  info: Info;
  faces: Array<Celebrity>;
}

export interface FaceResult {
  info: Info;
  faces: Array<Face>;
}

export async function fetchCelebInfo(
  formdata: FormData,
): Promise<CelebrityResult> {
  const url = `/api/celeb`;
  try {
    const response = await axios.post(url, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function fetchFaceInfo(formdata: FormData): Promise<FaceResult> {
  const url = `/api/face`;
  try {
    const response = await axios.post(url, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}
