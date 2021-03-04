import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import Cell from '../Cell'
import {updateCells, newGame} from '../../redux/actions';
import {
  cellClickHandler, 
  markCell, 
  revealAroundCell,
  clickHandler,
  bothClickHandler,
  rightClickHandler,
  createCells
} from './controller.Board';
import { MEDIUM_WIDTH, SMALL_WIDTH } from '../../constants/boardSizes';
import correctSound from '../../assets/sound/correct.mp3'
import errorSound from '../../assets/sound/error.mp3'
import './Board.scss';

const Board = () => {
  const dispatch = useDispatch();
  const cellsData = useSelector(state => state.board.cells);
  const isGameStarted = useSelector(state => state.board.isGameStarted);
  const bombs = useSelector(state => state.board.bombs);
  const rowLength = useSelector(state => state.board.width);
  const colLength = useSelector(state => state.board.height);
  const volume = useSelector(state => state.endWindow.volume);
  const [playCorrect] = useSound(correctSound, {volume});
  const [playError] = useSound(errorSound, {volume});
  const lastY = colLength - 1;
  const lastX = rowLength - 1;

  let boardSizeClass;

  switch (rowLength) {
    case SMALL_WIDTH:
      boardSizeClass = "small_board";
      break;
    case MEDIUM_WIDTH:
      boardSizeClass = "medium_board";
      break;
  
    default:
      boardSizeClass = "large_board";
      break;
  }

  const cellClickCallback = (x, y) => cellClickHandler(
    x, y, cellsData, isGameStarted, bombs, lastY, lastX, playCorrect, dispatch
  );

  const markCallback = (x, y) => markCell(x, y, cellsData, dispatch);

  const revealAroundCallback = (x, y) => {
    revealAroundCell(
      x, y, cellsData, lastX, lastY, playCorrect, playError, dispatch
    );
  }

  const mouseUpHandler = (event) => {
    if (event.nativeEvent.which === 1 && event.buttons === 0)
      clickHandler(event, cellClickCallback);
    else if (event.nativeEvent.which === 3)
      rightClickHandler(event, markCallback);
  }

  const mouseDownHandler = (event) => {
    if (event.buttons === 3)
      bothClickHandler(event, revealAroundCallback);
  }

  const cells = cellsData.map((row, y) => row.map((cell, x) => (
    <Cell
      key={rowLength * y + x}
      type={cell.type}
      value={cell.value}
      coord={{x, y}}
    />
  )));
  
  useEffect(() => {
    if (!isGameStarted) {
      dispatch(newGame());
      dispatch(updateCells(createCells(bombs, lastY, lastX)))
    } 
  }, [dispatch, isGameStarted, bombs, lastY, lastX])

  return (
    <div
      className={`board ${boardSizeClass}`}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onContextMenu={e => e.preventDefault()}
    >
      {cells}
    </div>
  )
}

export default Board;
