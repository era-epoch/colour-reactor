import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  toolbarOpen: boolean;
}

const initialAppState: AppState = {
  toolbarOpen: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    setToolBarOpen: (state: AppState, action: PayloadAction<boolean>) => {
      state.toolbarOpen = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { setToolBarOpen } = appSlice.actions;
