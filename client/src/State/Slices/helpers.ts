import { BoardObject, SquareState } from '../../types';

export const removeObjectFromSquare = (object: BoardObject, square: SquareState) => {
  square.content = square.content.filter((obj) => obj.id !== object.id);
};

export const addObjectToSquare = (object: BoardObject, square: SquareState) => {
  square.content.push(object);
};
