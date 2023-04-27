import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BoardObject, SquareState } from '../../types';
import { HPong } from '../BoardObjects/HPong';
import { UpdateMap } from '../BoardObjects/Maps';
import { VPong } from '../BoardObjects/VPong';

export interface BoardState {
  squares: SquareState[][];
  objects: BoardObject[];
  cursorColour: string;
  pixelBoardHeight: number;
  pixelBoardWidth: number;
  pixelSquareSize: number;
  timeDelta: number; // # of miliseconds between updates
}

const numSquaresInColumn = 16;
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
  cursorColour: 'red',
  pixelBoardHeight: height,
  pixelBoardWidth: width,
  pixelSquareSize: squareSizePixels,
  timeDelta: 40,
};

const boardSlice = createSlice({
  name: 'board',
  initialState: initialBoardstate,
  reducers: {
    update: (state: BoardState) => {
      // console.log('Updating');
      for (const object of state.objects) {
        const updateF = UpdateMap.get(object.tag);
        if (updateF) updateF(object, state);
      }
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
      for (const obj of action.payload) {
        state.objects.push(obj);
      }
    },
  },
});

export default boardSlice.reducer;
export const { update, spawnVPong, spawnHPong, deleteAllObjects, loadObjects } = boardSlice.actions;
