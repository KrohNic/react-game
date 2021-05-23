export const getBombs = ({ width, height }, bombPerCell) => {
  return Math.floor(width * height * bombPerCell)
}
