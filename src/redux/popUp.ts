import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type payloadType = {
  name: string;
  price: string;
  code: string;
  size?: string;
  color?: string;
  product_img: string;
  quantity?: number;
};

export interface ProductState {
  name: string;
  price: string;
  code: string;
  size?: string;
  color?: string;
  product_img: string;
  quantity?: number;
}

const initialState: ProductState = {
  name: '',
  price: '',
  code: '',
  product_img: '',
  quantity: 1,
};

export const popUpSlice = createSlice({
  name: 'popUp',
  initialState,
  reducers: {
    editPopUp: (state, action: PayloadAction<payloadType>) => {
      state.name = action.payload.name;
      state.price = action.payload.price;
      state.code = action.payload.code;
      state.size = action.payload.size;
      state.color = action.payload.color;
      state.product_img = action.payload.product_img;
    },
  },
});

export const { editPopUp } = popUpSlice.actions;
export default popUpSlice.reducer;
