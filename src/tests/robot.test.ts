/**
 * Verify functionality for moving robots.
 */
import { expect, test } from "vitest";
import { initGrid } from "../grid";
import { moveRobot, StartPosition, EndPosition } from "../robots";

/**
 * Shorthand for creating a StartPosition object.
 */
const start = (
  coordinates: StartPosition["coordinates"],
  orientation: StartPosition["orientation"],
  instructions: string | Array<string>,
): StartPosition => ({
  coordinates,
  orientation,
  // keeps things a bit more succinct
  instructions: Array.from(instructions) as StartPosition["instructions"],
});

/**
 * Shorthand for creating a EndPosition object.
 */
const end = (
  coordinates: EndPosition["coordinates"],
  orientation: EndPosition["orientation"],
  isLost: boolean,
): EndPosition => ({ coordinates, orientation, isLost });

test.each([
  // starting off-grid x and y
  [start([10, 10], "N", []), end([10, 10], "N", true)],
  // starting off grid x
  [start([6, 2], "N", []), end([6, 2], "N", true)],
  // starting off grid y
  [start([1, 8], "N", []), end([1, 8], "N", true)],
  // moving round a circle
  [start([1, 1], "E", "RFRFRFRF"), end([1, 1], "E", false)],
  // moving in lines
  [start([0, 0], "S", "LFLFRFFF"), end([4, 1], "E", false)],
  // moving off the grid
  [start([3, 2], "N", "FRRFLLFFRRFLL"), end([3, 3], "N", true)],
])(
  "moving around un-marked grid (start: %p, end: %p)",
  (start, expectedEnd) => {
    const grid = initGrid(5, 3);

    const end = moveRobot(grid, start);

    expect(end.coordinates).toStrictEqual(expectedEnd.coordinates);
    expect(end.orientation).toBe(expectedEnd.orientation);
    expect(end.isLost).toBe(expectedEnd.isLost);
  },
);

test.each([
  // ignoring fatal moves from marked spot
  [start([0, 3], "W", "LLFFFLFLFL"), end([2, 3], "S", false)],
  // not ignoring non-fatal moves from marked spot
  [start([4, 0], "E", "FLFF"), end([5, 2], "N", false)],
])("moving around a marked grid (start: %p, end: %p)", (start, expectedEnd) => {
  const grid = initGrid(5, 3);

  grid[5][0].isMarked = true;
  grid[3][3].isMarked = true;

  const end = moveRobot(grid, start);

  expect(end.coordinates).toStrictEqual(expectedEnd.coordinates);
  expect(end.orientation).toBe(expectedEnd.orientation);
  expect(end.isLost).toBe(expectedEnd.isLost);
});
