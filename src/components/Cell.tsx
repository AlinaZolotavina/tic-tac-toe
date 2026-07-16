import type { CellProps } from "../types/components";
function Cell({ value, win, winner, onClick }: CellProps) {
  const cellClass =
    value === "x" ? "cell_shape_x" : value === "o" ? "cell_shape_o" : "";

  return (
    <button
      className={`cell ${cellClass} ${win && "cell_win"} ${!win && winner != null ? "cell_lose" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Cell;
