import { Tools } from "./config";

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
  type: Tools;
  position: Position;
};
