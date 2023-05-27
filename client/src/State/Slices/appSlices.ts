import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cyberpunk } from '../../ColorSchemes';
import { BoardObjectSpawnOptions } from '../../types';

export interface AppState {
  colorScheme: string[];
  opsToolbarOpen: boolean;
  brushToolbarOpen: boolean;
  stampToolbarOpen: boolean;
  bigHLineOps: BoardObjectSpawnOptions;
  bigVLineOps: BoardObjectSpawnOptions;
  waveOps: BoardObjectSpawnOptions;
  defaultColor: string;
  cursorColor: string;
  leftClickColor: string;
  rightClickColor: string;
  middleClickColor: string;
  timeDelta: number; // # of miliseconds between updates
  animations: string[];
}

const fallbackColor = 'black';

const initialAppState: AppState = {
  colorScheme: cyberpunk,
  opsToolbarOpen: false,
  brushToolbarOpen: false,
  stampToolbarOpen: false,
  bigHLineOps: { primary: fallbackColor, touchdownAnimation: 'rotate3d-x' },
  bigVLineOps: { primary: fallbackColor, touchdownAnimation: 'rotate3d-y' },
  waveOps: { primary: fallbackColor, touchdownAnimation: 'scale-down' },
  defaultColor: 'white',
  cursorColor: fallbackColor,
  leftClickColor: fallbackColor,
  rightClickColor: fallbackColor,
  middleClickColor: fallbackColor,
  timeDelta: 1000,
  animations: ['no-animation', 'rotate3d-y', 'rotate3d-x', 'tremble', 'scale-down', 'scale-up', 'spin'],
};

const ChooseRandomColorInScheme = (colorScheme: string[]): string => {
  return colorScheme[Math.floor(Math.random() * colorScheme.length)];
};

initialAppState.bigHLineOps.primary = ChooseRandomColorInScheme(initialAppState.colorScheme);
initialAppState.bigVLineOps.primary = ChooseRandomColorInScheme(initialAppState.colorScheme);
initialAppState.waveOps.primary = ChooseRandomColorInScheme(initialAppState.colorScheme);
initialAppState.cursorColor = ChooseRandomColorInScheme(initialAppState.colorScheme);
initialAppState.leftClickColor = ChooseRandomColorInScheme(initialAppState.colorScheme);
initialAppState.rightClickColor = ChooseRandomColorInScheme(initialAppState.colorScheme);
initialAppState.middleClickColor = ChooseRandomColorInScheme(initialAppState.colorScheme);

const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    setOpsToolBarOpen: (state: AppState, action: PayloadAction<boolean>) => {
      state.opsToolbarOpen = action.payload;
    },
    toggleOpsToolbar: (state: AppState) => {
      state.opsToolbarOpen = !state.opsToolbarOpen;
      if (state.opsToolbarOpen) {
        // Close all other toolbars
        state.brushToolbarOpen = false;
        state.stampToolbarOpen = false;
      }
    },
    setBrushToolBarOpen: (state: AppState, action: PayloadAction<boolean>) => {
      state.brushToolbarOpen = action.payload;
    },
    toggleBrushToolbar: (state: AppState) => {
      state.brushToolbarOpen = !state.brushToolbarOpen;
      if (state.brushToolbarOpen) {
        // Close all other toolbars
        state.opsToolbarOpen = false;
        state.stampToolbarOpen = false;
      }
    },
    setStampToolBarOpen: (state: AppState, action: PayloadAction<boolean>) => {
      state.stampToolbarOpen = action.payload;
    },
    toggleStampToolbar: (state: AppState) => {
      state.stampToolbarOpen = !state.stampToolbarOpen;
      if (state.stampToolbarOpen) {
        // Close all other toolbars
        state.opsToolbarOpen = false;
        state.brushToolbarOpen = false;
      }
    },
    setWaveOps: (state: AppState, action: PayloadAction<BoardObjectSpawnOptions>) => {
      if (action.payload.primary) {
        state.waveOps.primary = action.payload.primary;
      }
      if (action.payload.touchdownAnimation) {
        state.waveOps.touchdownAnimation = action.payload.touchdownAnimation;
      }
      if (action.payload.liftoffAnimation) {
        state.waveOps.liftoffAnimation = action.payload.liftoffAnimation;
      }
      if (action.payload.ghostAnimation) {
        state.waveOps.ghostAnimation = action.payload.ghostAnimation;
      }
      if (action.payload.secondary) {
        state.waveOps.secondary = action.payload.secondary;
      }
      if (action.payload.tertiary) {
        state.waveOps.tertiary = action.payload.tertiary;
      }
    },
    setBigHLineOps: (state: AppState, action: PayloadAction<BoardObjectSpawnOptions>) => {
      if (action.payload.primary) {
        state.bigHLineOps.primary = action.payload.primary;
      }
      if (action.payload.touchdownAnimation) {
        state.bigHLineOps.touchdownAnimation = action.payload.touchdownAnimation;
      }
      if (action.payload.liftoffAnimation) {
        state.bigHLineOps.liftoffAnimation = action.payload.liftoffAnimation;
      }
      if (action.payload.ghostAnimation) {
        state.bigHLineOps.ghostAnimation = action.payload.ghostAnimation;
      }
      if (action.payload.secondary) {
        state.bigHLineOps.secondary = action.payload.secondary;
      }
      if (action.payload.tertiary) {
        state.bigHLineOps.tertiary = action.payload.tertiary;
      }
    },
    setBigVLineOps: (state: AppState, action: PayloadAction<BoardObjectSpawnOptions>) => {
      if (action.payload.primary) {
        state.bigVLineOps.primary = action.payload.primary;
      }
      if (action.payload.touchdownAnimation) {
        state.bigVLineOps.touchdownAnimation = action.payload.touchdownAnimation;
      }
      if (action.payload.liftoffAnimation) {
        state.bigVLineOps.liftoffAnimation = action.payload.liftoffAnimation;
      }
      if (action.payload.ghostAnimation) {
        state.bigVLineOps.ghostAnimation = action.payload.ghostAnimation;
      }
      if (action.payload.secondary) {
        state.bigVLineOps.secondary = action.payload.secondary;
      }
      if (action.payload.tertiary) {
        state.bigVLineOps.tertiary = action.payload.tertiary;
      }
    },
    setCursorColor: (state: AppState, action: PayloadAction<string>) => {
      state.cursorColor = action.payload;
    },
    setLeftClickColor: (state: AppState, action: PayloadAction<string>) => {
      state.leftClickColor = action.payload;
    },
    setRightClickColor: (state: AppState, action: PayloadAction<string>) => {
      state.rightClickColor = action.payload;
    },
    setMiddleClickColor: (state: AppState, action: PayloadAction<string>) => {
      state.middleClickColor = action.payload;
    },
  },
});

export default appSlice.reducer;
export const {
  setOpsToolBarOpen,
  setBrushToolBarOpen,
  toggleBrushToolbar,
  toggleOpsToolbar,
  setStampToolBarOpen,
  toggleStampToolbar,
  setBigHLineOps,
  setWaveOps,
  setBigVLineOps,
  setCursorColor,
  setLeftClickColor,
  setMiddleClickColor,
  setRightClickColor,
} = appSlice.actions;
