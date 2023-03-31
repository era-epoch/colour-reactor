import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  opsToolbarOpen: boolean;
  brushToolbarOpen: boolean;
}

const initialAppState: AppState = {
  opsToolbarOpen: false,
  brushToolbarOpen: false,
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
  },
});

export default appSlice.reducer;
export const { setOpsToolBarOpen, setBrushToolBarOpen, toggleBrushToolbar, toggleOpsToolbar } = appSlice.actions;
