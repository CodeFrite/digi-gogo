import { useEffect, useState } from "react";
import styles from "./index.module.css";
import useSVG from "../../hooks/useSVG";
import SVGImage from "../svg-image";

export type ButtonProps = {
  action: number;
  selected?: boolean; // initial state of the button
  onSelect: (action: number) => void; // callback when the button is clicked

  uri: string;
  label?: string;
  show?: string[];

  tooltip?: string;
};

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const [selected, setSelected] = useState<boolean>(props.selected ?? false);
  const { svgContent, setText, setColor, showElement, hideElement } = useSVG(props.uri);

  useEffect(() => {
    if (props.label) {
      setText("#label", props.label);
    }
    if (props.show) {
      props.show.forEach((selector) => {
        showElement(selector);
      });
    }
  }, [props.label, svgContent]);

  return (
    <div
      className={selected ? styles["button-selected"] : styles["button"]}
      onClick={() => {
        props.onSelect(props.action);
      }}>
      <SVGImage
        uri={props.uri}
        label={props.label}
        show={props.show}
        width={64}
        height={64}
        renderAs="svg"
      />
    </div>
  );
};

export default Button;
