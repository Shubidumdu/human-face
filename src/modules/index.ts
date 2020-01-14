import clova from './clova';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ clova });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;