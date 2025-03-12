"use client";

import { useEffect, useState } from "react";
import { v4 } from "uuid";
import styles from "./index.module.css";
import Grid from "../grid";
import { Component, Dimension } from "../types";
import CommandPanel from "../command-panel";
import {
  CommandPanelConfig,
  ComponentTools,
  ConnectionTools,
  CONTROL_PANEL_COMPONENT,
  GridSpacing,
  SelectionTools,
  SinkTools,
  SourceTools,
  Tools,
} from "../config";

const Canvas = () => {
  const [dimensions, setDimensions] = useState<Dimension>({ width: 0, height: 0 });
  const [components, setComponents] = useState<Component[]>([]);

  const [controlPanelVisibility, setControlPanelVisibility] = useState<boolean>(false);
  const [gridSpacing, setGridSpacing] = useState<GridSpacing>(GridSpacing.SMALL);
  const [gridMagnet, setGridMagnet] = useState<boolean>(false);
  const [tool, setTool] = useState<Tools>(Tools.SELECT);

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
   * Select Grid View Callback: shared with the command panel to set the grid view
   */
  const selectGridSpacing = (spacing: GridSpacing) => {
    setGridSpacing(spacing);
  };

  /**
   * Set Grid Magnet Callback: shared with the command panel to toggle grid magnet
   */
  const selectGridMagnet = (action: number) => {
    setGridMagnet((prev) => !prev);
  };

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

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Meta") {
      console.log("keydown: toggle control panel visibility");
      toggleControlPanelVisibility();
    }
  };

  // toggle control panel visibility
  const toggleControlPanelVisibility = () => {
    setControlPanelVisibility((prev) => !prev);
  };

  /**
   * Configure the Command Panel
   */

  const CommandPanelConfig: CommandPanelConfig = [
    { type: CONTROL_PANEL_COMPONENT.SPACER },
    {
      type: CONTROL_PANEL_COMPONENT.BUTTON_GROUP,
      actionType: GridSpacing as unknown as number,
      onSelect: setGridSpacing,
      buttons: [
        { action: 0, uri: "./icons/grid_small.svg", tooltip: "Small Grid" },
        { action: 1, uri: "./icons/grid_large.svg", tooltip: "Large Grid" },
      ],
    },
    { type: CONTROL_PANEL_COMPONENT.SPACER },
    {
      type: CONTROL_PANEL_COMPONENT.BUTTON,
      props: { action: 0, onSelect: () => {}, uri: "./icons/copy.svg" },
    },
    {
      type: CONTROL_PANEL_COMPONENT.BUTTON,
      props: { action: 0, onSelect: () => {}, uri: "./icons/paste.svg", tooltip: "Paste" },
    },
    { type: CONTROL_PANEL_COMPONENT.SPACER },
    {
      type: CONTROL_PANEL_COMPONENT.BUTTON_GROUP,
      actionType: Tools as unknown as number,
      onSelect: selectTool,
      buttons: [
        { action: Tools.SELECT, uri: "./icons/select.svg", tooltip: "Select" },
        { action: Tools.MOVE, uri: "./icons/move.svg", tooltip: "Drag" },
        { action: Tools.WIRE, uri: "./icons/wire.svg", tooltip: "Wire" },
        { action: Tools.INPUT_PIN, uri: "./icons/input_pin.svg", tooltip: "Input Pin" },
        {
          action: Tools.OUTPUT_PIN,
          uri: "./icons/output_pin.svg",
          tooltip: "Output Pin",
        },
        {
          action: Tools.SOURCE_HI,
          uri: "./icons/logic-gate.svg",
          label: "HI",
          show: ["#output-1"],
        },
        {
          action: Tools.SOURCE_LO,
          uri: "./icons/logic-gate.svg",
          label: "lo",
          show: ["#output-1"],
        },
        {
          action: Tools.SOURCE_CLOCK,
          uri: "./icons/logic-gate.svg",
          label: "Clock",
          show: ["#output-1"],
        },
        {
          action: Tools.NOT_GATE,
          uri: "./icons/logic-gate.svg",
          label: "NOT",
          show: ["#input-1", "#output-1"],
        },
        {
          action: Tools.AND_GATE,
          uri: "./icons/logic-gate.svg",
          label: "AND",
          show: ["#inputs-2", "#output-1"],
        },
        {
          action: Tools.NAND_GATE,
          uri: "./icons/logic-gate.svg",
          label: "NAND",
          show: ["#inputs-2", "#output-1"],
        },
        {
          action: Tools.OR_GATE,
          uri: "./icons/logic-gate.svg",
          label: "OR",
          show: ["#inputs-2", "#output-1"],
        },
        {
          action: Tools.NOR_GATE,
          uri: "./icons/logic-gate.svg",
          label: "NOR",
          show: ["#inputs-2", "#output-1"],
        },
        {
          action: Tools.SINK_LED,
          uri: "./icons/logic-gate.svg",
          label: "LED",
          show: ["#input-1"],
        },
      ],
    },
  ];

  return (
    <>
      <svg
        id="canvas"
        focusable="true"
        className={styles.canvas}
        onClick={handleClick}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
        <Grid dimension={dimensions} spacing={gridSpacing} />
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
      <CommandPanel
        visibility={controlPanelVisibility}
        toggleVisibility={toggleControlPanelVisibility}
        config={CommandPanelConfig}
      />
    </>
  );
};

export default Canvas;
