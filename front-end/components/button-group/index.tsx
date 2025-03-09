import { cloneElement, ReactElement, useState } from "react";
import styles from "./index.module.css";
import { ButtonProps } from "../button";
import { LogicGateProps } from "../logic-gate";

type ButtonGroupProps = {
  children: ReactElement<ButtonProps | LogicGateProps>[]; // array of buttons
  selectedIndex?: number; // index of the selected button
};

const ButtonGroup: React.FC<ButtonGroupProps> = (props: ButtonGroupProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(props.selectedIndex ?? 0);
  return (
    <div className={styles["button-group"]}>
      {props.children.map((button, index) => {
        return cloneElement(button, {
          key: "button-" + index,
          selected: selectedIndex === index,
          onSelect: () => setSelectedIndex(index),
        });
      })}
    </div>
  );
};

export default ButtonGroup;
