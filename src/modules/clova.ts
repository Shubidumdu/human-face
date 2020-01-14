import { ClovaCeleb, ClovaFace } from '../api/clova';

const GET_RESULT = 'clova/GET_RESULT' as const;
const RESET_RESULT = 'clova/RESET_RESULT' as const;

export const getResult = (celeb: ClovaCeleb, face: ClovaFace) => ({
    type: GET_RESULT,
    payload: {
        celeb: celeb,
        face: face
    }
});

export const resetResult = () => ({
    type: RESET_RESULT
});

type ResultAction =
| ReturnType<typeof getResult>
| ReturnType<typeof resetResult>

type ResultState = {
    celeb: ClovaCeleb | null,
    face: ClovaFace  | null
};

const initialState: ResultState = {
    celeb: null,
    face: null
};

function clova(
    state: ResultState = initialState,
    action: ResultAction
    ): ResultState {
    switch (action.type) {
        case GET_RESULT:
            return { 
                celeb: action.payload.celeb,
                face: action.payload.face
            }
        case RESET_RESULT:
            return {
                celeb: null,
                face: null
            }
        default:
            return state;
    }
}

export default clova;