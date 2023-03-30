import { BoardObject, SquareState } from '../../types';
import { VPong } from '../BoardObjects/VPong';
import { BoardState } from './boardSlice';

export const removeObjectFromSquare = (object: BoardObject, square: SquareState) => {
  square.content = square.content.filter((obj) => obj.tag !== object.tag);
};

export const addObjectToSquare = (object: BoardObject, square: SquareState) => {
  square.content.push(object);
};
