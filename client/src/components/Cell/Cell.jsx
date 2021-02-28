import React from 'react';
import {BTN, FLAG, REVEAL} from '../../constants/cell_types'
import './cell.scss';
import CellBtn from './CellBtn/CellBtn';

const Cell = ({type, value, coord}) => {
  let cell;
  
  switch (type) {
    case BTN:
      cell = <CellBtn /> 
      break;
    case FLAG:
      break;
    case REVEAL:
      cell = <div className="cell-reveal">
        {value || ''}
      </div>
      break;
  
    default:
      break;
  }

  return (
    <div className="cell" data-coord-x={coord.x} data-coord-y={coord.y}>
      {cell}
    </div>
  )
}

export default Cell;