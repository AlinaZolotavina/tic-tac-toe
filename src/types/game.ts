export type Shape = "x" | "o";

export type Winner = Shape | null;

export type HoverShape = "cross" | "zero";

export type CellValue = Shape | null;

export type BoardState = CellValue[];

export interface GameResult {
  winner: Winner;
  winningCells: readonly number[];
  isTie: boolean;
}

export interface Scores {
  x: number;
  o: number;
  tie: number;
}
