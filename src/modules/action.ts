import { ThunkAction } from 'redux-thunk';
import {
  CelebrityResult,
  FaceResult,
  fetchFaceInfo,
  fetchCelebInfo,
} from '../api/clova';
import { AppState } from './type';

const GET_RESULT = 'clova/GET_RESULT' as const;
const GET_RESULT_SUCCESS = 'clova/GET_RESULT_SUCCESS' as const;
const GET_RESULT_FAILURE = 'clova/GET_RESULT_FAILURE' as const;
const RESET_RESULT = 'clova/RESET_RESULT' as const;

type Action =
  | ReturnType<typeof getResult>
  | ReturnType<typeof getResultSuccess>
  | ReturnType<typeof getResultError>
  | ReturnType<typeof resetResult>;

export const getResult = () => ({
  type: GET_RESULT,
});

export const getResultSuccess = (
  celeb: CelebrityResult,
  face: FaceResult,
  url: string,
) => ({
  type: GET_RESULT_SUCCESS,
  payload: {
    celeb: celeb,
    face: face,
    url: url,
  },
});

export const getResultError = (error: Error) => ({
  type: GET_RESULT_FAILURE,
  payload: error,
});

export const resetResult = () => ({
  type: RESET_RESULT,
});

export function getResultThunk(
  formData: FormData,
  url: string,
): ThunkAction<void, AppState, null, Action> {
  return async dispatch => {
    dispatch(getResult());
    try {
      const celeb = await fetchCelebInfo(formData);
      const face = await fetchFaceInfo(formData);
      dispatch(getResultSuccess(celeb, face, url));
    } catch (e) {
      console.log(e);
      dispatch(getResultError(e));
    }
  };
}
