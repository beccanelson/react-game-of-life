export type Coordinates = {
  x: number;
  y: number;
};

export type Cell = Coordinates & {
  living: boolean;
};

export type CellState = {
  living: boolean;
  numberOfLivingNeighbors: number;
};

export interface Rules {
  isLiving(state: CellState): boolean;
}
