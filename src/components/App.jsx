import { Route, Routes, useNavigate } from "react-router-dom";
import GameSettings from "./GameSettings";
import Board from "./Board";
import { useState } from "react";
import ShapeSelection from "./ShapeSelection";
import Firework from "./Firework";

function App() {
  const navigate = useNavigate();
  const [ai, setAi] = useState(false);
  const [aiShape, setAiShape] = useState("o");
  const [humanShape, setHumanShape] = useState("x");
  const [winner, setWinner] = useState(null);
  function handleTwoPlayersClick() {
    navigate("/new-game");
    setAi(false);
  }

  function handleOnePlayerClick() {
    navigate("/shape-selection");
    setAi(true);
  }

  function handleShapeSelect(shape) {
    navigate("/new-game");
    setHumanShape(shape);
    if (shape === "x") {
      setAiShape("o");
    } else {
      setAiShape("x");
    }
  }

  function handleHomeBtnClick() {
    navigate("/");
    setWinner(null);
  }

  const fireworks = [
    { classname: "firework_number_first", color: "light-blue" },
    { classname: "firework_number_second", color: "yellow" },
    { classname: "firework_number_third", color: "pink" },
    { classname: "firework_number_fourth", color: "green" },
    { classname: "firework_number_fifth", color: "light-blue" },
    { classname: "firework_number_sixth", color: "yellow" },
    { classname: "firework_number_seventh", color: "pink" },
  ];

  return (
    <Routes>
      <Route
        path="/"
        element={
          <GameSettings
            onTwoPlayersClick={handleTwoPlayersClick}
            onOnePlayerClick={handleOnePlayerClick}
          />
        }
      />
      <Route
        path="/shape-selection"
        element={
          <ShapeSelection
            onShapeSelect={handleShapeSelect}
            onHomeBtnClick={handleHomeBtnClick}
          />
        }
      />
      <Route
        path="/new-game"
        element={
          <div className="game">
            <Board
              aiMode={ai}
              ai={aiShape}
              human={humanShape}
              winnerSetter={setWinner}
            />
            {fireworks.map(({ classname, color }) => (
              <Firework
                key={classname}
                classname={classname}
                visible={winner}
                color={color}
              />
            ))}
          </div>
        }
      />
    </Routes>
  );
}

export default App;
