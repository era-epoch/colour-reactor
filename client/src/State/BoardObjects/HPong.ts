import { v4 as uuidv4 } from 'uuid';
import { BoardObject, UpdateFunction } from '../../types';
import { BoardState } from '../Slices/boardSlice';
import { addObjectToSquare, removeObjectFromSquare } from '../Slices/helpers';
import { UpdateMap } from './Maps';

export interface HPong extends BoardObject {
  posX: number;
  posY: number;
  tickDelay: number; // Number of ticks (global time units)
  ticksSinceUpdate: number;
  polarity: boolean;
  ghostTicks: number;
}

export interface HPongGhost extends BoardObject {
  posX: number;
  posY: number;
  lifespan: number;
  age: number;
}

export const createHPong = (primary: string, x: number, y: number, tickDelay: number, ghostTicks: number) => {
  const HPong: HPong = {
    id: uuidv4(),
    primary: primary,
    posX: x,
    posY: y,
    tickDelay: tickDelay,
    ticksSinceUpdate: 0,
    polarity: true,
    tag: 'HPong',
    ghostTicks: ghostTicks,
  };
  return HPong;
};

export const createHPongGhost = (source: HPong) => {
  const ghost: HPongGhost = {
    id: uuidv4(),
    primary: source.primary,
    posX: source.posX,
    posY: source.posY,
    tag: 'HPongGhost',
    lifespan: source.ghostTicks,
    age: 1,
  };
  return ghost;
};

export const advanceHPong: UpdateFunction = (obj: BoardObject, state: BoardState) => {
  const hpong = obj as HPong;
  hpong.ticksSinceUpdate++;
  if (hpong.ticksSinceUpdate >= hpong.tickDelay) {
    removeObjectFromSquare(hpong, state.squares[hpong.posY][hpong.posX]);
    const ghost: HPongGhost = createHPongGhost(hpong);
    addObjectToSquare(ghost, state.squares[ghost.posY][ghost.posX]);
    state.objectAdditionQueue.push(ghost);
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

export const advanceHPongGhost: UpdateFunction = (obj: BoardObject, state: BoardState) => {
  const ghost = obj as HPongGhost;
  removeObjectFromSquare(ghost, state.squares[ghost.posY][ghost.posX]);
  ghost.age++;
  if (ghost.age > ghost.lifespan) {
    state.objectRemovalQueue.push(ghost);
  } else {
    addObjectToSquare(ghost, state.squares[ghost.posY][ghost.posX]);
  }
};

UpdateMap.set('HPong', advanceHPong);
UpdateMap.set('HPongGhost', advanceHPongGhost);
