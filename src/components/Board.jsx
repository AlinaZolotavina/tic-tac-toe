import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Cell from "./Cell";
import Player from "./Player";
import GameStatus from "./GameStatus";

import { decideWinner } from "../utils/gameLogic";
import { handleAiMove } from "../utils/ai";

import { GAME_STATUS } from "../utils/constants";

function Board({ aiMode, ai, human, winnerSetter }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [humanTurn, setHumanTurn] = useState(true);
  const [isFirstPlayerActive, setFirstPlayerActive] = useState(true);
  const [isSecondPlayerActive, setSecondPlayerActive] = useState(false);
  const aiTimeoutRef = useRef(null);
  const { winner, winningCells, isTie } = decideWinner(board);
  let status;

  useEffect(() => {
    if (humanTurn) {
      setFirstPlayerActive(true);
      setSecondPlayerActive(false);
    } else {
      setFirstPlayerActive(false);
      setSecondPlayerActive(true);
    }
  }, [humanTurn]);

  useEffect(() => {
    return () => {
      if (aiTimeoutRef.current) {
        clearTimeout(aiTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!aiMode || humanTurn || winner) {
      return;
    }

    aiTimeoutRef.current = setTimeout(() => {
      setBoard((currentBoard) => {
        const bestMove = handleAiMove(currentBoard, ai, human, scores);

        const newBoard = [...currentBoard];
        newBoard[bestMove] = ai;

        return newBoard;
      });
      setHumanTurn(true);
      aiTimeoutRef.current = null;
    }, 1500);

    return () => {
      if (aiTimeoutRef.current) {
        clearTimeout(aiTimeoutRef.current);
        aiTimeoutRef.current = null;
      }
    };
  }, [aiMode, humanTurn, winner, ai]);

  function handleStartGameOver() {
    if (aiTimeoutRef.current) {
      clearTimeout(aiTimeoutRef.current);
      aiTimeoutRef.current = null;
    }
    setBoard(Array(9).fill(null));
    setHumanTurn(true);
  }

  useEffect(() => {
    winnerSetter(isTie ? null : winner);
  }, [winner, winnerSetter, isTie]);

  if (winner) {
    if (aiMode) {
      if (winner === human) {
        status = GAME_STATUS.PLAYER_WIN;
      } else {
        status = GAME_STATUS.AI_WIN;
      }
    } else {
      if (winner === human) {
        status = GAME_STATUS.FIRST_PLAYER_WIN;
      } else {
        status = GAME_STATUS.SECOND_PLAYER_WIN;
      }
    }
  } else if (isTie) {
    status = GAME_STATUS.TIE;
  } else {
    if (aiMode) {
      status = `${humanTurn ? GAME_STATUS.PLAYER_TURN : GAME_STATUS.AI_TURN}`;
    } else {
      status = `${humanTurn ? GAME_STATUS.FIRST_PLAYER_TURN : GAME_STATUS.SECOND_PLAYER_TURN}`;
    }
  }

  function handleClick(cell) {
    const { winner, isTie } = decideWinner(board);

    if (board[cell] !== null || winner || isTie) {
      return;
    }

    if (aiMode && !humanTurn) {
      return;
    }
    let boardState = board.slice();
    if (aiMode) {
      if (humanTurn) {
        boardState[cell] = human;
        setBoard(boardState);
        setHumanTurn(false);
      }
    } else {
      if (humanTurn) {
        boardState[cell] = human;
        setBoard(boardState);
        setHumanTurn(false);
      } else {
        boardState[cell] = ai;
        setHumanTurn(true);
        setBoard(boardState);
      }
    }
  }

  let scores;
  if (human === "x") {
    scores = {
      x: -10,
      o: 10,
      tie: 0,
    };
  } else {
    scores = {
      x: 10,
      o: -10,
      tie: 0,
    };
  }

  return (
    <>
      <Player
        playerClassname="player player_type_first"
        playerIconClassname="player__icon player__icon_type_default"
        player={aiMode ? "Player" : "1st player"}
        playerShape={aiMode ? human : "x"}
        active={isFirstPlayerActive}
      />
      <div className="board-container">
        <div className="board">
          {board.map((_, id) => (
            <Cell
              key={id}
              value={board[id]}
              onClick={() => handleClick(id)}
              win={winningCells.includes(id)}
              winner={winner}
            />
          ))}
        </div>
      </div>
      <Player
        playerClassname={`player ${aiMode ? "player_type_ai" : "player_type_second"}`}
        playerIconClassname={`player__icon ${aiMode ? "player__icon_type_ai" : "player__icon_type_default"}`}
        player={aiMode ? "AI" : "2nd player"}
        playerShape={aiMode ? ai : "o"}
        active={isSecondPlayerActive}
      />
      <GameStatus status={status} winner={winner} />
      <div className="menu">
        <Link className="navigation-link" to="/">
          Back to Game settings
        </Link>
        <button className="restart-btn" onClick={handleStartGameOver}>
          Restart
        </button>
      </div>
    </>
  );
}

export default Board;
