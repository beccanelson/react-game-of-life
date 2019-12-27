import * as React from "react";
import _ from "lodash";
import useGameOfLife from "./hooks/useGameOfLife";

const GRID_SIZE = 40;
const CELL_SIZE = 15;
const DELAY_MS = 200;

const FILL_COLOR = "#00b5cc";
const BACKGROUND = "#FFFFFF";

const World: React.SFC = () => {
  const [running, setRunning] = React.useState(false);
  const { cells, setLivingAt, tick, reset } = useGameOfLife(GRID_SIZE);

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
          return row.map(({ x, y, living }) => {
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
                fill={living ? FILL_COLOR : BACKGROUND}
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
