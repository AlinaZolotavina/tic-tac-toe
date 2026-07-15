import { decideWinner } from "./gameLogic";

export function findBestMove(board, ai, human, scores) {
  let bestScore = -Infinity;
  let bestCell;
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
  return bestCell;
}

export const minimax = (board, depth, humanTurn, ai, human, scores) => {
  const { winner, isTie } = decideWinner(board);

  if (winner || isTie) {
    return scores[isTie ? "tie" : winner];
  }

  if (humanTurn) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] == null) {
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
      if (board[i] == null) {
        const nextBoard = [...board];
        nextBoard[i] = human;
        const score = minimax(nextBoard, depth + 1, true, ai, human, scores);
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};
