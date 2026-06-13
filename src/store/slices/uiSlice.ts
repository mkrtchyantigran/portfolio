import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
  /** Active project category filter ("all" or a category id). */
  activeCategory: string;
}

const initialState: UiState = {
  activeCategory: 'all',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.activeCategory = action.payload;
    },
  },
});

export const { setCategory } = uiSlice.actions;

export default uiSlice.reducer;
