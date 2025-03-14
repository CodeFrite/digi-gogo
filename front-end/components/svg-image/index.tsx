import { useEffect, useState } from "react";
import styles from "./index.module.css";
import useSVG from "../../hooks/useSVG";

export type SVGImageProps = {
  width?: number;
  height?: number;
  uri: string;
  label?: string;
  show?: string[];
  renderAs: "svg" | "group";
};

const SVGImage: React.FC<SVGImageProps> = (props: SVGImageProps) => {
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

  if (props.renderAs === "svg") {
    return (
      <svg
        className={styles.svg}
        dangerouslySetInnerHTML={{ __html: svgContent || "" }}
        width={props.width}
        height={props.height}
      />
    );
  } else {
    return (
      <g
        className={styles.svg}
        dangerouslySetInnerHTML={{ __html: svgContent || "" }}
        width={props.width}
        height={props.height}
      />
    );
  }
};

export default SVGImage;
