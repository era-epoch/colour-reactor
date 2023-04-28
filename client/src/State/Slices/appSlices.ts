import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pastelRainbow } from '../../ColorSchemes';

export interface AppState {
  colorScheme: string[];
  opsToolbarOpen: boolean;
  brushToolbarOpen: boolean;
  stampToolbarOpen: boolean;
  bigHLineColor: string;
  bigVLineColor: string;
  waveColor: string;
  defaultColor: string;
  cursorColor: string;
  leftClickColor: string;
  rightClickColor: string;
  middleClickColor: string;
  defaultFadeTime: number; // # of miliseconds it takes for objects to fade (css transition duration)
  timeDelta: number; // # of miliseconds between updates
}

const fallbackColor = 'black';

const initialAppState: AppState = {
  colorScheme: pastelRainbow,
  opsToolbarOpen: false,
  brushToolbarOpen: false,
  stampToolbarOpen: false,
  bigHLineColor: fallbackColor,
  bigVLineColor: fallbackColor,
  waveColor: fallbackColor,
  defaultColor: 'white',
  cursorColor: fallbackColor,
  leftClickColor: fallbackColor,
  rightClickColor: fallbackColor,
  middleClickColor: fallbackColor,
  defaultFadeTime: 2000,
  timeDelta: 100,
};

const ChooseRandomColorInScheme = (colorScheme: string[]): string => {
  return colorScheme[Math.floor(Math.random() * colorScheme.length)];
};

initialAppState.bigHLineColor = ChooseRandomColorInScheme(initialAppState.colorScheme);
initialAppState.bigVLineColor = ChooseRandomColorInScheme(initialAppState.colorScheme);
initialAppState.waveColor = ChooseRandomColorInScheme(initialAppState.colorScheme);
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
    setWaveColor: (state: AppState, action: PayloadAction<string>) => {
      state.waveColor = action.payload;
    },
    setBigHLineColor: (state: AppState, action: PayloadAction<string>) => {
      state.bigHLineColor = action.payload;
    },
    setBigVLineColor: (state: AppState, action: PayloadAction<string>) => {
      state.bigVLineColor = action.payload;
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
  setBigHLineColor,
  setWaveColor,
  setBigVLineColor,
  setCursorColor,
  setLeftClickColor,
  setMiddleClickColor,
  setRightClickColor,
} = appSlice.actions;
