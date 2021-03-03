import { SMALL_HEIGHT, SMALL_WIDTH } from '../constants/boardSizes';
import {
  SET_STARTED,
  DECREASE_BOMBS_LEFT,
  INCREASE_BOMBS_LEFT,
  RESET_BOMBS_LEFT,
  UPDATE_CELLS,
  SET_TIME,
  INCREASE_TIME,
  RESTORE_GAME,
  SET_BOARD_SIZE,
} from './types';

const initialState = {
  width: SMALL_WIDTH,
  height: SMALL_HEIGHT,
  cells: [],
  bombs: 10,
  bombsLeft: 0,
  isGameStarted: false,
  time: 0,
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARD_SIZE:
      return { ...state, ...action.payload };
    case UPDATE_CELLS:
      return { ...state, cells: action.payload };
    case SET_STARTED:
      return { ...state, isGameStarted: action.payload };
    case RESET_BOMBS_LEFT:
      return { ...state, bombsLeft: state.bombs };
    case RESTORE_GAME:
      return { ...state, ...action.payload, isGameStarted: true };
    case DECREASE_BOMBS_LEFT:
      return { ...state, bombsLeft: state.bombsLeft - 1 };
    case INCREASE_BOMBS_LEFT:
      return { ...state, bombsLeft: state.bombsLeft + 1 };
    case SET_TIME:
      return { ...state, time: action.payload };
    case INCREASE_TIME:
      return { ...state, time: state.time + 1 };
    default:
      return state;
  }
};

export default boardReducer;
