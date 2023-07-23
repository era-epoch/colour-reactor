import Color from 'colorjs.io';
import uuid from 'react-uuid';
import {
  BoardObject,
  BoardObjectCSSClass,
  BoardObjectRenderFunction,
  BoardObjectRenderOptions,
  BoardObjectRenderOutput,
  BoardObjectSpawnOptions,
  CompassDirection,
  PositionalBoardObject,
  SquareState,
  UpdateFunction,
} from '../../types';
import { fallbackColor } from '../Slices/appSlice';
import { BoardState } from '../Slices/boardSlice';
import { addObjectToSquare, removeObjectFromSquare } from '../Slices/helpers';
import { Ghost, createGhost } from './Ghost';
import { RenderMap, UpdateMap } from './Maps';

export interface Firefly extends PositionalBoardObject {
  tickDelay: number; // Number of ticks (global time units) between movements
  ticksSinceUpdate: number;
  touchdownAnimation: string;
  direction: CompassDirection;
  determination: number;
  ghostTicks: number;
  // ^ Tendency for the firefly to advance in its current direction.
  // 0 = All directions equally likly. 1 = Will maintain direction until unable to
}

export const createFirefly = (ops: BoardObjectSpawnOptions): Firefly => {
  const Firefly: Firefly = {
    id: uuid(),
    primary: ops.primary !== undefined ? ops.primary : fallbackColor,
    tag: 'Firefly',
    posX: ops.posX !== undefined ? ops.posX : 0,
    posY: ops.posY !== undefined ? ops.posY : 0,
    tickDelay: ops.tickDelay !== undefined ? ops.tickDelay : 1,
    ghostTicks: ops.ghostTicks !== undefined ? ops.ghostTicks : 0,
    ticksSinceUpdate: 0,
    touchdownAnimation: ops.touchdownAnimation !== undefined ? ops.touchdownAnimation : '',
    direction: ops.compassDirection !== undefined ? ops.compassDirection : CompassDirection.north,
    determination: ops.determination !== undefined ? ops.determination : 0.5,
  };
  return Firefly;
};

export const advanceFirefly: UpdateFunction = (obj: BoardObject, state: BoardState) => {
  const firefly = obj as Firefly;
  firefly.ticksSinceUpdate++;
  if (firefly.ticksSinceUpdate >= firefly.tickDelay) {
    firefly.ticksSinceUpdate = 0;
    removeObjectFromSquare(firefly, state.squares[firefly.posY][firefly.posX]);

    // Spawn a ghost next tick
    if (firefly.ghostTicks > 0) {
      const ghost: Ghost = createGhost(firefly);
      addObjectToSquare(ghost, state.squares[ghost.posY][ghost.posX]);
      state.objectAdditionQueue.push(ghost);
    }

    // Probability weights for each compass direction (center = stationary)
    let weights = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const directions = [
      [CompassDirection.northwest, CompassDirection.north, CompassDirection.northeast],
      [CompassDirection.west, CompassDirection.none, CompassDirection.east],
      [CompassDirection.southwest, CompassDirection.south, CompassDirection.southeast],
    ];
    switch (firefly.direction) {
      case CompassDirection.north:
        weights[0] = [1 * (1 - firefly.determination), 1, 1 * (1 - firefly.determination)];
        weights[1] = [0, 1 * (1 - firefly.determination), 0];
        weights[2] = [0, 0, 0];
        break;
      case CompassDirection.northeast:
        weights[0] = [0, 1 * (1 - firefly.determination), 1];
        weights[1] = [0, 1 * (1 - firefly.determination), 1 * (1 - firefly.determination)];
        weights[2] = [0, 0, 0];
        break;
      case CompassDirection.east:
        weights[0] = [0, 0, 1 * (1 - firefly.determination)];
        weights[1] = [0, 1 * (1 - firefly.determination), 1];
        weights[2] = [0, 0, 1 * (1 - firefly.determination)];
        break;
      case CompassDirection.southeast:
        weights[0] = [0, 0, 0];
        weights[1] = [0, 1 * (1 - firefly.determination), 1 * (1 - firefly.determination)];
        weights[2] = [0, 1 * (1 - firefly.determination), 1];
        break;
      case CompassDirection.south:
        weights[0] = [0, 0, 0];
        weights[1] = [0, 1 * (1 - firefly.determination), 0];
        weights[2] = [1 * (1 - firefly.determination), 1, 1 * (1 - firefly.determination)];
        break;
      case CompassDirection.southwest:
        weights[0] = [0, 0, 0];
        weights[1] = [1 * (1 - firefly.determination), 1 * (1 - firefly.determination), 0];
        weights[2] = [1, 1 * (1 - firefly.determination), 0];
        break;
      case CompassDirection.west:
        weights[0] = [1 * (1 - firefly.determination), 0, 0];
        weights[1] = [1, 1 * (1 - firefly.determination), 0];
        weights[2] = [1 * (1 - firefly.determination), 0, 0];
        break;
      case CompassDirection.northwest:
        weights[0] = [1, 1 * (1 - firefly.determination), 0];
        weights[1] = [1 * (1 - firefly.determination), 1 * (1 - firefly.determination), 0];
        weights[2] = [0, 0, 0];
        break;
    }

    // Take current position into account (don't try to move off the board)
    weights = DontMoveOffTheBoard(weights, firefly, state.squares);

    // Normalize weights
    const normalized_weights: number[][] = Normalize2DArray(weights);

    // Move in the target direction
    const targetDirection = sampleDirection(normalized_weights, directions);
    let movingFlag = true;
    switch (targetDirection) {
      case CompassDirection.none:
        movingFlag = false;
        break;
      case CompassDirection.north:
        firefly.posY--;
        break;
      case CompassDirection.northeast:
        firefly.posX++;
        firefly.posY--;
        break;
      case CompassDirection.east:
        firefly.posX++;
        break;
      case CompassDirection.southeast:
        firefly.posX++;
        firefly.posY++;
        break;
      case CompassDirection.south:
        firefly.posY++;
        break;
      case CompassDirection.southwest:
        firefly.posY++;
        firefly.posX--;
        break;
      case CompassDirection.west:
        firefly.posX--;
        break;
      case CompassDirection.northwest:
        firefly.posX--;
        firefly.posY--;
        break;
    }
    if (movingFlag) firefly.direction = targetDirection;
    addObjectToSquare(firefly, state.squares[firefly.posY][firefly.posX]);
  }
};

