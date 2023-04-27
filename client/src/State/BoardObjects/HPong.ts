import { BoardObject, UpdateFunction } from '../../types';
import { BoardState } from '../Slices/boardSlice';
import { addObjectToSquare, removeObjectFromSquare } from '../Slices/helpers';
import { UpdateMap } from './Maps';

export interface HPong extends BoardObject {
  primary: string;
  posX: number;
  posY: number;
  tickDelay: number; // Number of ticks (global time units)
  ticksSinceUpdate: number;
  polarity: boolean;
  tag: string;
}

export const createHPong = (primary: string, x: number, y: number, tickDelay: number) => {
  const HPong: HPong = {
    primary: primary,
    posX: x,
    posY: y,
    tickDelay: tickDelay,
    ticksSinceUpdate: 0,
    polarity: true,
    tag: 'HPong',
  };
  return HPong;
};

export const advanceHPong: UpdateFunction = (obj: BoardObject, state: BoardState) => {
  const hpong = obj as HPong;
  hpong.ticksSinceUpdate++;
  if (hpong.ticksSinceUpdate >= hpong.tickDelay) {
    removeObjectFromSquare(hpong, state.squares[hpong.posY][hpong.posX]);
    if (hpong.polarity) {
      if (hpong.posX < state.squares[0].length - 1) {
        hpong.posX++;
      } else {
        hpong.posX--;
        hpong.polarity = !hpong.polarity;
      }
    } else {
      if (hpong.posX > 0) {
        hpong.posX--;
      } else {
        hpong.posX++;
        hpong.polarity = !hpong.polarity;
      }
    }
    hpong.ticksSinceUpdate = 0;
    addObjectToSquare(hpong, state.squares[hpong.posY][hpong.posX]);
  }
};

UpdateMap.set('HPong', advanceHPong);
