import { SHOW_END_WINDOW, HIDE_END_WINDOW, SET_RECORDS } from './types';

const initialState = {
  isGameEnded: false,
  isWin: false,
  records: [],
};

const endWindowReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_END_WINDOW:
      return { ...state, isGameEnded: true, isWin: action.payload };
    case HIDE_END_WINDOW:
      return { ...state, isGameEnded: false };
    case SET_RECORDS:
      return { ...state, records: action.payload };
    default:
      return state;
  }
};

export default endWindowReducer;
