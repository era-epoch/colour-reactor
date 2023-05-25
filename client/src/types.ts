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

export type UpdateFunction = (obj: BoardObject, state: BoardState) => void;

export interface BoardObjectRenderOptions {
  obj: BoardObject;
  backgroundColor: Color;
}

export interface BoardObjectRenderOutput {
  backgroundColor: Color;
  cssClasses: BoardObjectCSSClass[];
}

export type BoardObjectRenderFunction = (ops: BoardObjectRenderOptions) => BoardObjectRenderOutput;

export interface BoardObjectCSSClass {
  uid: string;
  className: string;
  duration: number; // how long the class should stay on the square, in miliseconds
}
