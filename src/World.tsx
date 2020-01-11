import * as React from "react";
import _ from "lodash";
import useGameOfLife from "./hooks/useGameOfLife";
import { Rules } from "./types";

const GRID_SIZE = 30;
const CELL_SIZE = 18;
const DELAY_MS = 200;

const FILL_COLOR = "#9a12b3";
const FILL_COLOR_LIGHT = "#bf55ec";
const BACKGROUND = "#FFFFFF";

const customRules: Rules = {
  isLiving({ living, numberOfLivingNeighbors }) {
    return !(numberOfLivingNeighbors < 2 || numberOfLivingNeighbors > 3);
  }
};

const World: React.SFC = () => {
  const [running, setRunning] = React.useState(false);
  const {
    cells,
    setLivingAt,
    tick,
    reset,
    isAliveInNextGeneration
  } = useGameOfLife(GRID_SIZE);

  const gridWidth = CELL_SIZE * GRID_SIZE;
  const rows = _.times(GRID_SIZE, n => {
    return _.filter(cells, { x: n + 1 });
  });

  if (running) {
    setTimeout(() => {
      tick();
    }, DELAY_MS);
  }

  return (
    <>
      <svg
        width={gridWidth}
        height={gridWidth}
        viewBox={`0 0 ${gridWidth} ${gridWidth}`}
      >
        {rows.map(row => {
          return row.map(cell => {
            const { x, y, living } = cell;
            let fill = BACKGROUND;
            if (living) {
              fill = isAliveInNextGeneration(cell)
                ? FILL_COLOR_LIGHT
                : FILL_COLOR;
            }
            return (
              <rect
                style={{ cursor: "pointer" }}
                x={x * CELL_SIZE - CELL_SIZE}
                y={y * CELL_SIZE - CELL_SIZE}
                stroke={"black"}
                strokeWidth={"1px"}
                width={CELL_SIZE}
                height={CELL_SIZE}
                key={`${x}-${y}`}
                fill={fill}
                onClick={() => {
                  setLivingAt({ x, y });
                }}
              ></rect>
            );
          });
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