const Normalize2DArray = (weights: number[][]): number[][] => {
  const normalized_weights: number[][] = [];
  let weights_sum = 0;
  for (const arr of weights) {
    for (const weight of arr) {
      weights_sum += weight;
    }
  }
  let i = 0;
  for (const arr of weights) {
    normalized_weights.push([]);
    for (const weight of arr) {
      normalized_weights[i].push(weight / weights_sum);
    }
    i++;
  }
  return normalized_weights;
};

const DontMoveOffTheBoard = (weights: number[][], obj: PositionalBoardObject, squares: SquareState[][]): number[][] => {
  // Addition Phase

  if (obj.posX <= 0) {
    // Leftmost position
    weights[0][2] = 1;
    weights[1][2] = 1;
    weights[2][2] = 1;
  }
  if (obj.posX >= squares[0].length - 1) {
    // Rightmost position
    weights[0][0] = 1;
    weights[1][0] = 1;
    weights[2][0] = 1;
  }
  if (obj.posY <= 0) {
    // Topmost position
    weights[2][0] = 1;
    weights[2][1] = 1;
    weights[2][2] = 1;
  }
  if (obj.posY >= squares.length - 1) {
    // Bottommost position
    weights[0][0] = 1;
    weights[0][1] = 1;
    weights[0][2] = 1;
  }

  // Subtraction Phase

  if (obj.posX <= 0) {
    // Leftmost position
    weights[0][0] = 0;
    weights[1][0] = 0;
    weights[2][0] = 0;
  }
  if (obj.posX >= squares[0].length - 1) {
    // Rightmost position
    weights[0][2] = 0;
    weights[1][2] = 0;
    weights[2][2] = 0;
  }
  if (obj.posY <= 0) {
    // Topmost position
    weights[0][0] = 0;
    weights[0][1] = 0;
    weights[0][2] = 0;
  }
  if (obj.posY >= squares.length - 1) {
    // Bottommost position
    weights[2][0] = 0;
    weights[2][1] = 0;
    weights[2][2] = 0;
  }
  return weights;
};

const sampleDirection = (normalized_weights: number[][], directions: CompassDirection[][]): CompassDirection => {
  const r = Math.random();
  let sum = 0;
  for (let i = 0; i < normalized_weights.length; i++) {
    for (let j = 0; j < normalized_weights[i].length; j++) {
      sum += normalized_weights[i][j];
      if (r <= sum) {
        return directions[i][j];
      }
    }
  }
  return CompassDirection.none;
};

const renderFireFly: BoardObjectRenderFunction = (ops: BoardObjectRenderOptions): BoardObjectRenderOutput => {
  const firely = ops.obj as Firefly;
  const combinedColor: Color = Color.mix(ops.backgroundColor, firely.primary) as unknown as Color;

  const cssClasses: BoardObjectCSSClass[] = [];
  if (firely.touchdownAnimation !== '') {
    cssClasses.push({
      uid: uuid(),
      className: firely.touchdownAnimation,
      duration: 800,
    });
  }

  const output: BoardObjectRenderOutput = {
    backgroundColor: combinedColor,
    cssClasses: cssClasses,
    rawBackgroundColor: new Color(firely.primary),
  };
  return output;
};

UpdateMap.set('Firefly', advanceFirefly);
RenderMap.set('Firefly', renderFireFly);
