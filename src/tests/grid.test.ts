/**
 * Verify functionality for creating the grid.
 */

import { expect, test } from "vitest";
import { initGrid } from "../grid";

test.each([
  [-1, 2],
  [5, -3],
  [-3, -2],
])("error if negative coordinates: %p, %p", (x, y) => {
  expect(() => initGrid(x, y)).toThrowError(
    "Negative coordinates are unsupported",
  );
});

test.each([
  [1, 51],
  [54, 4],
  [67, 99],
])("error if coordinate > 50: %p, %p", (x, y) => {
  expect(() => initGrid(x, y)).toThrowError("Exceeding maximum grid size");
});

test.each([
  [1, 1],
  [8, 5],
  [3, 4],
  [0, 2],
  [4, 0],
])("correct number of points: %p, %p", (x, y) => {
  const grid = initGrid(x, y);

  // +1 because there's always the 0,0 point
  expect(grid).toHaveLength(x + 1);
  for (const col of grid) {
    expect(col).toHaveLength(y + 1);
  }
});

test("all points unmarked", () => {
  const grid = initGrid(4, 3);

  for (let x = 0; x <= 4; x++) {
    for (let y = 0; y <= 3; y++) {
      const point = grid[x][y];
      expect(point.isMarked).toBe(false);
    }
  }
});
