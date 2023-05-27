import Color from 'colorjs.io';
import { v4 as uuidv4 } from 'uuid';
import {
  BoardObject,
  BoardObjectCSSClass,
  BoardObjectRenderFunction,
  BoardObjectRenderOptions,
  BoardObjectRenderOutput,
  BoardObjectSpawnOptions,
  UpdateFunction,
} from '../../types';
import { fallbackColor } from '../Slices/appSlice';
import { BoardState } from '../Slices/boardSlice';
import { addObjectToSquare, removeObjectFromSquare } from '../Slices/helpers';
import { RenderMap, UpdateMap } from './Maps';

export interface HPong extends BoardObject {
  posX: number;
  posY: number;
  tickDelay: number; // Number of ticks (global time units)
  ticksSinceUpdate: number;
  polarity: boolean;
  ghostTicks: number;
  touchdownAnimation: string;
  liftoffAnimation: string;
  ghostAnimation: string;
}

export interface HPongGhost extends BoardObject {
  posX: number;
  posY: number;
  lifespan: number;
  age: number;
  ghostAnimation: string;
}

export const createHPong = (
  ops: BoardObjectSpawnOptions,
  x: number,
  y: number,
  tickDelay: number,
  ghostTicks: number,
) => {
  const HPong: HPong = {
    id: uuidv4(),
    primary: ops.primary !== undefined ? ops.primary : fallbackColor,
    posX: x,
    posY: y,
    tickDelay: tickDelay,
    ticksSinceUpdate: 0,
    polarity: true,
    tag: 'HPong',
    ghostTicks: ghostTicks,
    touchdownAnimation: ops.touchdownAnimation !== undefined ? ops.touchdownAnimation : '',
    liftoffAnimation: ops.liftoffAnimation !== undefined ? ops.liftoffAnimation : '',
    ghostAnimation: ops.ghostAnimation !== undefined ? ops.ghostAnimation : '',
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
    ghostAnimation: source.ghostAnimation,
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

export const renderHPong: BoardObjectRenderFunction = (ops: BoardObjectRenderOptions): BoardObjectRenderOutput => {
  const hpong = ops.obj as HPong;
  const combinedColor: Color = Color.mix(ops.backgroundColor, hpong.primary) as unknown as Color;

  const cssClasses: BoardObjectCSSClass[] = [];
  if (hpong.touchdownAnimation !== '') {
    cssClasses.push({
      uid: uuidv4(),
      className: hpong.touchdownAnimation,
      duration: 800,
    });
  }

  const output: BoardObjectRenderOutput = {
    backgroundColor: combinedColor,
    cssClasses: cssClasses,
  };
  return output;
};

export const renderHPongGhost: BoardObjectRenderFunction = (ops: BoardObjectRenderOptions): BoardObjectRenderOutput => {
  const ghost = ops.obj as HPongGhost;
  const p_factor = 1 - (ghost.age + 1) / (ghost.lifespan + 2);
  const p = 0.5 * p_factor;
  const combinedColor: Color = Color.mix(ops.backgroundColor, ghost.primary, p) as unknown as Color;

  const cssClasses: BoardObjectCSSClass[] = [];
  if (ghost.ghostAnimation !== '') {
    cssClasses.push({
      uid: uuidv4(),
      className: ghost.ghostAnimation,
      duration: 800,
    });
  }

  const output: BoardObjectRenderOutput = {
    backgroundColor: combinedColor,
    cssClasses: cssClasses,
  };
  return output;
};

UpdateMap.set('HPong', advanceHPong);
UpdateMap.set('HPongGhost', advanceHPongGhost);
RenderMap.set('HPong', renderHPong);
RenderMap.set('HPongGhost', renderHPongGhost);
