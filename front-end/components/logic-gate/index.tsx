import SVGButton from "../button";
import { ComponentTools, SinkTools, SourceTools } from "../config";
import SVGImage from "../svg-image";
import { Position } from "../types";

import styles from "./index.module.css";

export type LogicGateProps = {
  id: string;
  type: SourceTools | SinkTools | ComponentTools;
  label: string;
  inputs: string[];
  outputs: string[];
  position: Position;
};

const LogicGate: React.FC<LogicGateProps> = (props: LogicGateProps) => {
  return (
    <g
      className={styles["logic-gate"]}
      transform={"translate(" + props.position.x + "," + props.position.y + ")"}>
      <SVGImage
        uri="./icons/logic-gate.svg"
        label={props.label}
        show={[...props.inputs, ...props.outputs]}
        width={100}
        height={100}
        renderAs="group"
      />
    </g>
  );
};

export default LogicGate;
