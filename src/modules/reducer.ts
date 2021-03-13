import { AppState } from './types';
import { Action } from './action';

const initialState: AppState = {
  loading: false,
  error: null,
  imageURL: null,
  formData: null,
  result: null,
};

function reducer(state: AppState = initialState, action: Action): AppState {
  switch (action.type) {
    case 'GET_RESULT':
      return {
        ...state,
        loading: true,
        result: null,
        error: null,
      };
    case 'GET_RESULT_SUCCESS':
      return {
        ...state,
        loading: false,
        result: action.result,
        error: null,
      };
    case 'GET_RESULT_ERROR':
      return {
        ...state,
        loading: false,
        result: null,
        error: action.error,
      };
    case 'SET_IMAGE_URL':
      return {
        ...state,
        imageURL: action.imageURL,
      };
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: action.formData,
      };
    case 'RESET_RESULT':
      return initialState;
    default:
      return state;
  }
}

export default reducer;
