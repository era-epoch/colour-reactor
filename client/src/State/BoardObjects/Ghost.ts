import Color from 'colorjs.io';
import uuid from 'react-uuid';
import {
  BoardObject,
  BoardObjectCSSClass,
  BoardObjectRenderFunction,
  BoardObjectRenderOptions,
  BoardObjectRenderOutput,
  PositionalBoardObject,
  UpdateFunction,
} from '../../types';
import { BoardState } from '../Slices/boardSlice';
import { addObjectToSquare, removeObjectFromSquare } from '../Slices/helpers';
import { RenderMap, UpdateMap } from './Maps';

export interface Ghost extends BoardObject {
  posX: number;
  posY: number;
  lifespan: number;
  age: number;
  ghostAnimation: string;
}

export const createGhost = (source: PositionalBoardObject): Ghost => {
  const ghost: Ghost = {
    id: uuid(),
    primary: source.primary,
    posX: source.posX,
    posY: source.posY,
    tag: 'Ghost',
    lifespan: source.ghostTicks !== undefined ? source.ghostTicks : 1,
    age: 1,
    ghostAnimation: 'no-animation',
  };
  return ghost;
};

export const advanceGhost: UpdateFunction = (obj: BoardObject, state: BoardState) => {
  const ghost = obj as Ghost;
  removeObjectFromSquare(ghost, state.squares[ghost.posY][ghost.posX]);
  ghost.age++;
  if (ghost.age > ghost.lifespan) {
    state.objectRemovalQueue.push(ghost);
  } else {
    addObjectToSquare(ghost, state.squares[ghost.posY][ghost.posX]);
  }
};

export const renderGhost: BoardObjectRenderFunction = (ops: BoardObjectRenderOptions): BoardObjectRenderOutput => {
  const ghost = ops.obj as Ghost;
  const p_factor = 1 - (ghost.age + 1) / (ghost.lifespan + 2);
  const p = 0.5 * p_factor;
  const combinedColor: Color = Color.mix(ops.backgroundColor, ghost.primary, p) as unknown as Color;

  const cssClasses: BoardObjectCSSClass[] = [];
  if (ghost.ghostAnimation !== '') {
    cssClasses.push({
      uid: uuid(),
      className: ghost.ghostAnimation,
      duration: 800,
    });
  }

  const output: BoardObjectRenderOutput = {
    backgroundColor: combinedColor,
    cssClasses: cssClasses,
    rawBackgroundColor: combinedColor,
  };
  return output;
};

UpdateMap.set('Ghost', advanceGhost);
RenderMap.set('Ghost', renderGhost);
