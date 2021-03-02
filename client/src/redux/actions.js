import {
  UPDATE_CELLS,
  HIDE_END_WINDOW,
  SHOW_END_WINDOW,
  RESET_BOMBS_LEFT,
  DECREASE_BOMBS_LEFT,
  INCREASE_BOMBS_LEFT,
  SET_STARTED,
  INCREASE_TIME,
  SET_TIME,
} from './types';

export const updateCells = (cells) => ({
  type: UPDATE_CELLS,
  payload: cells,
});

export const resetBombLeft = () => ({
  type: RESET_BOMBS_LEFT,
});

export const decreaseBombLeft = () => ({
  type: DECREASE_BOMBS_LEFT,
});

export const increaseBombLeft = () => ({
  type: INCREASE_BOMBS_LEFT,
});

export const setGameStarted = (isStarted = true) => ({
  type: SET_STARTED,
  payload: isStarted,
});

export const setTime = (time) => ({
  type: SET_TIME,
  payload: time,
});

export const increaseTime = () => ({
  type: INCREASE_TIME,
});

export const showEndWindow = (title = '') => ({
  type: SHOW_END_WINDOW,
  payload: title,
});

export const hideEndWindow = () => ({
  type: HIDE_END_WINDOW,
});

export const newGame = () => (dispatch) => {
  dispatch(hideEndWindow());
  dispatch(resetBombLeft());
  dispatch(setTime(0));
  dispatch(setGameStarted(false));
};
