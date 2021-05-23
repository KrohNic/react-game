import { combineReducers } from 'redux';
import gameReducer from './game/gameReducer';
import appReducer from './app/appReducer';

export const rootReducer = combineReducers({
  game: gameReducer,
  app: appReducer
});
