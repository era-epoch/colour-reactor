import { BoardState } from './State/Slices/boardSlice';

export interface SquareState {
  content: BoardObject[];
  x: number;
  y: number;
}

export interface BoardObject {
  primary: string;
  updateF: Function;
}

export type UpdateFunction = (obj: BoardObject, state: BoardState) => void;
