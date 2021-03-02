import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Cell from '../Cell'
import {updateCells, showEndWindow, decrementBombLeft, incrementBombLeft, newGame, isGameStarted } from '../../redux/actions'
import { REVEAL, BOMB, FLAG, BTN } from '../../constants/cell_types';
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

  const createCells = (bombs, lastY, lastX) => {
    const cells = new Array(colLength)
      .fill(undefined)
      .map(() => new Array(rowLength)
        .fill(undefined)
        .map(() => ({type: BTN, value: 0})));

    let unplacedBombs = bombs;

    while (unplacedBombs) {
      const x = Math.floor(Math.random() * lastX);
      const y = Math.floor(Math.random() * lastY);

      if (cells[y][x].value === BOMB) continue;
      
      cells[y][x].value = BOMB;
      unplacedBombs -= 1;

      if (y > 0 && cells[y - 1][x].value !== BOMB)
        cells[y - 1][x].value += 1;
      if (y < colLength - 1 && cells[y + 1][x].value !== BOMB)
        cells[y + 1][x].value += 1;
      if (x > 0 && cells[y][x - 1].value !== BOMB)
        cells[y][x - 1].value += 1;
      if (x < rowLength - 1 && cells[y][x + 1].value !== BOMB)
        cells[y][x + 1].value += 1;
      
      if (y > 0 && x > 0 && cells[y - 1][x - 1].value !== BOMB)
        cells[y - 1][x - 1].value += 1;
      if (y > 0 && x < rowLength - 1 && cells[y - 1][x + 1].value !== BOMB)
        cells[y - 1][x + 1].value += 1;
      if (y < colLength - 1 && x > 0 && cells[y + 1][x - 1].value !== BOMB)
        cells[y + 1][x - 1].value += 1;
      if (
        y < colLength - 1 && 
        x < rowLength - 1 && 
        cells[y + 1][x + 1].value !== BOMB
      )
        cells[y + 1][x + 1].value += 1;
    }

    return cells;
  }

  const revealCellsArea = (startX, startY, cells) => {
    const queue = [{x: startX, y: startY}];
  
    while(queue.length) {
      const {x, y} = queue.pop();
      const current = cells[y][x];
  
      current.type = REVEAL;
  
      if (current.value !== 0) continue;
  
      const top = y > 0 && cells[y - 1][x];
      const bottom = y < lastY && cells[y + 1][x];
      const left = x > 0 && cells[y][x - 1];
      const right = x < lastX && cells[y][x + 1];
      const topLeft = y > 0 && x > 0 && cells[y - 1][x - 1];
      const topRight = y > 0 && x < lastX && cells[y - 1][x + 1];
      const bottomLeft = y < lastY && x > 0 && cells[y + 1][x - 1];
      const bottomRight = y < lastY && x < lastX && cells[y + 1][x + 1];
  
      if (top && top.type !== REVEAL && top.value !== BOMB)
        queue.push({x, y: y - 1});
      if (bottom && bottom.type !== REVEAL && bottom.value !== BOMB)
        queue.push({x, y: y + 1});
      if (left && left.type !== REVEAL && left.value !== BOMB)
        queue.push({x: x - 1, y});
      if (right && right.type !== REVEAL && right.value !== BOMB)
        queue.push({x: x + 1, y});
      if (topLeft && topLeft.type !== REVEAL && topLeft.value !== BOMB)
        queue.push({x: x - 1, y: y - 1});
      if (topRight && topRight.type !== REVEAL && topRight.value !== BOMB)
        queue.push({x: x + 1, y: y - 1});
      if (bottomLeft && bottomLeft.type !== REVEAL && bottomLeft.value !== BOMB)
        queue.push({x: x - 1, y: y + 1});
      if (bottomRight && bottomRight.type !== REVEAL && bottomRight.value !== BOMB)
        queue.push({x: x + 1, y: y + 1});
    }
  }
  
  const checkGameWin = (cells) => {
    const isGameEnd = cells.every(row => row.every(cell => {
      if (cell.value !== BOMB && cell.type !== REVEAL)
        return false;

      return true;
      })
    )

    if (isGameEnd) dispatch(showEndWindow('You win!'));
  }

  const hitAreaByFirstClick = (x, y, cells) => {
    let cellsCopy = cells;

    while (cellsCopy[y][x].value !== 0) {
      console.log('cell.value ===', cellsCopy[y][x].value);

      cellsCopy = createCells(bombs, lastY, lastX);
    }

    return cellsCopy;
  }

  const firstClickHandler = (x, y, cells) => {
    dispatch(isGameStarted(true));
    return hitAreaByFirstClick(x, y, cells);
  }

  const revealCells = (x, y, cellsDataCopy) => {
    cellsDataCopy[y][x].type = REVEAL;

    switch (cellsDataCopy[y][x].value) {
      case 0:
        revealCellsArea(x, y, cellsDataCopy);
        break;
      case BOMB:
        dispatch(updateCells(cellsDataCopy));
        dispatch(showEndWindow('you lose'));
        return;
      default:
        break;
    }

    checkGameWin(cellsDataCopy);
  }

  const revealAroundCell = (x, y, cells) => {
    const bombsCount = cells[y][x].value;
    const top = y > 0 && cells[y - 1][x];
    const bottom = y < lastY && cells[y + 1][x];
    const left = x > 0 && cells[y][x - 1];
    const right = x < lastX && cells[y][x + 1];
    const topLeft = y > 0 && x > 0 && cells[y - 1][x - 1];
    const topRight = y > 0 && x < lastX && cells[y - 1][x + 1];
    const bottomLeft = y < lastY && x > 0 && cells[y + 1][x - 1];
    const bottomRight = y < lastY && x < lastX && cells[y + 1][x + 1];
    const surroundingCells = [
      top, bottom, left, right, topLeft, topRight, bottomLeft, bottomRight
    ];

    const bombsMarked = surroundingCells.reduce((flags, cell) => {
      if (cell && cell.type === FLAG)
        return flags + 1;
      
      return flags;
    }, 0);

    if (bombsMarked !== bombsCount) return;

    surroundingCells.forEach(cell => {
      if (cell && cell.type === BTN)
        revealCells(cell.x, cell.y, cells);
    });

    dispatch(updateCells(cells));
  }
  
  const clickHandler = (event) => {
    const cell = event.target.closest('.cell');
    
    if (!cell) return;
    
    const x = Number(cell.dataset.coordX);
    const y = Number(cell.dataset.coordY);

    if (cellsData[y][x].type !== BTN) return;
    
    let cellsDataCopy = [...cellsData];

    if (!started) {
      cellsDataCopy = firstClickHandler(x, y, cells);
    }

    revealCells(x, y, cellsDataCopy);
    dispatch(updateCells(cellsDataCopy));
  }

  const mouseUpHandler = (event) => {
    if (event.nativeEvent.which === 1 && event.buttons === 0)
      return clickHandler(event);

    if (event.nativeEvent.which !== 3) return;

    const cell = event.target.closest('.cell');
    
    if (!cell) return;
    
    const x = Number(cell.dataset.coordX);
    const y = Number(cell.dataset.coordY);
    const cellType = cellsData[y][x].type;

    if (cellType !== BTN && cellType !== FLAG) return;
    
    const cellsDataCopy = [...cellsData];

    if (cellType === BTN) {
      cellsDataCopy[y][x].type = FLAG;
      dispatch(decrementBombLeft());
    } else {
      cellsDataCopy[y][x].type = BTN;
      dispatch(incrementBombLeft());
    }

    dispatch(updateCells(cellsDataCopy));
  }

  const mouseDownHandler = (event) => {
    if (event.buttons !== 3) return;

    const cell = event.target.closest('.cell');
    
    if (!cell) return;
    
    const x = Number(cell.dataset.coordX);
    const y = Number(cell.dataset.coordY);

    if (cellsData[y][x].type !== REVEAL) return;

    const cellsDataCopy = [...cellsData];

    revealAroundCell(x, y, cellsDataCopy);
  }

  const cells = cellsData.map((row, y) => row.map((cell, x) => {
    return <Cell
      key={rowLength * y + x}
      type={cell.type}
      value={cell.value}
      coord={{x, y}}
    />;
  }));
  
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
