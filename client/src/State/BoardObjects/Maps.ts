import { BoardObjectRenderFunction, UpdateFunction } from '../../types';

export const UpdateMap = new Map<string, UpdateFunction>();
export const RenderMap = new Map<string, BoardObjectRenderFunction>();
