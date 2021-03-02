import {UPDATE_CELLS, HIDE_END_WINDOW, SHOW_END_WINDOW, RESET_BOMBS_LEFT, DECREMENT_BOMBS_LEFT, INCREMENT_BOMBS_LEFT, SET_STARTED} from './types';

export const updateCells = (cells) => ({
  type: UPDATE_CELLS,
  payload: cells
})

export const resetBombLeft = () => ({
  type: RESET_BOMBS_LEFT
})

export const decrementBombLeft = () => ({
  type: DECREMENT_BOMBS_LEFT
})

export const incrementBombLeft = () => ({
  type: INCREMENT_BOMBS_LEFT
})

export const showEndWindow = (title = '') => ({
  type: SHOW_END_WINDOW,
  payload: title
})

export const hideEndWindow = () => ({
  type: HIDE_END_WINDOW
})

export const isGameStarted = (isStarted = true) => ({
  type: SET_STARTED,
  payload: isStarted
})

export const newGame = () => dispatch => {
  dispatch(hideEndWindow());
  dispatch(resetBombLeft());
  dispatch(isGameStarted(false));
}
