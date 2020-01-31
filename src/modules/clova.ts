import { ClovaCeleb, ClovaFace } from '../api/clova';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './index';
import { clovaFace } from '../api/clova';

const GET_RESULT = 'clova/GET_RESULT' as const;
const GET_RESULT_SUCCESS = 'clova/GET_RESULT_SUCCESS' as const;
const GET_RESULT_FAILURE = 'clova/GET_RESULT_FAILURE' as const;
const RESET_RESULT = 'clova/RESET_RESULT' as const;

export const getResult = () => ({
    type: GET_RESULT,
});

export const getResultSuccess = (celeb: ClovaCeleb, face: ClovaFace, url: string) => ({
    type: GET_RESULT_SUCCESS,
    payload: {
        celeb: celeb,
        face: face,
        url: url
    }
});

export const getResultError = (error: Error) => ({
    type: GET_RESULT_FAILURE,
    payload: error
});

export const resetResult = () => ({
    type: RESET_RESULT
});

type ResultAction =
| ReturnType<typeof getResult>
| ReturnType<typeof getResultSuccess>
| ReturnType<typeof getResultError>
| ReturnType<typeof resetResult>

type valueScore = {
    value: string;
    score: number;
}

export type ClovaResult = {
    imageInfo: {
        url: string;
        size: {
            width: number;
            height: number;
        }
        faceCount: number;
    };
    celebrity: valueScore[];
    gender: valueScore;
    age: valueScore;
    emotion: valueScore;
}

type ResultState = {
    loading: boolean;
    error: Error | null;
    data: ClovaResult;
};

const initialState: ResultState = {
    loading: false,
    error: null,
    data: {
        imageInfo: {
            url: '',
            size: {
                width: 0,
                height: 0
            },
            faceCount: -1
        },
        celebrity: [],
        gender: {
            value: '',
            score: -1
        },
        age: {
            value: '',
            score: -1
        },
        emotion: {
            value: '',
            score: -1
        }
    }
};

function clova(
    state: ResultState = initialState,
    action: ResultAction,
    ): ResultState {
        switch (action.type) {
            case GET_RESULT:
                return { 
                    ...initialState,
                    loading: true
                }
            case GET_RESULT_SUCCESS:
                return {
                    ...initialState,
                    data: {
                        imageInfo: {
                            url: action.payload.url,
                            size: {
                                width: action.payload.celeb.info.size.width,
                                height: action.payload.celeb.info.size.height
                            },
                            faceCount: action.payload.face.info.faceCount,
                        },
                        celebrity: action.payload.celeb.faces.map(
                            face => {
                                return {
                                value: face.celebrity.value,
                                score: Math.round(face.celebrity.confidence * 100)
                        }}),
                        gender: {
                            value: action.payload.face.faces[0].gender.value,
                            score: Math.round(action.payload.face.faces[0].gender.confidence * 100)
                        },
                        age: {
                            value: action.payload.face.faces[0].age.value,
                            score: Math.round(action.payload.face.faces[0].age.confidence * 100)
                        },
                        emotion: {
                            value: action.payload.face.faces[0].emotion.value,
                            score: Math.round(action.payload.face.faces[0].emotion.confidence * 100)
                        }
                    }
                }
            case GET_RESULT_FAILURE:
                return {
                    ...initialState,
                    error: action.payload
                }
            case RESET_RESULT:
                return initialState
            default:
                return state;
        }
    }

export function getResultThunk(formData: FormData, url: string)
: ThunkAction<void, RootState, null, ResultAction> {
    return async dispatch => {
      dispatch(getResult());
      try {
        const celeb = await clovaFace('celeb', formData);
        const face = await clovaFace('face', formData);
        dispatch(getResultSuccess(celeb, face, url));
      } catch (e) {
        console.log(e);
        dispatch(getResultError(e));
      }
    };
  }

export default clova;