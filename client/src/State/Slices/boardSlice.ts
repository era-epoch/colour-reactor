import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BoardObject, SquareState } from '../../types';
import { HPong } from '../BoardObjects/HPong';
import { UpdateMap } from '../BoardObjects/Maps';
import { VPong } from '../BoardObjects/VPong';

export interface BoardState {
  squares: SquareState[][];
  objects: BoardObject[];
  objectAdditionQueue: BoardObject[];
  objectRemovalQueue: BoardObject[];
  pixelBoardHeight: number;
  pixelBoardWidth: number;
  pixelSquareSize: number;
  ticksElapsed: number;
}

const numSquaresInColumn = 8;
const width = window.innerWidth;
const height = window.innerHeight;
const squareSizePixels = Math.floor(height / numSquaresInColumn);
const numSquaresInRow = Math.floor(width / squareSizePixels);
const squares: SquareState[][] = [];
for (let i = 0; i < numSquaresInColumn; i++) {
  squares.push([]);
  for (let j = 0; j < numSquaresInRow; j++) {
    squares[i].push({ content: [], y: i, x: j } as SquareState);
  }
}

const initialBoardstate: BoardState = {
  squares: squares,
  objects: [],
  objectAdditionQueue: [],
  objectRemovalQueue: [],
  pixelBoardHeight: height,
  pixelBoardWidth: width,
  pixelSquareSize: squareSizePixels,
  ticksElapsed: 0,
};

const boardSlice = createSlice({
  name: 'board',
  initialState: initialBoardstate,
  reducers: {
    update: (state: BoardState) => {
      console.log('Updating');
      for (const object of state.objects) {
        const updateF = UpdateMap.get(object.tag);
        if (updateF) updateF(object, state);
      }

      // Add all objects in addition queue
      for (const object of state.objectAdditionQueue) {
        state.objects.push(object);
      }
      state.objectAdditionQueue = [];

      // Remove all objects in removal queue
      state.objects = state.objects.filter((obj) => !state.objectRemovalQueue.includes(obj));
      state.objectRemovalQueue = [];
      state.ticksElapsed++;
    },
    spawnVPong: (state: BoardState, action: PayloadAction<{ vpong: VPong }>) => {
      console.log('Spawning VPong');
      state.objects.push(action.payload.vpong);
    },
    spawnHPong: (state: BoardState, action: PayloadAction<{ hpong: HPong }>) => {
      console.log('Spawning HPong');
      state.objects.push(action.payload.hpong);
    },
    deleteAllObjects: (state: BoardState) => {
      state.objects = [];
      for (const row of state.squares) {
        for (const square of row) {
          square.content = [];
        }
      }
    },
    loadObjects: (state: BoardState, action: PayloadAction<BoardObject[]>) => {
      console.log('loading objects');
      for (const obj of action.payload) {
        state.objects.push(obj);
      }
    },
  },
});

export default boardSlice.reducer;
export const { update, spawnVPong, spawnHPong, deleteAllObjects, loadObjects } = boardSlice.actions;
