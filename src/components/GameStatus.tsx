import type { GameStatusProps } from "../types/components";
function GameStatus({ status, winner }: GameStatusProps) {
  return (
    <p className={`status ${winner !== null ? "status_winner" : ""}`}>
      {status}
    </p>
  );
}

export default GameStatus;
