"use client";

import { useEffect, useState } from "react";
import { v4 } from "uuid";
import styles from "./index.module.css";
import Grid from "../grid";

type Component = {
  id: string;
  position: Position;
};

enum SelectionTools {
  SELECT = "select",
  DRAG = "drag",
}

enum ConnectionTools {
  WIRE = "wire",
  BUS = "bus",
}

enum SourceTools {
  CLOCK = "clock", // switch between low & high logic level at a given frequency
  BUTTON = "button", // set logic level to high when clicked
  PULSE = "pulse", // set logic level to high for a given duration
}

enum SinkTools {
  LED = "led",
  SEVEN_SEGMENT_DISPLAY = "seven-segment-display",
  OSCILLOSCOPE = "oscilloscope",
}

enum ComponentTools {
  NOT_GATE = "not-gate",
  AND_GATE = "and-gate",
  NAND_GATE = "nand-gate",
  OR_GATE = "or-gate",
  NOR_GATE = "nor-gate",
  USER_DEFINED = "user-defined",
}

type Tools = SelectionTools | ConnectionTools | SourceTools | SinkTools | ComponentTools;

const Canvas = () => {
  const [dimensions, setDimensions] = useState<Dimension>({ width: 0, height: 0 });
  const [components, setComponents] = useState<Component[]>([]);
  const [tool, setTool] = useState<Tools>(SelectionTools.SELECT);

  /**
   * Set the svg viewbox to the size of the viewport
   */
  const setViewBox = () => {
    const canvas = document.getElementById("canvas");
    if (canvas) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
      canvas.setAttribute("viewBox", `0 0 ${width} ${height}`);
    }
  };

  useEffect(() => {
    setViewBox();
    window.addEventListener("resize", setViewBox);
    return () => window.removeEventListener("resize", setViewBox);
  }, []);

  /**
   * Select Tool Callback: shared with the command panel to set the selected tool
   */
  const selectTool = (tool: Tools) => {
    setTool(tool);
  };

  /**
   * handleClick: Handle mouse click event on the canvas. Depending on the selected tool, clicking on the canvas will:
   * - Add a new component to the canvas
   * - Select a component
   * - Begin dragging a component
   * - Begin drawing a wire
   * @param event Mouse click event
   */
  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const canvas = document.getElementById("canvas");

    if (canvas) {
      const dx = canvas.getBoundingClientRect().x;
      const dy = canvas.getBoundingClientRect().y;
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;
      let newComponent: Component = {
        id: v4(),
        position: {
          x: event.clientX - dx,
          y: event.clientY - dy,
        },
      };
      setComponents([...components, newComponent]);
    }
  };

  return (
    <svg
      id="canvas"
      focusable="true"
      className={styles.canvas}
      onClick={handleClick}
      width={dimensions.width}
      height={dimensions.height}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
      <Grid dimension={dimensions} spacing={50} />
      {components.map((c) => (
        <rect
          id={c.id}
          key={"component-" + c.id}
          x={c.position.x}
          y={c.position.y}
          width={100}
          height={50}
          stroke="black"
          strokeWidth={2}
          fill="lightgray"
          rx={2}
        />
      ))}
    </svg>
  );
};

export default Canvas;
