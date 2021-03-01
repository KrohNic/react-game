import {UPDATE_CELLS, HIDE_END_WINDOW, SHOW_END_WINDOW} from './types';
import {fillSmallBoard} from '../utils/boardGenerators'

export const updateCells = (cells) => ({
  type: UPDATE_CELLS,
  payload: cells
})

export const showEndWindow = (title = '') => ({
  type: SHOW_END_WINDOW,
  payload: title
})

export const hideEndWindow = () => ({
  type: HIDE_END_WINDOW
})

export const newGame = () => dispatch => {
  dispatch(hideEndWindow());
  dispatch(updateCells(fillSmallBoard()));
}
