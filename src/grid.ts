/**
 * Functionality for creating the 2D grid of points.
 */

const GRID_MAX_SIZE = 50;
const GRID_MIN_SIZE = 0;

/**
 * Represents a point on a grid, which may be marked by the scent of a robot.
 */
type Point = {
  isMarked: boolean;
};

/**
 * Represents a 2D Grid of points.
 */
type Grid = Array<Array<Point>>;

/**
 * Creates an unmarked Grid sized by the given x,y coordinates.
 */
export function initGrid(topRightX: number, topRightY: number): Grid {
  if (topRightX < GRID_MIN_SIZE || topRightY < GRID_MIN_SIZE) {
    throw new Error("Negative coordinates are unsupported");
  } else if (topRightX > GRID_MAX_SIZE || topRightY > GRID_MAX_SIZE) {
    throw new Error("Exceeding maximum grid size");
  }

  const grid: Grid = [];

  for (let x = 0; x <= topRightX; x++) {
    const column: Array<Point> = [];
    for (let y = 0; y <= topRightY; y++) {
      column.push({ isMarked: false });
    }

    grid.push(column);
  }

  return grid;
}
