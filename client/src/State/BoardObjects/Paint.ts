import Color from 'colorjs.io';
import { v4 as uuidv4 } from 'uuid';
import {
  BoardObject,
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

export interface Paint extends BoardObject {
  id: string;
  primary: string;
  tag: string;
  posX: number;
  posY: number;
  updateAnimation: string;
  lifespan: number;
  age: number;
}

export const createPaint = (ops: BoardObjectSpawnOptions, x: number, y: number): Paint => {
  console.log('loading paint');
  const paint: Paint = {
    id: uuidv4(),
    tag: 'paint',
    primary: ops.primary !== undefined ? ops.primary : fallbackColor,
    posX: x,
    posY: y,
    updateAnimation: '',
    lifespan: Infinity,
    age: 0,
  };
  return paint;
};

export const updatePaint: UpdateFunction = (obj: BoardObject, state: BoardState) => {
  const paint = obj as Paint;
  if (paint.age === 0) {
    addObjectToSquare(paint, state.squares[paint.posY][paint.posX]);
  }
  paint.age++;
  if (paint.age > paint.lifespan) {
    removeObjectFromSquare(paint, state.squares[paint.posY][paint.posX]);
    state.objectRemovalQueue.push(paint);
  }
};

export const renderPaint: BoardObjectRenderFunction = (ops: BoardObjectRenderOptions): BoardObjectRenderOutput => {
  const paint = ops.obj as Paint;
  const combinedColor: Color = Color.mix(ops.backgroundColor, paint.primary) as unknown as Color;

  const output: BoardObjectRenderOutput = {
    backgroundColor: combinedColor,
    cssClasses: [],
  };
  return output;
};

UpdateMap.set('paint', updatePaint);
RenderMap.set('paint', renderPaint);
