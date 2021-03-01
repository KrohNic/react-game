import {CREATE_BOARD, HIDE_END_WINDOW, SHOW_END_WINDOW} from './types';

export const createBoard = (cells) => ({
  type: CREATE_BOARD,
  payload: cells
})

export const showEndWindow = (title = '') => ({
  type: SHOW_END_WINDOW,
  payload: title
})

export const hideEndWindow = () => ({
  type: HIDE_END_WINDOW
})

