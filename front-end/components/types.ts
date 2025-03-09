export type Position = {
  x: number;
  y: number;
};

export type Dimension = {
  width: number;
  height: number;
};

export type Component = {
  id: string;
  position: Position;
};

export enum SelectionTools {
  SELECT = "select",
  DRAG = "drag",
}

export enum ConnectionTools {
  WIRE = "wire",
  BUS = "bus",
}

export enum SourceTools {
  CLOCK = "clock", // switch between low & high logic level at a given frequency
  BUTTON = "button", // set logic level to high when clicked
  PULSE = "pulse", // set logic level to high for a given duration
}

export enum SinkTools {
  LED = "led",
  SEVEN_SEGMENT_DISPLAY = "seven-segment-display",
  OSCILLOSCOPE = "oscilloscope",
}

export enum ComponentTools {
  NOT_GATE = "not-gate",
  AND_GATE = "and-gate",
  NAND_GATE = "nand-gate",
  OR_GATE = "or-gate",
  NOR_GATE = "nor-gate",
  USER_DEFINED = "user-defined",
}

export type Tools = SelectionTools | ConnectionTools | SourceTools | SinkTools | ComponentTools;
