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
  PositionalBoardObject,
  UpdateFunction,
} from '../../types';
import { fallbackColor } from '../Slices/appSlice';
import { BoardState } from '../Slices/boardSlice';
import { addObjectToSquare, removeObjectFromSquare } from '../Slices/helpers';
import { Ghost, createGhost } from './Ghost';
import { RenderMap, UpdateMap } from './Maps';

export interface Mover extends PositionalBoardObject {
  tickDelay: number; // Number of ticks (global time units)
  ticksSinceUpdate: number;
  ghostTicks: number;
  direction: Direction;
  polarity: boolean;
  touchdownAnimation: string;
  liftoffAnimation: string;
  ghostAnimation: string;
}

export const createMover = (ops: BoardObjectSpawnOptions): Mover => {
  console.log(ops);
  const Mover: Mover = {
    id: uuidv4(),
    primary: ops.primary !== undefined ? ops.primary : fallbackColor,
    posX: ops.posX !== undefined ? ops.posX : 0,
    posY: ops.posY !== undefined ? ops.posY : 0,
    direction: ops.direction !== undefined ? ops.direction : Direction.right,
    polarity: true,
    tickDelay: ops.tickDelay !== undefined ? ops.tickDelay : 1,
    ticksSinceUpdate: 0,
    tag: 'Mover',
    ghostTicks: ops.ghostTicks !== undefined ? ops.ghostTicks : 0,
    touchdownAnimation: ops.touchdownAnimation !== undefined ? ops.touchdownAnimation : '',
    liftoffAnimation: ops.liftoffAnimation !== undefined ? ops.liftoffAnimation : '',
    ghostAnimation: ops.ghostAnimation !== undefined ? ops.ghostAnimation : '',
  };
  return Mover;
};

export const advanceMover: UpdateFunction = (obj: BoardObject, state: BoardState) => {
  const mover = obj as Mover;
  mover.ticksSinceUpdate++;
  if (mover.ticksSinceUpdate >= mover.tickDelay) {
    removeObjectFromSquare(mover, state.squares[mover.posY][mover.posX]);

    // Spawn a ghost next tick
    const ghost: Ghost = createGhost(mover);
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
  if (mover.posY < state.squares.length - 1) {
    mover.posY++;
  } else {
    mover.posY = 0;
  }
};

const AdvanceMoverDown = (mover: Mover, state: BoardState) => {
  if (mover.posY > 0) {
    mover.posY--;
  } else {
    mover.posY = state.squares.length - 1;
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
    rawBackgroundColor: new Color(mover.primary),
  };
  return output;
};

UpdateMap.set('Mover', advanceMover);
RenderMap.set('Mover', renderMover);
