import { ThunkAction } from 'redux-thunk';
import { fetchCelebInfo, fetchFaceInfo } from '../api/clova';
import { AppState, Result } from './types';

export type Action =
  | ReturnType<typeof getResult>
  | ReturnType<typeof getResultSuccess>
  | ReturnType<typeof getResultError>
  | ReturnType<typeof setImageURL>
  | ReturnType<typeof setFormData>
  | ReturnType<typeof resetResult>;

const GET_RESULT = 'GET_RESULT' as const;
const GET_RESULT_SUCCESS = 'GET_RESULT_SUCCESS' as const;
const GET_RESULT_ERROR = 'GET_RESULT_ERROR' as const;
const SET_IMAGE_URL = 'SET_IMAGE_URL' as const;
const SET_FORM_DATA = 'SET_FORM_DATA' as const;
const RESET_RESULT = 'RESET_RESULT' as const;

export const getResult = () => ({
  type: GET_RESULT,
});

export const getResultSuccess = (result: Result) => ({
  type: GET_RESULT_SUCCESS,
  result,
});

export const getResultError = (error: Error) => ({
  type: GET_RESULT_ERROR,
  error,
});

export const setImageURL = (imageURL: string) => ({
  type: SET_IMAGE_URL,
  imageURL,
});

export const setFormData = (formData: FormData) => ({
  type: SET_FORM_DATA,
  formData,
});

export const resetResult = () => ({
  type: RESET_RESULT,
});

export function getResultThunk(
  formData: FormData,
): ThunkAction<void, AppState, null, Action> {
  return async dispatch => {
    try {
      dispatch(getResult());
      const celebResult = await fetchCelebInfo(formData);
      const faceResult = await fetchFaceInfo(formData);
      const result: Result = {
        faceCount: faceResult.info.faceCount,
        celebrity: {
          value: celebResult.faces[0].celebrity.value,
          score: Math.round(celebResult.faces[0].celebrity.confidence * 100),
        },
        gender: {
          value: faceResult.faces[0].gender.value,
          score: Math.round(faceResult.faces[0].gender.confidence * 100),
        },
        age: {
          value: faceResult.faces[0].age.value,
          score: Math.round(faceResult.faces[0].age.confidence * 100),
        },
        emotion: {
          value: faceResult.faces[0].emotion.value,
          score: Math.round(faceResult.faces[0].emotion.confidence * 100),
        },
      };
      dispatch(getResultSuccess(result));
    } catch (err) {
      dispatch(getResultError(err));
    }
  };
}
