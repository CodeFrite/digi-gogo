import { cloneElement, ReactElement, useState } from "react";
import styles from "./index.module.css";
import { ButtonProps } from "../svg-button";
import { LogicGateProps } from "../logic-gate";

// static variable to ensure unique key for each button
let buttonGroupCounter = 0;

type ButtonGroupProps = {
  children: ReactElement<ButtonProps | LogicGateProps>[]; // array of buttons
  selectedIndex?: number; // index of the selected button
  onSelect: (action: number) => void; // callback when a button is clickeds
};

const ButtonGroup: React.FC<ButtonGroupProps> = (props: ButtonGroupProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(props.selectedIndex ?? 0);
  const instanceId = buttonGroupCounter++;

  return (
    <div className={styles["button-group"]}>
      {props.children.map((button, index) => {
        return cloneElement(button, {
          key: `svg-button-${instanceId}-${index}`,
          selected: selectedIndex === index,
          onSelect: (action: number) => {
            setSelectedIndex(index);
            props.onSelect(action);
          },
        });
      })}
    </div>
  );
};

export default ButtonGroup;
