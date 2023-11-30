/**
 * Verify the E2E input/output of Mars.
 */
import { expect, test } from "vitest";
import { moveMartians } from "../mars";

test("results", () => {
  const results = moveMartians(
    "5 3\n1 1 E \nRFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W \nLLFFFLFLFL",
  );

  expect(results).toHaveLength(3);
  expect(results[0]).toStrictEqual({
    coordinates: [1, 1],
    orientation: "E",
    isLost: false,
  });
  expect(results[1]).toStrictEqual({
    coordinates: [3, 3],
    orientation: "N",
    isLost: true,
  });
  expect(results[2]).toStrictEqual({
    coordinates: [2, 3],
    orientation: "S",
    isLost: false,
  });
});
