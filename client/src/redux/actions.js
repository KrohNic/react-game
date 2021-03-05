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
  SET_RECORDS,
  RESTORE_GAME,
  LOAD_PROMPT,
  SET_BOARD_SIZE,
  SET_BOMBS_PER_CELL,
  SET_VOLUME,
} from './types';
import { getBombs } from '../utils';

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

export const setDifficulty = (bombPerCell) => (dispatch, getState) => {
  const { boardSizes } = getState().game;
  const bombs = getBombs(boardSizes, bombPerCell);

  dispatch({
    type: SET_BOMBS_PER_CELL,
    payload: { bombPerCell, bombs },
  });
  dispatch(setGameStarted(false));
};

export const setBoardSize = (boardSizes) => (dispatch, getState) => {
  const { bombPerCell } = getState().game;
  const bombs = getBombs(boardSizes, bombPerCell);

  dispatch({
    type: SET_BOARD_SIZE,
    payload: { boardSizes, bombs },
  });
  dispatch(setGameStarted(false));
};

export const restoreGame = (state) => (dispatch) => {
  dispatch(hideEndWindow());
  dispatch({
    type: RESTORE_GAME,
    payload: state,
  });
  dispatch(showLoadPrompt(false));
};

export const newGame = () => (dispatch) => {
  dispatch(hideEndWindow());
  dispatch(resetBombLeft());
  dispatch(setTime(0));
  dispatch(setGameStarted(false));
};
