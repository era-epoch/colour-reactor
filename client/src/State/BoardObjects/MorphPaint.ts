import Color from 'colorjs.io';
import { v4 as uuidv4 } from 'uuid';
import {
  BoardObject,
  BoardObjectRenderFunction,
  BoardObjectRenderOptions,
  BoardObjectRenderOutput,
  BoardObjectSpawnOptions,
  MorphType,
  UpdateFunction,
} from '../../types';
import { fallbackColor } from '../Slices/appSlice';
import { BoardState } from '../Slices/boardSlice';
import { addObjectToSquare, removeObjectFromSquare } from '../Slices/helpers';
import { RenderMap, UpdateMap } from './Maps';

export interface MorphPaint extends BoardObject {
  id: string;
  primary: string;
  tag: string;
  posX: number;
  posY: number;
  updateAnimation: string;
  morphCompleteAnimation: string;
  morphDelta: number;
  morphColors: string[];
  morphType: MorphType;
  lifespan: number;
  age: number;
  sourceColorIndex: number;
  targetColorIndex: number;
}

export const createMorphPaint = (ops: BoardObjectSpawnOptions): MorphPaint => {
  const morphPaint: MorphPaint = {
    id: uuidv4(),
    tag: 'morphPaint',
    primary: ops.primary !== undefined ? ops.primary : fallbackColor,
    posX: ops.posX !== undefined ? ops.posX : 0,
    posY: ops.posY !== undefined ? ops.posY : 0,
    updateAnimation: ops.updateAnimation !== undefined ? ops.updateAnimation : '',
    morphCompleteAnimation: ops.morphCompleteAnimation !== undefined ? ops.morphCompleteAnimation : '',
    morphDelta: ops.morphDelta !== undefined ? ops.morphDelta : 20,
    morphColors: ops.morphColors !== undefined ? ops.morphColors : ['black', 'white'],
    morphType: ops.morphType !== undefined ? ops.morphType : MorphType.cycle,
    lifespan: ops.lifespan !== undefined ? ops.lifespan : Infinity,
    age: ops.age !== undefined ? ops.age : 0,
    sourceColorIndex: 0,
    targetColorIndex: 1,
  };

  return morphPaint as MorphPaint;
};

export const updateMorphPaint: UpdateFunction = (obj: BoardObject, state: BoardState) => {
  const morphPaint = obj as MorphPaint;
  if (morphPaint.age !== 0) {
    removeObjectFromSquare(morphPaint, state.squares[morphPaint.posY][morphPaint.posX]);
  }

  morphPaint.age++;

  const phase = morphPaint.age % morphPaint.morphDelta;

  if (phase === 0) {
    switch (morphPaint.morphType) {
      case MorphType.cycle:
        morphPaint.sourceColorIndex = (morphPaint.sourceColorIndex + 1) % morphPaint.morphColors.length;
        morphPaint.targetColorIndex = (morphPaint.targetColorIndex + 1) % morphPaint.morphColors.length;
        break;
    }
  }

  const colorA = new Color(morphPaint.morphColors[morphPaint.sourceColorIndex]);
  const colorB = new Color(morphPaint.morphColors[morphPaint.targetColorIndex]);
  const colorRange = colorA.range(colorB, { space: 'hsl' });

  const p = phase / morphPaint.morphDelta;

  morphPaint.primary = colorRange(p).toString();
  addObjectToSquare(morphPaint, state.squares[morphPaint.posY][morphPaint.posX]);

  if (morphPaint.age > morphPaint.lifespan) {
    removeObjectFromSquare(morphPaint, state.squares[morphPaint.posY][morphPaint.posX]);
    state.objectRemovalQueue.push(morphPaint);
  }
};

export const renderMorphPaint: BoardObjectRenderFunction = (ops: BoardObjectRenderOptions): BoardObjectRenderOutput => {
  const morphPaint = ops.obj as MorphPaint;
  const combinedColor: Color = Color.mix(ops.backgroundColor, morphPaint.primary) as unknown as Color;

  const output: BoardObjectRenderOutput = {
    backgroundColor: combinedColor,
    rawBackgroundColor: new Color(morphPaint.primary),
    cssClasses: [],
  };
  return output;
};

UpdateMap.set('morphPaint', updateMorphPaint);
RenderMap.set('morphPaint', renderMorphPaint);
