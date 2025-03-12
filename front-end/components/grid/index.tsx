import { JSX, useEffect, useState } from "react";
import { GridSpacing } from "../config";
import { Dimension } from "../types";

type GridProps = {
  dimension: Dimension; // width and height of the canvas on which to render the grid
  spacing: GridSpacing; // width and height of the grid squares
  snapToGrid?: boolean; // snap components to the grid when moving them
};

const Grid: React.FC<GridProps> = (props: GridProps) => {
  const [gridLines, setGridLines] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const drawGrid = () => {
      const lines = [];
      for (let i = 0; i < props.dimension.width; i += props.spacing) {
        lines.push(
          <line
            key={"grid-line-x-" + i}
            x1={i}
            y1={0}
            x2={i}
            y2={props.dimension.height}
            stroke="gray"
            strokeWidth={0.5}
          />
        );
      }

      for (let i = 0; i < props.dimension.height; i += props.spacing) {
        lines.push(
          <line
            key={"grid-line-y-" + i}
            x1={0}
            y1={i}
            x2={props.dimension.width}
            y2={i}
            stroke="gray"
            strokeWidth={0.5}
          />
        );
      }

      return lines;
    };

    setGridLines(drawGrid());
  }, [props.dimension, props.spacing]);

  return <g>{gridLines}</g>;
};
export default Grid;
