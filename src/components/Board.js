import {  useState } from "react";
import Cell from './Cell';
import PlayersPanel from "./PlayersPanel";

function Board({ AiMode, ai, human, onBackToSettingsBtnClick }) {
    let cells = [
        {id: 0, win: false},
        {id: 1, win: false},
        {id: 2, win: false},
        {id: 3, win: false},
        {id: 4, win: false},
        {id: 5, win: false},
        {id: 6, win: false},
        {id: 7, win: false},
        {id: 8, win: false},
    ];
    const [board, setBoard] = useState(Array(9).fill(null));
    const [humanTurn, setHumanTurn] = useState(true);
    let status;

    function handleStartGameOver() {
        setBoard(Array(9).fill(null));
    };

    const winner = decideWinner(board);
    if (winner) {
        if (winner !== 'tie') {
            status = `Winner is ${winner}`;
        } else {
            status = 'Tie!';
        }
    } else {
        status = `Next player is ${humanTurn ? human : ai}`;
    };

    function handleClick(cell) {
        if (board[cell] !== null|| decideWinner(board)) {
            return;
        }
        let boardState = board.slice();

        if (AiMode) {
            if (humanTurn) {
                boardState[cell] = human;
                setBoard(boardState);
                setHumanTurn(false);
                console.log('human turn');
            }
            setBoard(handleAIMove(boardState));
            console.log('ai turn');
            setHumanTurn(true);
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
    };

    function equals3(a, b, c) {
        return a === b && b === c && a !== null;
    }

    function decideWinner(board) {
        let winner = null;

        // horizontal
        for (let i = 0; i < 3; i++) {
            if (equals3(board[i*3], board[i*3+1], board[i*3+2])) {
                winner = board[i*3];
                cells[i*3].win = true;
                cells[i*3+1].win = true;
                cells[i*3+2].win = true;
            }
        }
        
        // Vertical
        for (let i = 0; i < 3; i++) {
            if (equals3(board[i], board[i+3], board[i+6])) {
                winner = board[i];
                cells[i].win = true;
                cells[i+3].win = true;
                cells[i+6].win = true;
            }
        }
        
        // Diagonal
        if (equals3(board[0], board[4], board[8])) {
            winner = board[0];
            cells[0].win = true;
            cells[4].win = true;
            cells[8].win = true;
        }
        if (equals3(board[2], board[4], board[6])) {
            winner = board[2];
            cells[2].win = true;
            cells[4].win = true;
            cells[6].win = true;
        }
        
        let openSpots = 0;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                openSpots++;
            }
        }
        
        if (winner == null && openSpots === 0) {
            return 'tie';
        } else {
            return winner;
        }
    };

    function handleAIMove (board) {
        let bestScore = -Infinity;
        let cell;
        for (let i = 0; i < 9; i++) {
            if (board[i] == null) {
                board[i] = ai;
                let score = minimax(board, 0, false);
                board[i] = null;
                if (score > bestScore) {
                    bestScore = score;
                    cell = i;
                }
            };
        };
        board[cell] = ai;
        return board;
    };

    let scores;
    if (human === 'x') {
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

    const minimax = (board, depth, humanTurn) => {
        let winner = decideWinner(board);
        if (winner) {
            return scores[winner];
        };

        if (humanTurn) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] == null) {
                    board[i] = ai;
                    let score = minimax(board, depth + 1, false);
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
                    let score = minimax(board, depth + 1, true);
                    board[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    return(
        <>
            <PlayersPanel AI={AiMode} gameStatus={status} winner={winner} />
            <div className='board'>
                {cells.map(cell => (
                    <Cell
                        key={cell.id}
                        value={board[cell.id]}
                        onClick={() => handleClick(cell.id)}
                        win={cell.win}
                        winner={winner}
                    />
                ))}
            </div>
            <div>
                <button onClick={onBackToSettingsBtnClick} >Back to game settings</button>
                <button onClick={handleStartGameOver} >Start the game over</button>
            </div>
        </>
    );
};

export default Board;