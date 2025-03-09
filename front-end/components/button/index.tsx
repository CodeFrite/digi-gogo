import { useState } from "react";
import styles from "./index.module.css";

export type ButtonProps = {
  children: string | React.ReactNode;
  tooltip?: string;
  selected?: boolean; // initial state of the button
  onSelect?: (index: number) => void; // callback when the button is clicked
};

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const [selected, setSelected] = useState<boolean>(props.selected ?? false);

  return (
    <div className={props.selected ? styles["button-selected"] : styles["button-selected"]}>
      {props.children}
    </div>
  );
};

export default Button;
