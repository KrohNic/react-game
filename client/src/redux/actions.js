import {CREATE_BOARD} from './types';

export const createBoard = (cells) => ({
  type: CREATE_BOARD,
  payload: cells
})