import { useEffect } from "react";
import useSVG from "../../hooks/useSVG";

export type LogicGateProps = {
  uri: string;
  label?: string;
  show?: string[];
};

const LogicGate: React.FC<LogicGateProps> = (props: LogicGateProps) => {
  const { svgContent, setText, setColor, showElement, hideElement } = useSVG(props.uri);
  // on mount, change the svg text if a label is provided
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

  return <div dangerouslySetInnerHTML={{ __html: svgContent || "" }} />;
};

export default LogicGate;
