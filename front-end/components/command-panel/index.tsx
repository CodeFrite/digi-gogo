import React from "react";
import styles from "./index.module.css";
import SVGButton from "../svg-button";
import ButtonGroup from "../button-group";
import { CommandPanelConfig, CONTROL_PANEL_COMPONENT } from "../config";

const Separator: React.FC = () => {
  return <img className={styles["separator"]} src="./icons/separator.svg" />;
};

type CommandPanelProps = {
  visibility: boolean;
  toggleVisibility: () => void;
  config: CommandPanelConfig;
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

      {/* Render the config */}
      {props.visibility &&
        props.config.map((item, index) => {
          switch (item.type) {
            case CONTROL_PANEL_COMPONENT.SPACER:
              return <Separator key={"separator-" + index} />;
            case CONTROL_PANEL_COMPONENT.BUTTON:
              return (
                <SVGButton
                  key={"svg-button-" + index}
                  action={item.props.action}
                  uri={item.props.uri}
                  label={item.props.label}
                  show={item.props.show}
                  onSelect={item.props.onSelect}
                  tooltip={item.props.tooltip}
                />
              );
            case CONTROL_PANEL_COMPONENT.BUTTON_GROUP:
              return (
                <ButtonGroup
                  key={index}
                  selectedIndex={item.selectedIndex}
                  onSelect={item.onSelect}>
                  {item.buttons.map((button, buttonIndex) => (
                    <SVGButton
                      key={buttonIndex}
                      action={button.action!}
                      uri={button.uri!}
                      label={button.label}
                      show={button.show}
                      onSelect={() => {
                        /* will be overriden by the button group */
                      }}
                      tooltip={button.tooltip}
                    />
                  ))}
                </ButtonGroup>
              );
          }
        })}
    </div>
  );
};

export default CommandPanel;
