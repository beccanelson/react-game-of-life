import * as React from "react";
import useGameOfLife from "./hooks/useGameOfLife";
import Cell from "./Cell";

const GRID_SIZE = 30;
const CELL_SIZE = 18;
const DELAY_MS = 200;

const FILL_COLOR = "#9a12b3";
const FILL_COLOR_LIGHT = "#bf55ec";
const BACKGROUND = "#FFFFFF";

type WorldProps = {
  gridSize?: number;
  cellSize?: number;
};

const World: React.SFC<WorldProps> = ({
  gridSize = GRID_SIZE,
  cellSize = CELL_SIZE,
}) => {
  const [running, setRunning] = React.useState(false);
  const {
    cells,
    setLivingAt,
    tick,
    reset,
    isAliveInNextGeneration,
    hasLivingCells,
  } = useGameOfLife(gridSize);

  const gridWidth = cellSize * gridSize;

  if (running && hasLivingCells) {
    setTimeout(() => {
      tick();
    }, DELAY_MS);
  }

  const getFill = React.useCallback(
    function (cell) {
      const { living } = cell;
      let fill = BACKGROUND;
      if (living) {
        fill = isAliveInNextGeneration(cell) ? FILL_COLOR_LIGHT : FILL_COLOR;
      }
      return fill;
    },
    [isAliveInNextGeneration]
  );

  return (
    <>
      <svg
        width={gridWidth}
        height={gridWidth}
        viewBox={`0 0 ${gridWidth} ${gridWidth}`}
      >
        {cells.map((cell) => {
          const { x, y } = cell;
          return (
            <Cell
              size={cellSize}
              cell={cell}
              fill={getFill(cell)}
              key={`${x}-${y}`}
              onClick={() => {
                setLivingAt({ x, y });
              }}
            />
          );
        })}
      </svg>
      <div>
        <button disabled={running} onClick={() => tick()}>
          Tick
        </button>
        <button disabled={running} onClick={() => reset()}>
          Reset
        </button>
        <button disabled={running} onClick={() => setRunning(true)}>
          Start
        </button>
        <button disabled={!running} onClick={() => setRunning(false)}>
          Stop
        </button>
      </div>
    </>
  );
};

export default World;
