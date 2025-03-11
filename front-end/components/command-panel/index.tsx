import React from "react";
import styles from "./index.module.css";
import SVGButton from "../svg-button";
import ButtonGroup from "../button-group";

const Separator: React.FC = () => {
  return <img className={styles["separator"]} src="./icons/separator.svg" />;
};

type CommandPanelProps = {
  visibility: boolean;
  toggleVisibility: () => void;
};

const CommandPanel: React.FC<CommandPanelProps> = (props: CommandPanelProps) => {
  const [visibility, toggleVisibility] = React.useState<boolean>(props.visibility);

  return (
    <div className={styles["command-panel"]}>
      {/* Toggle Button */}
      <div
        className={`${styles["toggle-button"]} ${props.visibility ? styles.selected : ""}`}
        onClick={props.toggleVisibility}>
        ⌘
      </div>

      {props.visibility && (
        <>
          <Separator />
          {/* GRID */}
          <ButtonGroup selectedIndex={0}>
            <SVGButton tooltip="small" uri="./icons/grid_small.svg" />
            <SVGButton tooltip="large" uri="./icons/grid_large.svg" />
          </ButtonGroup>

          <Separator />

          {/* VIEW */}

          {/* EDIT */}
          <SVGButton tooltip="copy" uri="./icons/copy.svg" />
          <SVGButton tooltip="paste" uri="./icons/paste.svg" />

          <Separator />

          {/* CONNECTIONS */}

          {/* COMPONENTS */}
          <ButtonGroup selectedIndex={0}>
            <SVGButton tooltip="select" uri="./icons/select.svg" />
            <SVGButton tooltip="move" uri="./icons/move.svg" />
            <SVGButton tooltip="wire" uri="./icons/wire.svg" />
            <SVGButton tooltip="input-pin" uri="./icons/input_pin.svg" />
            <SVGButton tooltip="output-pin" uri="./icons/output_pin.svg" />
            <SVGButton uri="./icons/logic-gate.svg" label="HI" show={["#output-1"]} />
            <SVGButton uri="./icons/logic-gate.svg" label="lo" show={["#output-1"]} />
            <SVGButton uri="./icons/logic-gate.svg" label="Clock" show={["#output-1"]} />
            <SVGButton uri="./icons/logic-gate.svg" label="NOT" show={["#input-1", "#output-1"]} />
            <SVGButton uri="./icons/logic-gate.svg" label="AND" show={["#inputs-2", "#output-1"]} />
            <SVGButton
              uri="./icons/logic-gate.svg"
              label="NAND"
              show={["#inputs-2", "#output-1"]}
            />
            <SVGButton uri="./icons/logic-gate.svg" label="OR" show={["#inputs-2", "#output-1"]} />
            <SVGButton uri="./icons/logic-gate.svg" label="NOR" show={["#inputs-2", "#output-1"]} />
            <SVGButton uri="./icons/logic-gate.svg" label="LED" show={["#input-1"]} />
          </ButtonGroup>
        </>
      )}
    </div>
  );
};

export default CommandPanel;
