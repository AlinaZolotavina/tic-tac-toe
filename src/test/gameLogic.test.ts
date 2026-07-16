import { describe, expect, it } from "vitest";
import { decideWinner, equals3 } from "../utils/gameLogic";
import type { BoardState } from "../types/game";

describe("gameLogic", () => {
  it("checks three equal non-empty cells", () => {
    expect(equals3("x", "x", "x")).toBe(true);
    expect(equals3("x", "o", "x")).toBe(false);
    expect(equals3(null, null, null)).toBe(false);
  });

  it("detects a horizontal winner and winning cells", () => {
    const board: BoardState = ["x", "x", "x", null, "o", null, "o", null, null];

    expect(decideWinner(board)).toEqual({
      winner: "x",
      winningCells: [0, 1, 2],
      isTie: false,
    });
  });

  it("detects a diagonal winner", () => {
    const board: BoardState = ["o", "x", "x", null, "o", "x", null, null, "o"];

    expect(decideWinner(board)).toMatchObject({
      winner: "o",
      winningCells: [0, 4, 8],
      isTie: false,
    });
  });

  it("detects a tie", () => {
    const board: BoardState = ["x", "o", "x", "x", "o", "o", "o", "x", "x"];

    expect(decideWinner(board)).toEqual({
      winner: null,
      winningCells: [],
      isTie: true,
    });
  });

  it("returns an in-progress result when no winner exists", () => {
    const board: BoardState = ["x", null, null, null, "o", null, null, null, null];

    expect(decideWinner(board)).toEqual({
      winner: null,
      winningCells: [],
      isTie: false,
    });
  });
});
