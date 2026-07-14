import { decideWinner } from "./gameLogic";

export function handleAIMove(board, ai, human, scores) {
  let bestScore = -Infinity;
  let bestCell;
  for (let i = 0; i < 9; i++) {
    if (board[i] == null) {
      board[i] = ai;
      let score = minimax(board, 0, false, ai, human, scores);
      board[i] = null;
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
        board[i] = ai;
        let score = minimax(board, depth + 1, false, ai, human, scores);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] == null) {
        board[i] = human;
        let score = minimax(board, depth + 1, true, ai, human, scores);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};
