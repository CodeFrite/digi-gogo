import { ButtonProps } from "./svg-button";

// Grid
export enum GridSpacing {
  SMALL = 10,
  LARGER = 25,
}

// Tools

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
  CLOCK = 20, // switch between low & high logic level at a given frequency
  BUTTON = 21, // set logic level to high when clicked
  PULSE = 22, // set logic level to high for a given duration
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

export enum Tools {
  SELECT = 0,
  MOVE = 1,
  WIRE = 10,
  BUS = 11,
  INPUT_PIN = 12,
  OUTPUT_PIN = 13,
  SOURCE_HI = 20,
  SOURCE_LO = 21,
  SOURCE_CLOCK = 22,
  SOURCE_BUTTON = 23,
  SOURCE_PULSE = 24,
  SINK_LED = 30,
  SINK_SEVEN_SEGMENT_DISPLAY = 31,
  SINK_OSCILLOSCOPE = 32,
  NOT_GATE = 40,
  AND_GATE = 41,
  NAND_GATE = 42,
  OR_GATE = 43,
  NOR_GATE = 44,
  USER_DEFINED = 45,
}

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
      actionType: number; // will accept any enum type
      selectedIndex?: number;
      onSelect: (action: number) => void;
      buttons: Partial<ButtonProps>[]; // make the onSelect optional since it will be passed down to the children
    };

export type CommandPanelConfig = Toolbox[];
