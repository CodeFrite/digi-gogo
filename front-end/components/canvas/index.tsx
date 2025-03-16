"use client";

import { useEffect, useState } from "react";
import { v4 } from "uuid";
import styles from "./index.module.css";
import Grid from "../grid";
import { Dimension } from "../types";
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
import LogicGate, { LogicGateProps } from "../logic-gate";

const Canvas = () => {
  const [dimensions, setDimensions] = useState<Dimension>({ width: 0, height: 0 });
  const [components, setComponents] = useState<LogicGateProps[]>([]);
  const [connections, setConnections] = useState<any[]>([]); // rework the type after defining the connection type

  const [controlPanelVisibility, setControlPanelVisibility] = useState<boolean>(false);
  const [gridSpacing, setGridSpacing] = useState<GridSpacing>(GridSpacing.SMALL);
  const [gridMagnet, setGridMagnet] = useState<boolean>(false);
  const [tool, setTool] = useState<Tools>(SelectionTools.SELECT);
  const [phantomComponent, setPhantomComponent] = useState<LogicGateProps | null>(null);

  const logicGateDrawingOffset = 25;

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
    switch (tool) {
      case SourceTools.HI:
        setPhantomComponent({
          id: v4(),
          type: tool,
          label: "HI",
          position: { x: 0, y: 0 },
          inputs: [],
          outputs: ["#output-1"],
        });
        break;
      case SourceTools.LO:
        setPhantomComponent({
          id: v4(),
          type: tool,
          label: "lo",
          position: { x: 0, y: 0 },
          inputs: [],
          outputs: ["#output-1"],
        });
        break;
      case SourceTools.CLOCK:
        setPhantomComponent({
          id: v4(),
          type: tool,
          label: "Clock",
          position: { x: 0, y: 0 },
          inputs: [],
          outputs: ["#output-1"],
        });
        break;
      case ComponentTools.NOT_GATE:
        setPhantomComponent({
          id: v4(),
          type: tool,
          label: "NOT",
          position: { x: 0, y: 0 },
          inputs: ["#input-1"],
          outputs: ["#output-1"],
        });
        break;
      case ComponentTools.AND_GATE:
        setPhantomComponent({
          id: v4(),
          type: tool,
          label: "AND",
          position: { x: 0, y: 0 },
          inputs: ["#inputs-2"],
          outputs: ["#output-1"],
        });
        break;
      case ComponentTools.NAND_GATE:
        setPhantomComponent({
          id: v4(),
          type: tool,
          label: "NAND",
          position: { x: 0, y: 0 },
          inputs: ["#inputs-2"],
          outputs: ["#output-1"],
        });
        break;
      case ComponentTools.OR_GATE:
        setPhantomComponent({
          id: v4(),
          type: tool,
          label: "OR",
          position: { x: 0, y: 0 },
          inputs: ["#inputs-2"],
          outputs: ["#output-1"],
        });
        break;
      case ComponentTools.NOR_GATE:
        setPhantomComponent({
          id: v4(),
          type: tool,
          label: "NOR",
          position: { x: 0, y: 0 },
          inputs: ["#inputs-2"],
          outputs: ["#output-1"],
        });
        break;
      case SinkTools.LED:
        setPhantomComponent({
          id: v4(),
          type: tool,
          label: "LED",
          position: { x: 0, y: 0 },
          inputs: ["#input-1"],
          outputs: [],
        });
        break;
      default:
        setPhantomComponent(null);
    }
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
    // check if the canvas exists & if we are actually trying to draw a component (wire/gate)
    if (canvas) {
      // get the click position relative to the canvas
      const dx = canvas.getBoundingClientRect().x;
      const dy = canvas.getBoundingClientRect().y;
      let clickX = event.clientX - dx - logicGateDrawingOffset;
      let clickY = event.clientY - dy - logicGateDrawingOffset;

      if (gridMagnet) {
        clickX -= clickX % gridSpacing;
        clickY -= clickY % gridSpacing;
      }

      // add a new component to the canvas depending on the selected tool

      let newLogicGate: LogicGateProps;
      switch (tool) {
        case SourceTools.HI:
          newLogicGate = {
            id: v4(),
            type: tool,
            label: "HI",
            position: {
              x: clickX,
              y: clickY,
            },
            inputs: [],
            outputs: ["#output-1"],
          };
          setComponents([...components, newLogicGate]);
          selectTool(SelectionTools.SELECT);
          break;
        case SourceTools.LO:
          newLogicGate = {
            id: v4(),
            type: tool,
            label: "lo",
            position: {
              x: clickX,
              y: clickY,
            },
            inputs: [],
            outputs: ["#output-1"],
          };
          setComponents([...components, newLogicGate]);
          selectTool(SelectionTools.SELECT);
          break;
        case SourceTools.CLOCK:
          newLogicGate = {
            id: v4(),
            type: tool,
            label: "Clock",
            position: {
              x: clickX,
              y: clickY,
            },
            inputs: [],
            outputs: ["#output-1"],
          };
          setComponents([...components, newLogicGate]);
          selectTool(SelectionTools.SELECT);
          break;
        case ComponentTools.NOT_GATE:
          newLogicGate = {
            id: v4(),
            type: tool,
            label: "NOT",
            position: {
              x: clickX,
              y: clickY,
            },
            inputs: ["#input-1"],
            outputs: ["#output-1"],
          };
          setComponents([...components, newLogicGate]);
          selectTool(SelectionTools.SELECT);
          break;
        case ComponentTools.AND_GATE:
          newLogicGate = {
            id: v4(),
            type: tool,
            label: "AND",
            position: {
              x: clickX,
              y: clickY,
            },
            inputs: ["#inputs-2"],
            outputs: ["#output-1"],
          };
          setComponents([...components, newLogicGate]);
          selectTool(SelectionTools.SELECT);
          break;
        case ComponentTools.NAND_GATE:
          newLogicGate = {
            id: v4(),
            type: tool,
            label: "NAND",
            position: {
              x: clickX,
              y: clickY,
            },
            inputs: ["#inputs-2"],
            outputs: ["#output-1"],
          };
          setComponents([...components, newLogicGate]);
          selectTool(SelectionTools.SELECT);
          break;
        case ComponentTools.OR_GATE:
          newLogicGate = {
            id: v4(),
            type: tool,
            label: "OR",
            position: {
              x: clickX,
              y: clickY,
            },
            inputs: ["#inputs-2"],
            outputs: ["#output-1"],
          };
          setComponents([...components, newLogicGate]);
          selectTool(SelectionTools.SELECT);
          break;
        case ComponentTools.NOR_GATE:
          newLogicGate = {
            id: v4(),
            type: tool,
            label: "NOR",
            position: {
              x: clickX,
              y: clickY,
            },
            inputs: ["#inputs-2"],
            outputs: ["#output-1"],
          };
          setComponents([...components, newLogicGate]);
          selectTool(SelectionTools.SELECT);
          break;
        case SinkTools.LED:
          newLogicGate = {
            id: v4(),
            type: tool,
            label: "LED",
            position: {
              x: clickX,
              y: clickY,
            },
            inputs: ["#input-1"],
            outputs: [],
          };
          setComponents([...components, newLogicGate]);
          selectTool(SelectionTools.SELECT);
          break;
      }
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
   * handleMouseMove: When a drawing tool is selected, a phantom component is drawn on the canvas to show the user where the component will be placed.
   */
  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const canvas = document.getElementById("canvas");
    if (canvas && phantomComponent) {
      const dx = canvas.getBoundingClientRect().x;
      const dy = canvas.getBoundingClientRect().y;
      let mouseX = event.clientX - dx - logicGateDrawingOffset;
      let mouseY = event.clientY - dy - logicGateDrawingOffset;

      if (gridMagnet) {
        mouseX -= mouseX % gridSpacing;
        mouseY -= mouseY % gridSpacing;
      }

      let logicGate: LogicGateProps = {
        ...phantomComponent,
        position: {
          x: mouseX,
          y: mouseY,
        },
      };
      setPhantomComponent(logicGate);
    }
  };
  /**
   * Configure the Command Panel
   */

  const [CommandPanelConfig, _] = useState<CommandPanelConfig>([
    { type: CONTROL_PANEL_COMPONENT.SPACER },
    {
      type: CONTROL_PANEL_COMPONENT.BUTTON_GROUP,
      onSelect: setGridSpacing,
      buttons: [
        { action: GridSpacing.SMALL, uri: "./icons/grid_small.svg", tooltip: "Small Grid" },
        { action: GridSpacing.LARGER, uri: "./icons/grid_large.svg", tooltip: "Large Grid" },
      ],
    },
    {
      type: CONTROL_PANEL_COMPONENT.BUTTON,
      props: {
        action: 0,
        uri: "./icons/grid_magnet.svg",
        tooltip: "Grid Magnet",
        onSelect: selectGridMagnet,
        selected: gridMagnet,
      },
    },
    { type: CONTROL_PANEL_COMPONENT.SPACER },
    {
      type: CONTROL_PANEL_COMPONENT.BUTTON_GROUP,
      onSelect: selectTool,
      buttons: [
        { action: SelectionTools.SELECT, uri: "./icons/select.svg", tooltip: "Select" },
        { action: SelectionTools.MOVE, uri: "./icons/move.svg", tooltip: "Drag" },
        { action: ConnectionTools.WIRE, uri: "./icons/wire.svg", tooltip: "Wire" },
        { action: ConnectionTools.INPUT_PIN, uri: "./icons/input_pin.svg", tooltip: "Input Pin" },
        {
          action: ConnectionTools.OUTPUT_PIN,
          uri: "./icons/output_pin.svg",
          tooltip: "Output Pin",
        },
        {
          action: SourceTools.HI,
          uri: "./icons/logic-gate.svg",
          label: "HI",
          show: ["#output-1"],
        },
        {
          action: SourceTools.LO,
          uri: "./icons/logic-gate.svg",
          label: "lo",
          show: ["#output-1"],
        },
        {
          action: SourceTools.CLOCK,
          uri: "./icons/logic-gate.svg",
          label: "Clock",
          show: ["#output-1"],
        },
        {
          action: ComponentTools.NOT_GATE,
          uri: "./icons/logic-gate.svg",
          label: "NOT",
          show: ["#input-1", "#output-1"],
        },
        {
          action: ComponentTools.AND_GATE,
          uri: "./icons/logic-gate.svg",
          label: "AND",
          show: ["#inputs-2", "#output-1"],
        },
        {
          action: ComponentTools.NAND_GATE,
          uri: "./icons/logic-gate.svg",
          label: "NAND",
          show: ["#inputs-2", "#output-1"],
        },
        {
          action: ComponentTools.OR_GATE,
          uri: "./icons/logic-gate.svg",
          label: "OR",
          show: ["#inputs-2", "#output-1"],
        },
        {
          action: ComponentTools.NOR_GATE,
          uri: "./icons/logic-gate.svg",
          label: "NOR",
          show: ["#inputs-2", "#output-1"],
        },
        {
          action: SinkTools.LED,
          uri: "./icons/logic-gate.svg",
          label: "LED",
          show: ["#input-1"],
        },
      ],
    },
  ]);

  return (
    <>
      <svg
        id="canvas"
        focusable="true"
        className={styles.canvas}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
        <Grid dimension={dimensions} spacing={gridSpacing} />
        {components.map((c) => (
          <LogicGate key={c.id} {...c} />
        ))}
        {phantomComponent && <LogicGate {...phantomComponent} />}
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
