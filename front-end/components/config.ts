import { ButtonProps } from "./button";

// Grid
export enum GridSpacing {
  SMALL = 25,
  LARGER = 50,
}

// Tool definition: Links a command panel icon to an action: either

export enum SelectionTools {
  SELECT = 0,
  MOVE = 1,
}

export enum ConnectionTools {
  WIRE = 10,
  BUS = 11,
  INPUT_PIN = 12,
  OUTPUT_PIN = 13,
}

export enum SourceTools {
  HI = 20,
  LO = 21,
  CLOCK = 22,
  BUTTON = 23,
  PULSE = 24,
}

export enum SinkTools {
  LED = 30,
  SEVEN_SEGMENT_DISPLAY = 31,
  OSCILLOSCOPE = 32,
}

export enum ComponentTools {
  NOT_GATE = 40,
  AND_GATE = 41,
  NAND_GATE = 42,
  OR_GATE = 43,
  NOR_GATE = 44,
  USER_DEFINED = 45,
}

export type Tools = SelectionTools | ConnectionTools | SourceTools | SinkTools | ComponentTools;

// Command Panel Config
export enum CONTROL_PANEL_COMPONENT {
  SPACER = "spacer",
  BUTTON = "button",
  BUTTON_GROUP = "button-group",
}

type Toolbox =
  | {
      type: CONTROL_PANEL_COMPONENT.SPACER;
    }
  | {
      type: CONTROL_PANEL_COMPONENT.BUTTON;
      props: ButtonProps;
    }
  | {
      type: CONTROL_PANEL_COMPONENT.BUTTON_GROUP;
      selectedIndex?: number;
      onSelect: (action: number) => void;
      buttons: Partial<ButtonProps>[]; // make the onSelect optional since it will be passed down to the children
    };

export type CommandPanelConfig = Toolbox[];
