import { describe, expect, it } from "vitest";
import { findBestMove, minimax } from "../utils/ai";
import type { BoardState, Scores } from "../types/game";

const scores: Scores = {
  x: -10,
  o: 10,
  tie: 0,
};

describe("ai", () => {
  it("chooses a winning move when one is available", () => {
    const board: BoardState = ["o", "o", null, "x", "x", null, null, null, null];

    expect(findBestMove(board, "o", "x", scores)).toBe(2);
  });

  it("blocks the human player's immediate win", () => {
    const board: BoardState = ["x", "x", null, "o", null, null, null, null, null];

    expect(findBestMove(board, "o", "x", scores)).toBe(2);
  });

  it("does not mutate the board while evaluating moves", () => {
    const board: BoardState = ["x", null, null, null, "o", null, null, null, null];
    const snapshot = [...board];

    findBestMove(board, "o", "x", scores);

    expect(board).toEqual(snapshot);
  });

  it("scores terminal states", () => {
    expect(
      minimax(["o", "o", "o", "x", "x", null, null, null, null], 0, false, "o", "x", scores),
    ).toBe(10);
    expect(
      minimax(["x", "o", "x", "x", "o", "o", "o", "x", "x"], 0, false, "o", "x", scores),
    ).toBe(0);
  });

  it("throws when no valid moves are available", () => {
    const board: BoardState = ["x", "o", "x", "x", "o", "o", "o", "x", "x"];

    expect(() => findBestMove(board, "o", "x", scores)).toThrow(
      "No valid moves available",
    );
  });
});
