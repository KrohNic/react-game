import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import Cell from '../Cell';
import { updateCells, newGame } from '../../store/game/gameActions';
import {
  cellClickHandler,
  markCell,
  revealAroundCell,
  clickHandler,
  bothClickHandler,
  rightClickHandler,
  createCells,
} from './controller.Board';
import correctSound from '../../assets/sound/correct.mp3';
import errorSound from '../../assets/sound/error.mp3';
import './Board.scss';

const Board = () => {
  const dispatch = useDispatch();
  const { isGameStarted, bombs, boardSizes, cells } = useSelector(
    (state) => state.game
  );
  const volume = useSelector((state) => state.app.volume);
  const [playCorrect] = useSound(correctSound, { volume });
  const [playError] = useSound(errorSound, { volume });
  const { width, height, className: boardSizeClass } = boardSizes;
  const lastY = height - 1;
  const lastX = width - 1;

  const cellClickCallback = (x, y) =>
    cellClickHandler(
      x,
      y,
      cells,
      isGameStarted,
      bombs,
      lastY,
      lastX,
      playCorrect,
      dispatch
    );

  const markCallback = (x, y) => markCell(x, y, cells, dispatch);

  const revealAroundCallback = (x, y) => {
    revealAroundCell(
      x,
      y,
      cells,
      lastX,
      lastY,
      playCorrect,
      playError,
      dispatch
    );
  };

  const mouseUpHandler = (event) => {
    if (event.nativeEvent.which === 1 && event.buttons === 0)
      clickHandler(event, cellClickCallback);
    else if (event.nativeEvent.which === 3)
      rightClickHandler(event, markCallback);
  };

  const mouseDownHandler = (event) => {
    if (event.buttons === 3) bothClickHandler(event, revealAroundCallback);
  };

  const cellsElements = cells.map((row, y) =>
    row.map((cell, x) => (
      <Cell
        key={width * y + x}
        type={cell.type}
        value={cell.value}
        coord={{ x, y }}
      />
    ))
  );

  useEffect(() => {
    if (!isGameStarted) {
      dispatch(newGame());
      dispatch(updateCells(createCells(bombs, lastY, lastX)));
    }
  }, [dispatch, isGameStarted, bombs, lastY, lastX]);

  return (
    <div
      className={`board ${boardSizeClass}`}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onContextMenu={(e) => e.preventDefault()}
    >
      {cellsElements}
    </div>
  );
};

export default Board;
