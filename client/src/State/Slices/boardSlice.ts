import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BoardObject, Pattern, SquareState } from '../../types';
import { UpdateMap } from '../BoardObjects/Maps';

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

      // Remove all objects in removal queue from object list
      state.objects = state.objects.filter((obj) => !state.objectRemovalQueue.some((removal) => removal.id === obj.id));

      // Also remove from board (I don't like that this is necessary)
      for (const obj of state.objectRemovalQueue) {
        const _obj = obj as any;
        if (_obj.posX !== undefined && _obj.posY !== undefined) {
          state.squares[_obj.posY][_obj.posX].content = state.squares[_obj.posY][_obj.posX].content.filter(
            (a) => a.id !== obj.id,
          );
        }
      }
      state.objectRemovalQueue = [];
      state.ticksElapsed++;
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
    eraseLocation: (state: BoardState, action: PayloadAction<{ x: number; y: number; strength: number }>) => {
      for (let i = 0; i < state.squares[action.payload.y][action.payload.x].content.length; i++) {
        const length = state.squares[action.payload.y][action.payload.x].content.length;
        const obj = state.squares[action.payload.y][action.payload.x].content[length - 1 - i];
        state.objectRemovalQueue.push(obj);
        if (i >= action.payload.strength) {
          return;
        }
      }
    },
    loadPatternNonAccumulative: (state: BoardState, action: PayloadAction<Pattern>) => {
      state.objects = [];
      for (const object of action.payload.board.objects) {
        state.objectAdditionQueue.push(object);
      }
      for (const row of state.squares) {
        for (const square of row) {
          square.content = [];
        }
      }
    },
    loadPatternAccumulative: (state: BoardState, action: PayloadAction<Pattern>) => {
      for (const object of action.payload.board.objects) {
        state.objectAdditionQueue.push(object);
      }
    },
  },
});

export default boardSlice.reducer;
export const {
  update,
  deleteAllObjects,
  loadObjects,
  eraseLocation,
  loadPatternAccumulative,
  loadPatternNonAccumulative,
} = boardSlice.actions;
