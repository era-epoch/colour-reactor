import Color from 'colorjs.io/types/src';
import { BoardState } from './State/Slices/boardSlice';

export interface SquareState {
  content: BoardObject[];
  x: number;
  y: number;
}

export interface BoardObject {
  id: string;
  primary: string;
  tag: string;
}

export interface PositionalBoardObject extends BoardObject {
  posX: number;
  posY: number;
  ghostTicks: number;
}

export type UpdateFunction = (obj: BoardObject, state: BoardState) => void;

export interface BoardObjectRenderOptions {
  obj: BoardObject;
  backgroundColor: Color;
}

export interface BoardObjectRenderOutput {
  backgroundColor: Color;
  cssClasses: BoardObjectCSSClass[];
  rawBackgroundColor: Color;
}

export type BoardObjectRenderFunction = (ops: BoardObjectRenderOptions) => BoardObjectRenderOutput;

export interface BoardObjectCSSClass {
  uid: string;
  className: string;
  duration: number; // how long the class should stay on the square, in miliseconds
}

export type BoardObjectSpawnOptions = Partial<BoardObjectSpawnOptionsInternal>;

export interface BoardObjectSpawnOptionsInternal {
  primary: string;
  secondary: string;
  tertiary: string;
  colors: string[];
  touchdownAnimation: string;
  liftoffAnimation: string;
  ghostAnimation: string;
  ghostTicks: number;
  updateAnimation: string;
  morphCompleteAnimation: string;
  morphDelta: number;
  morphColors: string[];
  morphType: MorphType;
  lifespan: number;
  tickDelay: number;
  age: number;
  posX: number;
  posY: number;
  direction: Direction;
  compassDirection: CompassDirection;
  determination: number;
}

export enum CursorMode {
  default,
  hover,
  painting,
  morphPainting,
  erasing,
}

export enum MorphType {
  cycle,
  pingpong,
  random,
}

export enum Direction {
  left,
  right,
  pingpong_h,
  up,
  down,
  pingpong_v,
}

export enum CompassDirection {
  north,
  northeast,
  east,
  southeast,
  south,
  southwest,
  west,
  northwest,
  none,
}

export enum TooltipDirection {
  above,
  below,
  left,
  right,
}

export interface SubTooltip {
  content: string;
  target: string;
}

export interface TooltipState {
  active: boolean;
  text: string;
  direction: TooltipDirection;
  targetID: string;
  subtips?: SubTooltip[];
}

export enum Dialogue {
  none,
  epilepsyWarning,
  palette,
  savePattern,
  credits,
}

export enum Toolbar {
  none,
  stamps,
  brushes,
  objects,
  options,
  file,
  about,
}

export interface ColorScheme {
  name: string;
  colors: string[];
  id: string;
}

export enum SpawnWidget {
  none,
  wave,
  bigHLine,
  bigVLine,
  swarm,
  paint,
  morphPaint,
  mover,
  firefly,
}

export interface EraserOps {
  strength: number;
}

export type Pattern = {
  id: string;
  board: BoardState;
  name: string;
  time_created: number;
};

export enum AlertStyle {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}

export type Alert = {
  id: string;
  content: string;
  style: AlertStyle;
  additionalStyles?: string[];
};
