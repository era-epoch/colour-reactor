import { v4 as uuidv4 } from 'uuid';
import { BoardObject, UpdateFunction } from '../../types';
import { BoardState } from '../Slices/boardSlice';
import { addObjectToSquare, removeObjectFromSquare } from '../Slices/helpers';
import { UpdateMap } from './Maps';

export interface VPong extends BoardObject {
  primary: string;
  posX: number;
  posY: number;
  tickDelay: number; // Number of ticks (global time units)
  ticksSinceUpdate: number;
  polarity: boolean;
  tag: string;
  ghostTicks: number;
}

export interface VPongGhost extends BoardObject {
  posX: number;
  posY: number;
  lifespan: number;
  age: number;
}

export const createVPong = (primary: string, x: number, y: number, tickDelay: number, ghostTicks: number) => {
  const VPong: VPong = {
    id: uuidv4(),
    primary: primary,
    posX: x,
    posY: y,
    tickDelay: tickDelay,
    ticksSinceUpdate: 0,
    polarity: true,
    tag: 'VPong',
    ghostTicks: ghostTicks,
  };
  return VPong;
};

export const createVPongGhost = (source: VPong) => {
  const ghost: VPongGhost = {
    id: uuidv4(),
    primary: source.primary,
    posX: source.posX,
    posY: source.posY,
    tag: 'VPongGhost',
    lifespan: source.ghostTicks,
    age: 1,
  };
  return ghost;
};

export const advanceVPong: UpdateFunction = (obj: BoardObject, state: BoardState) => {
  const vpong = obj as VPong;
  vpong.ticksSinceUpdate++;
  if (vpong.ticksSinceUpdate >= vpong.tickDelay) {
    removeObjectFromSquare(vpong, state.squares[vpong.posY][vpong.posX]);
    const ghost: VPongGhost = createVPongGhost(vpong);
    addObjectToSquare(ghost, state.squares[ghost.posY][ghost.posX]);
    state.objectAdditionQueue.push(ghost);
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

export const advanceVPongGhost: UpdateFunction = (obj: BoardObject, state: BoardState) => {
  const ghost = obj as VPongGhost;
  removeObjectFromSquare(ghost, state.squares[ghost.posY][ghost.posX]);
  ghost.age++;
  if (ghost.age > ghost.lifespan) {
    state.objectRemovalQueue.push(ghost);
  } else {
    addObjectToSquare(ghost, state.squares[ghost.posY][ghost.posX]);
  }
};

UpdateMap.set('VPong', advanceVPong);
UpdateMap.set('VPongGhost', advanceVPongGhost);
