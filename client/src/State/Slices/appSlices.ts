import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  colorScheme: string[];
  opsToolbarOpen: boolean;
  brushToolbarOpen: boolean;
  bigHLineColor: string;
  waveColor: string;
}

const initialAppState: AppState = {
  colorScheme: ['rebeccapurple', '#93E9BE', '#FAFA33', '#FF007F'],
  opsToolbarOpen: false,
  brushToolbarOpen: false,
  bigHLineColor: '#93E9BE',
  waveColor: '#FF007F',
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
} = appSlice.actions;
