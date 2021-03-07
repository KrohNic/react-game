import { combineReducers } from 'redux'
import gameReducer from './gameReducer'
import appReducer from './appReducer'

export const rootReducer = combineReducers({
  game: gameReducer,
  app: appReducer
})
