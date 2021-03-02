import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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
import './Board.scss';

const Board = () => {
  const dispatch = useDispatch();
  const cellsData = useSelector(state => state.board.cells);
  const started = useSelector(state => state.board.started);
  const bombs = useSelector(state => state.board.bombs);
  const rowLength = 10;
  const colLength = 8;
  const lastY = colLength - 1;
  const lastX = rowLength - 1;

  const cellClickCallback = (x, y) => cellClickHandler(
    x, y, cellsData, started, bombs, lastY, lastX, dispatch
  );

  const markCallback = (x, y) => markCell(x, y, cellsData, dispatch);

  const revealAroundCallback = (x, y) => {
    revealAroundCell(x, y, cellsData, lastX, lastY, dispatch);
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
    if (!started) {
      dispatch(newGame());
      dispatch(updateCells(createCells(bombs, lastY, lastX)))
    } 
  }, [dispatch, started, bombs, lastY, lastX])

  console.log('render board');

  return (
    <div
      className="board"
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onContextMenu={e => e.preventDefault()}
    >
      {cells}
    </div>
  )
}

export default Board;
