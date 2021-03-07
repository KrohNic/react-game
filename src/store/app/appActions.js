import {
  HIDE_END_WINDOW,
  SHOW_END_WINDOW,
  SET_RECORDS,
  LOAD_PROMPT,
  SET_VOLUME,
} from './appTypes';

export const showEndWindow = (isWin = '') => ({
  type: SHOW_END_WINDOW,
  payload: isWin,
});

export const hideEndWindow = () => ({
  type: HIDE_END_WINDOW,
});

export const setRecords = (records) => ({
  type: SET_RECORDS,
  payload: records,
});

export const showLoadPrompt = (isShow) => ({
  type: LOAD_PROMPT,
  payload: isShow,
});

export const setVolume = (volume) => ({
  type: SET_VOLUME,
  payload: volume,
});
