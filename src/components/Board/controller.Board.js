import { REVEAL, BOMB, FLAG, BTN } from '../../constants/cellTypes';
import {
  updateCells,
  showEndWindow,
  decreaseBombLeft,
  increaseBombLeft,
  setGameStarted,
} from '../../redux/actions';

const getCoordCellsAround = (x, y, lastX, lastY) => {
  const top = y > 0 && { y: y - 1, x: x };
  const bottom = y < lastY && { y: y + 1, x: x };
  const left = x > 0 && { y: y, x: x - 1 };
  const right = x < lastX && { y: y, x: x + 1 };
  const topLeft = y > 0 && x > 0 && { y: y - 1, x: x - 1 };
  const topRight = y > 0 && x < lastX && { y: y - 1, x: x + 1 };
  const bottomLeft = y < lastY && x > 0 && { y: y + 1, x: x - 1 };
  const bottomRight = y < lastY && x < lastX && { y: y + 1, x: x + 1 };

  const cellsAround = [
    top,
    bottom,
    left,
    right,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  ];

  return cellsAround.filter((obj) => obj);
};

export const createCells = (bombs, lastY, lastX) => {
  const cells = new Array(lastY + 1)
    .fill(undefined)
    .map(() =>
      new Array(lastX + 1).fill(undefined).map(() => ({ type: BTN, value: 0 }))
    );

  let unplacedBombs = bombs;

  while (unplacedBombs) {
    const bombX = Math.floor(Math.random() * lastX);
    const bombY = Math.floor(Math.random() * lastY);

    if (cells[bombY][bombX].value === BOMB) continue;

    cells[bombY][bombX].value = BOMB;
    unplacedBombs -= 1;

    const cellsAround = getCoordCellsAround(bombX, bombY, lastX, lastY);

    cellsAround.forEach(({ x, y }) => {
      if (cells[y][x].value !== BOMB) cells[y][x].value += 1;
    });
  }

  return cells;
};

const revealCellsArea = (startX, startY, cells, lastX, lastY) => {
  const queue = [{ x: startX, y: startY }];

  while (queue.length) {
    const { x, y } = queue.pop();
    const current = cells[y][x];

    current.type = REVEAL;

    if (current.value !== 0) continue;

    const cellsAround = getCoordCellsAround(x, y, lastX, lastY);

    cellsAround.forEach((coord) => {
      if (
        cells[coord.y][coord.x].type !== REVEAL &&
        cells[coord.y][coord.x].value !== BOMB
      ) {
        queue.push(coord);
      }
    });
  }
};

const checkGameWin = (cells, dispatch) => {
  const isGameEnded = cells.every((row) =>
    row.every((cell) => {
      if (cell.value !== BOMB && cell.type !== REVEAL) return false;

      return true;
    })
  );

  if (isGameEnded) dispatch(showEndWindow(true));
};

const revealCell = (x, y, cells, lastX, lastY, playCorrect, dispatch) => {
  playCorrect();
  cells[y][x].type = REVEAL;

  switch (cells[y][x].value) {
    case 0:
      revealCellsArea(x, y, cells, lastX, lastY);
      break;
    case BOMB:
      dispatch(updateCells(cells));
      dispatch(showEndWindow(false));
      return;
    default:
      break;
  }

  checkGameWin(cells, dispatch);
};

export const revealAroundCell = (
  x,
  y,
  cells,
  lastX,
  lastY,
  playCorrect,
  playError,
  dispatch
) => {
  if (cells[y][x].type !== REVEAL) return;

  const cellsCopy = [...cells];
  const bombsAround = cellsCopy[y][x].value;
  const surroundingCells = getCoordCellsAround(x, y, lastX, lastY);

  const bombsMarked = surroundingCells.reduce((marks, coord) => {
    if (cellsCopy[coord.y][coord.x].type === FLAG) return marks + 1;

    return marks;
  }, 0);

  if (bombsMarked !== bombsAround) return playError();

  surroundingCells.forEach((coord) => {
    if (cellsCopy[coord.y][coord.x].type === BTN)
      revealCell(
        coord.x,
        coord.y,
        cellsCopy,
        lastX,
        lastY,
        playCorrect,
        dispatch
      );
  });

  dispatch(updateCells(cellsCopy));
};

const hitAreaByFirstClick = (x, y, cells, bombs, lastY, lastX) => {
  let cellsCopy = cells;

  while (cellsCopy[y][x].value !== 0) {
    cellsCopy = createCells(bombs, lastY, lastX);
  }

  return cellsCopy;
};

const firstClickHandler = (x, y, cells, bombs, lastY, lastX, dispatch) => {
  dispatch(setGameStarted(true));
  return hitAreaByFirstClick(x, y, cells, bombs, lastY, lastX);
};

const runCbIfCell = (element, callback) => {
  const cell = element.closest('.cell');

  if (!cell) return;

  const x = Number(cell.dataset.coordX);
  const y = Number(cell.dataset.coordY);

  callback(x, y);
};

export const clickHandler = (event, callback) =>
  runCbIfCell(event.target, callback);
export const bothClickHandler = clickHandler;
export const rightClickHandler = clickHandler;

export const cellClickHandler = (
  x,
  y,
  cellsData,
  isGameStarted,
  bombs,
  lastY,
  lastX,
  playCorrect,
  dispatch
) => {
  if (cellsData[y][x].type !== BTN) return;

  let cellsDataCopy = [...cellsData];

  if (!isGameStarted) {
    cellsDataCopy = firstClickHandler(
      x,
      y,
      cellsDataCopy,
      bombs,
      lastY,
      lastX,
      dispatch
    );
  }

  revealCell(x, y, cellsDataCopy, lastX, lastY, playCorrect, dispatch);
  dispatch(updateCells(cellsDataCopy));
};

export const markCell = (x, y, cellsData, dispatch) => {
  const cellType = cellsData[y][x].type;

  if (cellType !== BTN && cellType !== FLAG) return;

  const cellsDataCopy = [...cellsData];

  if (cellType === BTN) {
    cellsDataCopy[y][x].type = FLAG;
    dispatch(decreaseBombLeft());
  } else {
    cellsDataCopy[y][x].type = BTN;
    dispatch(increaseBombLeft());
  }

  dispatch(updateCells(cellsDataCopy));
};
