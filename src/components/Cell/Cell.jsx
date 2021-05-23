import React from 'react';
import PropTypes from 'prop-types';
import FlagIcon from '@material-ui/icons/Flag';
import { BTN, FLAG, REVEAL } from '../../constants/cellTypes';
import { CELL, CELL_BTN, CELL_FLAG, CELL_REVEAL } from './classNames';
import './cell.scss';

const CellBtn = () => <div className={CELL_BTN}></div>;

const CellFlag = () => (
  <div className={CELL_FLAG}>
    <FlagIcon />
  </div>
);

const CellReveal = ({ children }) => {
  let classNames = `${CELL_REVEAL} color-${children}`;

  return <div className={classNames}>{children || ''}</div>;
};

CellReveal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const Cell = ({ type, value, coord }) => {
  let cell;

  switch (type) {
    case BTN:
      cell = <CellBtn />;
      break;
    case FLAG:
      cell = <CellFlag />;
      break;
    case REVEAL:
      cell = <CellReveal>{value}</CellReveal>;
      break;

    default:
      break;
  }

  return (
    <div className={CELL} data-coord-x={coord.x} data-coord-y={coord.y}>
      {cell}
    </div>
  );
};

Cell.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  coord: PropTypes.object,
};

export default Cell;
