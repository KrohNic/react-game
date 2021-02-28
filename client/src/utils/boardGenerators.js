import { BOMB_RATIO } from "../constants";
import { BOMB, BTN } from "../constants/cell_types";

const fillBoard = ({width, height, bombRatio}) => {
  const cells = new Array(height)
    .fill(undefined)
    .map(() => new Array(width)
      .fill(undefined)
      .map(() => ({type: BTN, value: 0})));

  for(let y = 0; y < height; y += 1) {
    for(let x = 0; x < width; x += 1) {
      const isBomb = Math.random() < bombRatio;

      cells[y][x].x = x;
      cells[y][x].y = y;

      if (!isBomb) continue;
      
      cells[y][x].value = BOMB;

      if (y > 0 && cells[y - 1][x].value !== BOMB)
        cells[y - 1][x].value += 1;
      if (y < height - 1 && cells[y + 1][x].value !== BOMB)
        cells[y + 1][x].value += 1;
      if (x > 0 && cells[y][x - 1].value !== BOMB)
        cells[y][x - 1].value += 1;
      if (x < width - 1 && cells[y][x + 1].value !== BOMB)
        cells[y][x + 1].value += 1;
      
      if (y > 0 && x > 0 && cells[y - 1][x - 1].value !== BOMB)
        cells[y - 1][x - 1].value += 1;
      if (y > 0 && x < width - 1 && cells[y - 1][x + 1].value !== BOMB)
        cells[y - 1][x + 1].value += 1;
      if (y < height - 1 && x > 0 && cells[y + 1][x - 1].value !== BOMB)
        cells[y + 1][x - 1].value += 1;
      if (y < height - 1 && x < width - 1 && cells[y + 1][x + 1].value !== BOMB)
        cells[y + 1][x + 1].value += 1;
    }
  }

  return cells;
}

export const fillSmallBoard = () => {
  const WIDTH = 10;
  const HEIGHT = 8;

  return fillBoard({width: WIDTH, height: HEIGHT, bombRatio: BOMB_RATIO});
}
