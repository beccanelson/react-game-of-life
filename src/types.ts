export type Coordinates = {
  x: number;
  y: number;
};

export type Cell = Coordinates & {
  living: boolean;
};
