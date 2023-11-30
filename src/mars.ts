/**
 * Functionality for creating Mars (grid) and its robots.
 */
import { EndPosition, moveRobot, StartPosition } from "./robots";
import { initGrid } from "./grid";

/**
 * Represents the input instructions, used to move Martians.
 */
type Input = {
  topRight: [number, number];
  instructions: Array<StartPosition>;
};

/**
 * Parses the raw input to extract the grid size, and robot instructions.
 *
 * TODO: add validation and graceful errors
 */
function parseInput(input: string): Input {
  const splitText = input.split("\n\n");

  // extract the first line of input, which is the top right coordinates
  const splitFirstLine = splitText[0].split("\n");
  const [topRightX, topRightY] = splitFirstLine.shift().split(" ");

  // reconstruct the rest of the instructions
  const inputInstructions = [splitFirstLine.join("\n"), ...splitText.slice(1)];
  const instructions: Input["instructions"] = [];

  for (let input of inputInstructions) {
    const [position, instruction] = input.split("\n");
    const [x, y, orientation] = position.split(" ");

    instructions.push({
      coordinates: [parseInt(x), parseInt(y)],
      // @ts-ignore - todo: validate value matches type
      orientation,
      // @ts-ignore - todo: validate values matches type
      instructions: Array.from(instruction),
    });
  }

  return { topRight: [parseInt(topRightX), parseInt(topRightY)], instructions };
}

/**
 * Creates Mars and processes instructions for the Martians. Returns a list
 * of end positions.
 *
 * @param input - the raw string input.
 */
export function moveMartians(input: string): Array<EndPosition> {
  const { topRight, instructions } = parseInput(input);

  const grid = initGrid(...topRight);
  const results: Array<EndPosition> = [];

  for (const instruction of instructions) {
    const end = moveRobot(grid, instruction);

    if (end.isLost) {
      // robot moved off-grid, so mark their last coordinate
      const [x, y] = end.coordinates;
      grid[x][y].isMarked = true;
    }

    results.push(end);
  }

  return results;
}
