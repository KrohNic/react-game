import {
  SET_STARTED,
  DECREASE_BOMBS_LEFT,
  INCREASE_BOMBS_LEFT,
  RESET_BOMBS_LEFT,
  UPDATE_CELLS,
  SET_TIME,
  INCREASE_TIME,
} from './types';

const initialState = {
  cells: [],
  bombs: 10,
  bombsLeft: 0,
  started: false,
  time: 0,
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CELLS:
      return { ...state, cells: action.payload };
    case SET_STARTED:
      return { ...state, started: action.payload };
    case RESET_BOMBS_LEFT:
      return { ...state, bombsLeft: state.bombs };
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
