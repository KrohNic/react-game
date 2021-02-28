import { BOMB_RATIO } from "../constants";
import { BOMB, BTN } from "../constants/cell_types";

const fillBoard = ({width, height, bombRatio}) => {
  const cells = new Array(height)
    .fill(undefined)
    .map(() => new Array(width)
      .fill(undefined)
      .map(() => ({type: BTN, value: 0})));

  for(let h = 0; h < height; h += 1) {
    for(let w = 0; w < width; w += 1) {
      const isBomb = Math.random() < bombRatio;

      if (!isBomb) continue;
      
      cells[h][w].value = BOMB;

      if (h > 0 && cells[h - 1][w].value !== BOMB)
        cells[h - 1][w].value += 1;
      if (h < height - 1 && cells[h + 1][w].value !== BOMB)
        cells[h + 1][w].value += 1;
      if (w > 0 && cells[h][w - 1].value !== BOMB)
        cells[h][w - 1].value += 1;
      if (w < width - 1 && cells[h][w + 1].value !== BOMB)
        cells[h][w + 1].value += 1;
      
      if (h > 0 && w > 0 && cells[h - 1][w - 1].value !== BOMB)
        cells[h - 1][w - 1].value += 1;
      if (h > 0 && w < width - 1 && cells[h - 1][w + 1].value !== BOMB)
        cells[h - 1][w + 1].value += 1;
      if (h < height - 1 && w > 0 && cells[h + 1][w - 1].value !== BOMB)
        cells[h + 1][w - 1].value += 1;
      if (h < height - 1 && w < width - 1 && cells[h + 1][w + 1].value !== BOMB)
        cells[h + 1][w + 1].value += 1;
    }
  }

  return cells;
}

export const fillSmallBoard = () => {
  const WIDTH = 10;
  const HEIGHT = 8;

  return fillBoard({width: WIDTH, height: HEIGHT, bombRatio: BOMB_RATIO});
}
