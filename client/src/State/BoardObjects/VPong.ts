import { BoardObject, UpdateFunction } from '../../types';
import { BoardState } from '../Slices/boardSlice';
import { removeObjectFromSquare, addObjectToSquare } from '../Slices/helpers';

export interface VPong extends BoardObject {
  primary: string;
  posX: number;
  posY: number;
  tickDelay: number; // Number of ticks (global time units)
  ticksSinceUpdate: number;
  polarity: boolean;
  tag: string;
}

export const createVPong = (primary: string, x: number, y: number, tickDelay: number) => {
  const VPong: VPong = {
    primary: primary,
    posX: x,
    posY: y,
    tickDelay: tickDelay,
    ticksSinceUpdate: 0,
    polarity: true,
    tag: 'VPong',
  };
  return VPong;
};

export const advanceVPong: UpdateFunction = (obj: BoardObject, state: BoardState) => {
  const vpong = obj as VPong;
  vpong.ticksSinceUpdate++;
  if (vpong.ticksSinceUpdate >= vpong.tickDelay) {
    removeObjectFromSquare(vpong, state.squares[vpong.posY][vpong.posX]);
    if (vpong.polarity) {
      if (vpong.posY < state.squares.length - 1) {
        vpong.posY++;
      } else {
        vpong.posY--;
        vpong.polarity = !vpong.polarity;
      }
    } else {
      if (vpong.posY > 0) {
        vpong.posY--;
      } else {
        vpong.posY++;
        vpong.polarity = !vpong.polarity;
      }
    }
    vpong.ticksSinceUpdate = 0;
    addObjectToSquare(vpong, state.squares[vpong.posY][vpong.posX]);
  }
};

export const UpdateMap = new Map<string, UpdateFunction>([['VPong', advanceVPong]]);
