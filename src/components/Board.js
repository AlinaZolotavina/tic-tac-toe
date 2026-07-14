import { useEffect, useState, useRef } from "react";
import Cell from "./Cell";
import Player from "./Player";
import GameStatus from "./GameStatus";
import HomeBtn from "./HomeBtn";

import { decideWinner } from "../utils/gameLogic";
import { handleAIMove } from "../utils/ai";

function Board({
  AiMode,
  ai,
  human,
  onBackToSettingsBtnClick,
  onHomeBtnClick,
  winnerSetter,
}) {
  const cells = Array.from({ length: 9 }, (_, id) => id);
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
    if (!AiMode || humanTurn || winner) {
      return;
    }

    aiTimeoutRef.current = setTimeout(() => {
      setBoard((currentBoard) => {
        const bestMove = handleAIMove(currentBoard, ai, human, scores);

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
  }, [AiMode, humanTurn, winner, ai]);

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
    if (AiMode) {
      if (winner === human) {
        status = "You won!";
      } else {
        status = "AI won!";
      }
    } else {
      if (winner === human) {
        status = "1st player won!";
      } else {
        status = "2nd player won!";
      }
    }
  } else if (isTie) {
    status = "Tie!";
  } else {
    if (AiMode) {
      status = `${humanTurn ? "It's your turn" : "AI's turn"}`;
    } else {
      status = `${humanTurn ? "1st player's turn" : "2nd player's turn"}`;
    }
  }

  function handleClick(cell) {
    const { winner, isTie } = decideWinner(board);

    if (board[cell] !== null || winner || isTie) {
      return;
    }

    if (AiMode && !humanTurn) {
      return;
    }
    let boardState = board.slice();
    if (AiMode) {
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
      <div className="menu">
        <HomeBtn onClick={onHomeBtnClick} />
        <div className="game__btns">
          <button
            className="game__btn game__btn_type_restart"
            onClick={handleStartGameOver}
          />
          <button
            className="game__btn game__btn_type_settings"
            onClick={onBackToSettingsBtnClick}
          />
        </div>
      </div>
      <div className="game__main-unit">
        <Player
          playerClassname="player player__first"
          playerIconClassname="player__icon player__icon_type_default"
          player={AiMode ? "Player" : "1st player"}
          playerShape={AiMode ? human : "x"}
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
          playerClassname={`player ${AiMode ? "player__ai" : "player__second"}`}
          playerIconClassname={`player__icon ${AiMode ? "player__icon_type_ai" : "player__icon_type_default"}`}
          player={AiMode ? "AI" : "2nd player"}
          playerShape={AiMode ? ai : "o"}
          active={isSecondPlayerActive}
        />
      </div>
      <div className="game__secondary-unit">
        <GameStatus status={status} winner={winner} />
      </div>
    </>
  );
}

export default Board;
