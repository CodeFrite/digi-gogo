import { Dimension } from "../types";

type GridProps = {
  dimension: Dimension; // width and height of the canvas on which to render the grid
  spacing?: number; // width and height of the grid squares
  snapToGrid?: boolean; // snap components to the grid when moving them
};

const Grid: React.FC<GridProps> = (props: GridProps) => {
  const dimension = props.dimension;
  const gridSize = props.spacing ?? 25;

  const drawGrid = () => {
    const gridLines = [];
    for (let i = 0; i < dimension.width; i += gridSize) {
      gridLines.push(
        <line
          key={"grid-line-x-" + i}
          x1={i}
          y1={0}
          x2={i}
          y2={dimension.height}
          stroke="gray"
          strokeWidth={0.5}
        />
      );
    }

    for (let i = 0; i < dimension.height; i += gridSize) {
      gridLines.push(
        <line
          key={"grid-line-y-" + i}
          x1={0}
          y1={i}
          x2={dimension.width}
          y2={i}
          stroke="gray"
          strokeWidth={0.5}
        />
      );
    }

    return gridLines;
  };

  return <g>{drawGrid()}</g>;
};
export default Grid;
