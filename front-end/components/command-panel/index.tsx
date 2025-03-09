import React from "react";
import styles from "./index.module.css";
import Button from "../button";
import ButtonGroup from "../button-group";
import LogicGate from "../logic-gate";

const Separator: React.FC = () => {
  return <img className={styles["separator"]} src="./icons/separator.svg" />;
};

const CommandPanel: React.FC = () => {
  return (
    <div className={styles["command-panel"]}>
      {/* GRID */}
      <ButtonGroup selectedIndex={0}>
        <Button tooltip="small">
          <img src="./icons/grid_small.svg" />
        </Button>
        <Button tooltip="large">
          <img src="./icons/grid_large.svg" />
        </Button>
      </ButtonGroup>

      <Separator />

      {/* VIEW */}

      {/* EDIT */}
      <ButtonGroup selectedIndex={0}>
        <Button tooltip="copy">
          <img src="./icons/copy.svg" />
        </Button>
        <Button tooltip="paste">
          <img src="./icons/paste.svg" />
        </Button>
      </ButtonGroup>

      <Separator />

      {/* CONNECTIONS */}

      {/* COMPONENTS */}
      <ButtonGroup selectedIndex={0}>
        <Button tooltip="select">
          <img src="./icons/select.svg" />
        </Button>
        <Button tooltip="move">
          <img src="./icons/move.svg" />
        </Button>
        <Button tooltip="wire">
          <img src="./icons/wire.svg" />
        </Button>
        <Button tooltip="input-pin">
          <img src="./icons/input_pin.svg" />
        </Button>
        <Button tooltip="output-pin">
          <img src="./icons/output_pin.svg" />
        </Button>
        <LogicGate uri="./icons/logic-gate.svg" label="HI" show={["#output-1"]} />
        <LogicGate uri="./icons/logic-gate.svg" label="lo" show={["#output-1"]} />
        <LogicGate uri="./icons/logic-gate.svg" label="Clock" show={["#output-1"]} />
        <LogicGate uri="./icons/logic-gate.svg" label="NOT" show={["#input-1", "#output-1"]} />
        <LogicGate uri="./icons/logic-gate.svg" label="AND" show={["#inputs-2", "#output-1"]} />
        <LogicGate uri="./icons/logic-gate.svg" label="NAND" show={["#inputs-2", "#output-1"]} />
        <LogicGate uri="./icons/logic-gate.svg" label="OR" show={["#inputs-2", "#output-1"]} />
        <LogicGate uri="./icons/logic-gate.svg" label="NOR" show={["#inputs-2", "#output-1"]} />
        <LogicGate uri="./icons/logic-gate.svg" label="LED" show={["#input-1"]} />
      </ButtonGroup>
    </div>
  );
};

export default CommandPanel;
