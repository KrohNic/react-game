import {
  SHOW_END_WINDOW,
  HIDE_END_WINDOW,
  SET_RECORDS,
  LOAD_PROMPT,
  SET_VOLUME,
} from './types';

const initialState = {
  isGameEnded: false,
  isWin: false,
  records: [],
  loadPrompt: false,
  volume: 100,
};

const endWindowReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_END_WINDOW:
      return { ...state, isGameEnded: true, isWin: action.payload };
    case HIDE_END_WINDOW:
      return { ...state, isGameEnded: false };
    case SET_RECORDS:
      return { ...state, records: action.payload };
    case LOAD_PROMPT:
      return { ...state, loadPrompt: action.payload };
    case SET_VOLUME:
      return { ...state, volume: action.payload };
    default:
      return state;
  }
};

export default endWindowReducer;
