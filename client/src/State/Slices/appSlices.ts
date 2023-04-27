import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  colorScheme: string[];
  opsToolbarOpen: boolean;
  brushToolbarOpen: boolean;
  bigHLineColor: string;
  bigVLineColor: string;
  waveColor: string;
  defaultColor: string;
}

const initialAppState: AppState = {
  colorScheme: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
  opsToolbarOpen: false,
  brushToolbarOpen: false,
  bigHLineColor: 'red',
  bigVLineColor: 'indigo',
  waveColor: 'blue',
  defaultColor: 'white',
};

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
  },
});

export default appSlice.reducer;
export const {
  setOpsToolBarOpen,
  setBrushToolBarOpen,
  toggleBrushToolbar,
  toggleOpsToolbar,
  setBigHLineColor,
  setWaveColor,
  setBigVLineColor,
} = appSlice.actions;
