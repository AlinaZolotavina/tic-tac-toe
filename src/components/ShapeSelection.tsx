import { useState } from "react";
import { Link } from "react-router-dom";
import type { Shape, HoverShape } from "../types/game";
import type { ShapeSelectionProps } from "../types/components";

function ShapeSelection({ onShapeSelect }: ShapeSelectionProps) {
  const [crossActiveClassname, setCrossActiveClassname] = useState("");
  const [zeroActiveClassname, setZeroActiveClassname] = useState("");

  function handleShapeSelect(shape: Shape) {
    onShapeSelect(shape);
  }

  function handleMouseOver(shape: HoverShape) {
    if (shape === "cross") {
      setCrossActiveClassname("shape-selection__option_state_hover-on");
      setZeroActiveClassname("shape-selection__option_state_hover-off");
    } else if (shape === "zero") {
      setZeroActiveClassname("shape-selection__option_state_hover-on");
      setCrossActiveClassname("shape-selection__option_state_hover-off");
    }
  }

  function handleMouseOut() {
    setCrossActiveClassname("");
    setZeroActiveClassname("");
  }

  return (
    <div className="shape-selection">
      <p className="shape-selection__legend">Choose your side ;)</p>
      <div className="shape-selection__options">
        <button
          className={`shape-selection__option cross ${crossActiveClassname}`}
          onClick={() => handleShapeSelect("x")}
          onMouseOver={() => handleMouseOver("cross")}
          onMouseOut={handleMouseOut}
        />
        <button
          className={`shape-selection__option zero ${zeroActiveClassname}`}
          onClick={() => handleShapeSelect("o")}
          onMouseOver={() => handleMouseOver("zero")}
          onMouseOut={handleMouseOut}
        />
      </div>
      <Link className="navigation-link" to="/">
        Back to Game settings
      </Link>
    </div>
  );
}

export default ShapeSelection;
