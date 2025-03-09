type Position = {
  x: number;
  y: number;
};

type Dimension = {
  width: number;
  height: number;
};

type Component = {
  id: string;
  position: Position;
};

enum SelectionTools {
  SELECT = "select",
  DRAG = "drag",
}

enum ConnectionTools {
  WIRE = "wire",
  BUS = "bus",
}

enum SourceTools {
  CLOCK = "clock", // switch between low & high logic level at a given frequency
  BUTTON = "button", // set logic level to high when clicked
  PULSE = "pulse", // set logic level to high for a given duration
}

enum SinkTools {
  LED = "led",
  SEVEN_SEGMENT_DISPLAY = "seven-segment-display",
  OSCILLOSCOPE = "oscilloscope",
}

enum ComponentTools {
  NOT_GATE = "not-gate",
  AND_GATE = "and-gate",
  NAND_GATE = "nand-gate",
  OR_GATE = "or-gate",
  NOR_GATE = "nor-gate",
  USER_DEFINED = "user-defined",
}

type Tools = SelectionTools | ConnectionTools | SourceTools | SinkTools | ComponentTools;
