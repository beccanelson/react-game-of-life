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
