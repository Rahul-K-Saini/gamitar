export interface GridState {
  cells: string[][];
}

export interface Player {
  id: string;
  hasPlayed: boolean;
}

export interface GameState {
  grid: GridState;
  players: Map<string, Player>;
}