import { combineReducers } from 'redux';
import appReducer from './Slices/appSlices';
import boardReducer from './Slices/boardSlice';

const rootReducer = combineReducers({
  app: appReducer,
  board: boardReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
