/**
 * Functionality for moving robots in a grid.
 */
import { Grid } from "./grid";

/**
 * Represents movement instruction: forward, left or right.
 */
type Instruction = "F" | "L" | "R";

/**
 * Represents an orientation: north, east, south, or west.
 */
type Orientation = "N" | "E" | "S" | "W";

/**
 * Represents coordinates on a 2D grid.
 */
type Coordinates = [number, number];

/**
 * Represents a robot's starting position, including instructions for movement.
 */
export type StartPosition = {
  coordinates: Coordinates;
  orientation: Orientation;
  instructions: Array<Instruction>;
};

/**
 * Represents a robot's end position, where isLost indicates if the robot is off-grid.
 */
export type EndPosition = {
  coordinates: Coordinates;
  orientation: Orientation;
  isLost: boolean;
};

/**
 * True if the given coordinates are not on the grid.
 */
function isOffGrid(grid: Grid, [x, y]: Coordinates): boolean {
  return grid[x]?.[y] === undefined;
}

/**
 * Returns the new coordinates after moving forward from the given coordinates/orientation.
 */
function moveForward(
  [x, y]: Coordinates,
  orientation: Orientation,
): Coordinates {
  switch (orientation) {
    case "N":
      return [x, y + 1];
    case "E":
      return [x + 1, y];
    case "S":
      return [x, y - 1];
    case "W":
      return [x - 1, y];
  }
}

/**
 * Returns the new orientation after moving left from the given one.
 */
function moveLeft(orientation: Orientation): Orientation {
  switch (orientation) {
    case "N":
      return "W";
    case "E":
      return "N";
    case "S":
      return "E";
    case "W":
      return "S";
  }
}

/**
 * Returns the new orientation after moving right from the given one.
 */
function moveRight(orientation: Orientation): Orientation {
  switch (orientation) {
    case "N":
      return "E";
    case "E":
      return "S";
    case "S":
      return "W";
    case "W":
      return "N";
  }
}

/**
 * Returns the robot's end position, after moving according to the start positions.
 */
export function moveRobot(grid: Grid, start: StartPosition): EndPosition {
  if (isOffGrid(grid, start.coordinates)) {
    // robot has started off the grid, so immediately lost
    return { ...start, isLost: true };
  }

  let coordinates = start.coordinates;
  let orientation = start.orientation;

  for (const instruction of start.instructions) {
    switch (instruction) {
      case "F":
        const point = grid[coordinates[0]][coordinates[1]];
        const newCoordinates = moveForward(coordinates, orientation);

        if (isOffGrid(grid, newCoordinates)) {
          // if the point is un-marked then stop here, otherwise ignore
          if (!point.isMarked) {
            return { coordinates, orientation, isLost: true };
          }
        } else {
          // coordinates updated, orientation unchanged
          coordinates = newCoordinates;
        }
        break;
      case "L":
        // coordinates unchanged, orientation updated
        orientation = moveLeft(orientation);
        break;
      case "R":
        // coordinates unchanged, orientation updated
        orientation = moveRight(orientation);
        break;
    }
  }

  return { coordinates, orientation, isLost: false };
}
