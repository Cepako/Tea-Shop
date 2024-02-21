import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ProductState, payloadType } from './popUp';

type editPayloadType = {
  code: string;
  quantity: number;
};

const initialState: ProductState[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<payloadType>) => {
      const equalIndex = state.findIndex(
        (product) => product.code === action.payload.code
      );
      if (equalIndex !== -1) {
        return state.map((product, index) => {
          return index === equalIndex
            ? {
                ...product,
                quantity:
                  product.quantity! + action.payload.quantity! > 999
                    ? 999
                    : product.quantity! + action.payload.quantity!,
              }
            : product;
        });
      } else return (state = [...state, action.payload]);
    },
    editCart: (state, action: PayloadAction<editPayloadType>) => {
      state.map((product) => {
        if (product.code === action.payload.code) {
          product.quantity = action.payload.quantity;
        }
        return product;
      });
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      state.map((product) => {
        if (product.code === action.payload && product.quantity! < 999) {
          product.quantity!++;
        }
        return product;
      });
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      state.map((product) => {
        if (product.code === action.payload && product.quantity! > 1) {
          product.quantity!--;
        }
        return product;
      });
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      return (state = state.filter(
        (product) => product.code !== action.payload
      ));
    },
  },
});

export const {
  addToCart,
  editCart,
  decreaseQuantity,
  increaseQuantity,
  deleteFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
