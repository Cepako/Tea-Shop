import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface teaFilterPayload {
  collection: string;
  price: [number, number];
  size: string[];
}
interface extrasFilterPayload {
  price: [number, number];
  color: string[];
}

interface filterProductState {
  teas: { collection: string; price: [number, number]; size: string[] };
  extras: { price: [number, number]; color: string[] };
}

const initialState: filterProductState = {
  teas: { collection: 'all', price: [5, 15], size: [] },
  extras: { price: [2, 20], color: [] },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    editTeasFilters: (state, action: PayloadAction<teaFilterPayload>) => {
      state.teas.collection = action.payload.collection;
      state.teas.price = action.payload.price;
      state.teas.size = action.payload.size;
    },
    editExtrasFilters: (state, action: PayloadAction<extrasFilterPayload>) => {
      state.extras.price = action.payload.price;
      state.extras.color = action.payload.color;
    },
  },
});
export const { editTeasFilters, editExtrasFilters } = filterSlice.actions;
export default filterSlice.reducer;
