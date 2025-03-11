import { useEffect, useState } from "react";
import styles from "./index.module.css";
import useSVG from "../../hooks/useSVG";

export type ButtonProps = {
  tooltip?: string;
  selected?: boolean; // initial state of the button
  onSelect?: (index: number) => void; // callback when the button is clicked

  uri: string;
  label?: string;
  show?: string[];
};

const SVGButton: React.FC<ButtonProps> = (props: ButtonProps) => {
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
      className={props.selected ? styles["button-selected"] : styles["button"]}
      dangerouslySetInnerHTML={{ __html: svgContent || "" }}
    />
  );
};

export default SVGButton;
