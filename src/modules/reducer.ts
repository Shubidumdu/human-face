import { ThunkAction } from 'redux-thunk';
import { AppState } from './type';

const initialState: AppState = {
  loading: false,
  error: null,
  data: {
    imageInfo: {
      url: '',
      size: {
        width: 0,
        height: 0,
      },
      faceCount: -1,
    },
    celebrity: {
      value: '',
      score: -1,
    },
    gender: {
      value: '',
      score: -1,
    },
    age: {
      value: '',
      score: -1,
    },
    emotion: {
      value: '',
      score: -1,
    },
  },
};

function reducer(
  state: ResultState = initialState,
  action: ResultAction,
): ResultState {
  switch (action.type) {
    case GET_RESULT:
      return {
        ...state,
        loading: true,
      };
    case GET_RESULT_SUCCESS:
      return {
        ...initialState,
        data: {
          imageInfo: {
            url: action.payload.url,
            size: {
              width: action.payload.celeb.info.size.width,
              height: action.payload.celeb.info.size.height,
            },
            faceCount: action.payload.face.info.faceCount,
          },
          celebrity: {
            value: action.payload.celeb.faces[0].celebrity.value,
            score: Math.round(
              action.payload.celeb.faces[0].celebrity.confidence * 100,
            ),
          },
          gender: {
            value: action.payload.face.faces[0].gender.value,
            score: Math.round(
              action.payload.face.faces[0].gender.confidence * 100,
            ),
          },
          age: {
            value: action.payload.face.faces[0].age.value,
            score: Math.round(
              action.payload.face.faces[0].age.confidence * 100,
            ),
          },
          emotion: {
            value: action.payload.face.faces[0].emotion.value,
            score: Math.round(
              action.payload.face.faces[0].emotion.confidence * 100,
            ),
          },
        },
      };
    case GET_RESULT_FAILURE:
      return {
        ...initialState,
        error: action.payload,
      };
    case RESET_RESULT:
      return initialState;
    default:
      return state;
  }
}

export function getResultThunk(
  formData: FormData,
  url: string,
): ThunkAction<void, RootState, null, ResultAction> {
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

export default reducer;
