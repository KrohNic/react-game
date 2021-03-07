import {
  UPDATE_CELLS,
  RESET_BOMBS_LEFT,
  DECREASE_BOMBS_LEFT,
  INCREASE_BOMBS_LEFT,
  SET_STARTED,
  INCREASE_TIME,
  SET_TIME,
  RESTORE_GAME,
  SET_BOARD_SIZE,
  SET_BOMBS_PER_CELL,
} from './gameTypes';
import { hideEndWindow, showLoadPrompt } from '../app/appActions';
import { getBombs } from '../../utils';

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
