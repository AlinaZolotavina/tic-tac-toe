import type { BoardState, CellValue, GameResult } from "../types/game";

export function equals3(a: CellValue, b: CellValue, c: CellValue): boolean {
  return a === b && b === c && a !== null;
}

const WINNING_LINES: ReadonlyArray<readonly [number, number, number]> = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function decideWinner(board: BoardState): GameResult {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;

    if (equals3(board[a], board[b], board[c])) {
      return {
        winner: board[a],
        winningCells: line,
        isTie: false,
      };
    }
  }

  return {
    winner: null,
    winningCells: [],
    isTie: !board.includes(null),
  };
}
