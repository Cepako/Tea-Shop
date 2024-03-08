import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface filterProductState {
  collection: string;
  price: [number, number];
  size: string[];
}

const initialState: filterProductState = {
  collection: 'all',
  price: [5, 15],
  size: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    editTeasFilters: (state, action: PayloadAction<filterProductState>) => {
      return (state = action.payload);
    },
  },
});
export const { editTeasFilters } = filterSlice.actions;
export default filterSlice.reducer;
