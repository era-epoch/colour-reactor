import { BoardObject, SquareState } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createVPong, VPong } from '../BoardObjects/VPong';

export interface BoardState {
  squares: SquareState[][];
  objects: BoardObject[];
  cursorColour: string;
  pixelBoardHeight: number;
  pixelBoardWidth: number;
  pixelSquareSize: number;
  timeDelta: number; // # of miliseconds between updates
}

const numSquaresInColumn = 32;
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

// const defaultCursorColour = new Color('rebeccapurple');

const initialBoardstate: BoardState = {
  squares: squares,
  objects: [],
  cursorColour: 'rebeccapurple',
  pixelBoardHeight: height,
  pixelBoardWidth: width,
  pixelSquareSize: squareSizePixels,
  timeDelta: 100,
};

const boardSlice = createSlice({
  name: 'board',
  initialState: initialBoardstate,
  reducers: {
    update: (state: BoardState) => {
      console.log('Updating');
      for (const object of state.objects) {
        object.updateF(state, object);
      }
    },
    spawnVPong: (state: BoardState, action: PayloadAction<{ x: number; y: number }>) => {
      const vpong: VPong = createVPong('red', action.payload.x, action.payload.y, 1);
      state.objects.push(vpong);
    },
  },
});

export default boardSlice.reducer;
export const { update, spawnVPong } = boardSlice.actions;
