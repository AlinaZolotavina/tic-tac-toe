import type { Shape, Winner } from "./game";

export interface BoardProps {
  aiMode: boolean;
  ai: Shape;
  human: Shape;
  winnerSetter: React.Dispatch<React.SetStateAction<Winner>>;
}

export interface GameSettingsProps {
  onOnePlayerClick: () => void;
  onTwoPlayersClick: () => void;
}

export interface PlayersSelectionProps {
  onOnePlayerClick: () => void;
  onTwoPlayersClick: () => void;
}

export interface ShapeSelectionProps {
  onShapeSelect: (shape: Shape) => void;
}

export interface GameStatusProps {
  status: string;
  winner: Winner;
}

export interface PlayerProps {
  playerClassname: string;
  playerIconClassname: string;
  player: string;
  playerShape: Shape;
  active: boolean;
}

export interface CellProps {
  value: Shape | null;
  win: boolean;
  winner: Winner;
  onClick: () => void;
}
