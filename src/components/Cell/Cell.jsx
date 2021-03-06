import React from 'react';
import FlagIcon from '@material-ui/icons/Flag';
import {BTN, FLAG, REVEAL} from '../../constants/cellTypes';
import { CELL, CELL_BTN, CELL_FLAG, CELL_REVEAL } from './classNames';
import './cell.scss';

const CellBtn = ({value}) => (
  <div className={CELL_BTN}>
    {value}
  </div>
)

const CellFlag = () => <div className={CELL_FLAG}>
  <FlagIcon />
</div>

const CellNumber = ({children}) => {
  let classNames = `${CELL_REVEAL} color-${children}`;

  return (
    <div className={classNames}>
      {children || ''}
    </div>
  )
}

const Cell = ({type, value, coord}) => {
  let cell;
  
  switch (type) {
    case BTN:
      cell = <CellBtn /> 
      break;
    case FLAG:
      cell = <CellFlag />
      break;
    case REVEAL:
      cell = <CellNumber>{value}</CellNumber>
      break;
  
    default:
      break;
  }

  return (
    <div className={CELL} data-coord-x={coord.x} data-coord-y={coord.y}>
      {cell}
    </div>
  )
}

export default Cell;