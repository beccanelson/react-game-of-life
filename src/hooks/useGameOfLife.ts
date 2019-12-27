import _ from "lodash";
import * as React from "react";
import { Coordinates, Cell } from "../types";

function useGameOfLife(gridSize: number = 10) {
  const initialCells = _.flatten(
    _.times(gridSize, i => {
      const x = i + 1;
      return _.times(gridSize, i2 => {
        const y = i2 + 1;
        return { x, y, living: false };
      });
    })
  );

  const [cells, setCells] = React.useState(initialCells);

  const reset = React.useCallback(
    function reset() {
      setCells(initialCells);
    },
    [setCells, initialCells]
  );

  const isEmpty = _.every(cells, { living: false });

  const livingCells = _.filter(cells, { living: true });

  function isAliveAt({ x, y }: Coordinates) {
    const cell = _.find(livingCells, { x, y });
    return !!cell;
  }

  const setCell = React.useCallback(
    function setCell({ x, y, living = false }: Cell) {
      const updatedCells = cells.map(cell => {
        if (cell.x === x && cell.y === y) {
          return { x, y, living };
        }
        return cell;
      });
      setCells(updatedCells);
    },
    [cells, setCells]
  );

  const setLivingAt = React.useCallback(
    function setLivingAt({ x, y }: Coordinates) {
      setCell({ x, y, living: true });
    },
    [setCell]
  );

  const getLivingNeighbors = React.useCallback(
    function getLivingNeighbors({ x: x1, y: y1 }: Coordinates) {
      return _.filter(livingCells, ({ x: x2, y: y2 }) => {
        const dx = Math.abs(x1 - x2);
        const dy = Math.abs(y1 - y2);
        const isSame = dx === 0 && dy === 0;
        return dx <= 1 && dy <= 1 && !isSame;
      });
    },
    [livingCells]
  );

  const isAliveInNextGeneration = React.useCallback(
    function isAliveInNextGeneration(coordinates: Coordinates) {
      const livingNeighbors = getLivingNeighbors(coordinates);
      return !(livingNeighbors.length < 2 || livingNeighbors.length > 3);
    },
    [getLivingNeighbors]
  );

  const tick = React.useCallback(
    function tick() {
      setCells(
        cells.map(cell => ({
          ...cell,
          living: isAliveInNextGeneration(cell)
        }))
      );
    },
    [setCells, cells, isAliveInNextGeneration]
  );

  return {
    cells,
    setLivingAt,
    tick,
    reset,
    isEmpty,
    isAliveAt,
    isAliveInNextGeneration
  };
}

export default useGameOfLife;
