import Color from 'colorjs.io';
import { v4 as uuidv4 } from 'uuid';
import {
  BoardObject,
  BoardObjectCSSClass,
  BoardObjectRenderFunction,
  BoardObjectRenderOptions,
  BoardObjectRenderOutput,
  BoardObjectSpawnOptions,
  Direction,
  UpdateFunction,
} from '../../types';
import { fallbackColor } from '../Slices/appSlice';
import { BoardState } from '../Slices/boardSlice';
import { addObjectToSquare, removeObjectFromSquare } from '../Slices/helpers';
import { RenderMap, UpdateMap } from './Maps';

export interface Mover extends BoardObject {
  posX: number;
  posY: number;
  tickDelay: number; // Number of ticks (global time units)
  ticksSinceUpdate: number;
  ghostTicks: number;
  direction: Direction;
  polarity: boolean;
  touchdownAnimation: string;
  liftoffAnimation: string;
  ghostAnimation: string;
}

export interface MoverGhost extends BoardObject {
  posX: number;
  posY: number;
  lifespan: number;
  age: number;
  ghostAnimation: string;
}

export const createMover = (
  ops: BoardObjectSpawnOptions,
  x: number,
  y: number,
  tickDelay: number,
  ghostTicks: number,
) => {
  const Mover: Mover = {
    id: uuidv4(),
    primary: ops.primary !== undefined ? ops.primary : fallbackColor,
    posX: x,
    posY: y,
    direction: ops.direction !== undefined ? ops.direction : Direction.right,
    polarity: true,
    tickDelay: tickDelay,
    ticksSinceUpdate: 0,
    tag: 'Mover',
    ghostTicks: ghostTicks,
    touchdownAnimation: ops.touchdownAnimation !== undefined ? ops.touchdownAnimation : '',
    liftoffAnimation: ops.liftoffAnimation !== undefined ? ops.liftoffAnimation : '',
    ghostAnimation: ops.ghostAnimation !== undefined ? ops.ghostAnimation : '',
  };
  return Mover;
};

export const createMoverGhost = (source: Mover) => {
  const ghost: MoverGhost = {
    id: uuidv4(),
    primary: source.primary,
    posX: source.posX,
    posY: source.posY,
    tag: 'MoverGhost',
    lifespan: source.ghostTicks,
    age: 1,
    ghostAnimation: source.ghostAnimation,
  };
  return ghost;
};

export const advanceMover: UpdateFunction = (obj: BoardObject, state: BoardState) => {
  const mover = obj as Mover;
  mover.ticksSinceUpdate++;
  if (mover.ticksSinceUpdate >= mover.tickDelay) {
    removeObjectFromSquare(mover, state.squares[mover.posY][mover.posX]);
    const ghost: MoverGhost = createMoverGhost(mover);

    // Spawn the ghost next tick
    addObjectToSquare(ghost, state.squares[ghost.posY][ghost.posX]);
    state.objectAdditionQueue.push(ghost);

    // Move the object
    switch (mover.direction) {
      case Direction.right:
        AdvanceMoverRight(mover, state);
        break;
      case Direction.left:
        AdvanceMoverLeft(mover, state);
        break;
      case Direction.pingpong_h:
        AdvanceMoverPingpongH(mover, state);
        break;
      case Direction.up:
        AdvanceMoverUp(mover, state);
        break;
      case Direction.down:
        AdvanceMoverDown(mover, state);
        break;
      case Direction.pingpong_v:
        AdvanceMoverPingpongV(mover, state);
        break;
    }

    mover.ticksSinceUpdate = 0;
    addObjectToSquare(mover, state.squares[mover.posY][mover.posX]);
  }
};

const AdvanceMoverRight = (mover: Mover, state: BoardState) => {
  if (mover.posX < state.squares[0].length - 1) {
    mover.posX++;
  } else {
    mover.posX = 0;
  }
};

const AdvanceMoverLeft = (mover: Mover, state: BoardState) => {
  if (mover.posX > 0) {
    mover.posX--;
  } else {
    mover.posX = state.squares[0].length - 1;
  }
};

const AdvanceMoverPingpongH = (mover: Mover, state: BoardState) => {
  if (mover.polarity) {
    if (mover.posX < state.squares[0].length - 1) {
      mover.posX++;
    } else {
      mover.posX--;
      mover.polarity = !mover.polarity;
    }
  } else {
    if (mover.posX > 0) {
      mover.posX--;
    } else {
      mover.posX++;
      mover.polarity = !mover.polarity;
    }
  }
};

const AdvanceMoverUp = (mover: Mover, state: BoardState) => {
  if (mover.posY > 0) {
    mover.posY--;
  } else {
    mover.posY = state.squares.length - 1;
  }
};

const AdvanceMoverDown = (mover: Mover, state: BoardState) => {
  if (mover.posY < state.squares.length - 1) {
    mover.posY++;
  } else {
    mover.posY = 0;
  }
};

const AdvanceMoverPingpongV = (mover: Mover, state: BoardState) => {
  if (mover.polarity) {
    if (mover.posY < state.squares.length - 1) {
      mover.posY++;
    } else {
      mover.posY--;
      mover.polarity = !mover.polarity;
    }
  } else {
    if (mover.posY > 0) {
      mover.posY--;
    } else {
      mover.posY++;
      mover.polarity = !mover.polarity;
    }
  }
};

export const advanceMoverGhost: UpdateFunction = (obj: BoardObject, state: BoardState) => {
  const ghost = obj as MoverGhost;
  removeObjectFromSquare(ghost, state.squares[ghost.posY][ghost.posX]);
  ghost.age++;
  if (ghost.age > ghost.lifespan) {
    state.objectRemovalQueue.push(ghost);
  } else {
    addObjectToSquare(ghost, state.squares[ghost.posY][ghost.posX]);
  }
};

export const renderMover: BoardObjectRenderFunction = (ops: BoardObjectRenderOptions): BoardObjectRenderOutput => {
  const mover = ops.obj as Mover;
  const combinedColor: Color = Color.mix(ops.backgroundColor, mover.primary) as unknown as Color;

  const cssClasses: BoardObjectCSSClass[] = [];
  if (mover.touchdownAnimation !== '') {
    cssClasses.push({
      uid: uuidv4(),
      className: mover.touchdownAnimation,
      duration: 800,
    });
  }

  const output: BoardObjectRenderOutput = {
    backgroundColor: combinedColor,
    cssClasses: cssClasses,
  };
  return output;
};

export const renderMoverGhost: BoardObjectRenderFunction = (ops: BoardObjectRenderOptions): BoardObjectRenderOutput => {
  const ghost = ops.obj as MoverGhost;
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

UpdateMap.set('Mover', advanceMover);
UpdateMap.set('MoverGhost', advanceMoverGhost);
RenderMap.set('Mover', renderMover);
RenderMap.set('MoverGhost', renderMoverGhost);
