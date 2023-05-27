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
import { BoardState } from '../Slices/boardSlice';
import { addObjectToSquare, removeObjectFromSquare } from '../Slices/helpers';
import { RenderMap, UpdateMap } from './Maps';

export interface VPong extends BoardObject {
  primary: string;
  posX: number;
  posY: number;
  tickDelay: number; // Number of ticks (global time units)
  ticksSinceUpdate: number;
  polarity: boolean;
  tag: string;
  ghostTicks: number;
  touchdownAnimation: string;
  liftoffAnimation: string;
  ghostAnimation: string;
}

export interface VPongGhost extends BoardObject {
  posX: number;
  posY: number;
  lifespan: number;
  age: number;
  ghostAnimation: string;
}

export const createVPong = (
  ops: BoardObjectSpawnOptions,
  x: number,
  y: number,
  tickDelay: number,
  ghostTicks: number,
) => {
  const VPong: VPong = {
    id: uuidv4(),
    primary: ops.primary as string,
    posX: x,
    posY: y,
    tickDelay: tickDelay,
    ticksSinceUpdate: 0,
    polarity: true,
    tag: 'VPong',
    ghostTicks: ghostTicks,
    touchdownAnimation: ops.touchdownAnimation !== undefined ? ops.touchdownAnimation : '',
    liftoffAnimation: ops.liftoffAnimation !== undefined ? ops.liftoffAnimation : '',
    ghostAnimation: ops.ghostAnimation !== undefined ? ops.ghostAnimation : '',
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
    ghostAnimation: source.ghostAnimation,
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

export const renderVPong: BoardObjectRenderFunction = (ops: BoardObjectRenderOptions): BoardObjectRenderOutput => {
  const vpong = ops.obj as VPong;
  const combinedColor: Color = Color.mix(ops.backgroundColor, vpong.primary) as unknown as Color;

  const cssClasses: BoardObjectCSSClass[] = [];
  if (vpong.touchdownAnimation !== '') {
    cssClasses.push({
      uid: uuidv4(),
      className: vpong.touchdownAnimation,
      duration: 800,
    });
  }

  const output: BoardObjectRenderOutput = {
    backgroundColor: combinedColor,
    cssClasses: cssClasses,
  };
  return output;
};

export const renderVPongGhost: BoardObjectRenderFunction = (ops: BoardObjectRenderOptions): BoardObjectRenderOutput => {
  const ghost = ops.obj as VPongGhost;
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

UpdateMap.set('VPong', advanceVPong);
UpdateMap.set('VPongGhost', advanceVPongGhost);
RenderMap.set('VPong', renderVPong);
RenderMap.set('VPongGhost', renderVPongGhost);
