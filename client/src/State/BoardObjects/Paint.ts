import { BoardObject } from '../../types';

export interface Paint extends BoardObject {
  posX: number;
  posY: number;
  updateAnimation: string;
}
