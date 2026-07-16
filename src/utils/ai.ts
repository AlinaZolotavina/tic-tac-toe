import { decideWinner } from "./gameLogic";
import type { BoardState, Shape, Scores } from "../types/game";

export function findBestMove(
  board: BoardState,
  ai: Shape,
  human: Shape,
  scores: Scores,
): number {
  let bestScore = -Infinity;
  let bestCell: number | undefined;
  for (let i = 0; i < 9; i++) {
    if (board[i] == null) {
      const nextBoard = [...board];
      nextBoard[i] = ai;
      const score = minimax(nextBoard, 0, false, ai, human, scores);
      if (score > bestScore) {
        bestScore = score;
        bestCell = i;
      }
    }
  }
  if (bestCell === undefined) {
    throw new Error("No valid moves available");
  }
  return bestCell;
}

export function minimax(
  board: BoardState,
  depth: number,
  humanTurn: boolean,
  ai: Shape,
  human: Shape,
  scores: Scores,
): number {
  const { winner, isTie } = decideWinner(board);

  if (isTie) {
    return scores.tie;
  }

  if (winner) {
    return scores[winner];
  }

  if (humanTurn) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const nextBoard = [...board];
        nextBoard[i] = ai;
        const score = minimax(nextBoard, depth + 1, false, ai, human, scores);
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const nextBoard = [...board];
        nextBoard[i] = human;
        const score = minimax(nextBoard, depth + 1, true, ai, human, scores);
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}
