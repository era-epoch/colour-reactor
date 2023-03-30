import { BoardState } from './State/Slices/boardSlice';

export interface SquareState {
  content: BoardObject[];
  x: number;
  y: number;
}

export interface BoardObject {
  primary: string;
  tag: string;
}

export type UpdateFunction = (obj: BoardObject, state: BoardState) => void;
