import React from 'react'
import { connect } from 'react-redux';
import Cell from '../Cell'
import {createBoard} from '../../redux/actions'
import { REVEAL, BOMB, FLAG, BTN } from '../../constants/cell_types';
import './Board.scss';

const Board = ({cellsData, createBoard}) => {
  const lastY = cellsData.length - 1;
  const lastX = cellsData[0].length - 1;

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
  
  const revealCells = (x, y) => {
    const cellsDataCopy = [...cellsData];

    cellsDataCopy[y][x].type = REVEAL;

    switch (cellsData[y][x].value) {
      case 0:
        revealCellsArea(x, y, cellsDataCopy);
        break;
      case BOMB:
        console.log('you lose');
        break;
      default:
        break;
    }

    createBoard(cellsDataCopy)
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

    console.log(bombsMarked, bombsCount);

    if (bombsMarked < bombsCount) return;

    surroundingCells.forEach(cell => {
      if (cell && cell.type === BTN)
        revealCells(cell.x, cell.y);
    });

    createBoard(cells);
  }
  
  const clickHandler = (event) => {
    const cell = event.target.closest('.cell');
    
    if (!cell) return;
    
    const x = Number(cell.dataset.coordX);
    const y = Number(cell.dataset.coordY);

    if (cellsData[y][x].type !== BTN) return;
    
    revealCells(x, y);
  }

  const mouseUpHandler = (event) => {
    if (event.nativeEvent.which !== 3) return;

    const cell = event.target.closest('.cell');
    
    if (!cell) return;
    
    const x = Number(cell.dataset.coordX);
    const y = Number(cell.dataset.coordY);

    if (cellsData[y][x].type !== BTN) return;

    const cellsDataCopy = [...cellsData];

    cellsDataCopy[y][x].type = FLAG;

    createBoard(cellsDataCopy);
  }

  const mouseDownHandler = (event) => {
    if (event.buttons !== 3) return;

    const cell = event.target.closest('.cell');
    
    if (!cell) return;
    
    const x = Number(cell.dataset.coordX);
    const y = Number(cell.dataset.coordY);

    if (cellsData[y][x].type !== REVEAL) return;

    const cellsDataCopy = [...cellsData];

    revealAroundCell(x, y, cellsDataCopy, createBoard);
  }

  const rowLength = cellsData[0].length;

  const cells = cellsData.map((row, y) => row.map((cell, x) => {
    return <Cell
      key={rowLength * y + x}
      type={cell.type}
      value={cell.value}
      coord={{x, y}}
    />;
  }));

  console.log('render Board');

  return (
    <div
      className="board"
      onClick={clickHandler}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onContextMenu={e => e.preventDefault()}
    >
      {cells}
    </div>
  )
}

const mapStateToProps = state => ({cellsData: state.board.cells});

const mapDispatchToProps = {
  createBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);