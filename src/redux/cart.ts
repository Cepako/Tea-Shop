import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ProductState, payloadType } from './popUp';

type editPayloadType = {
  code: string;
  color?: string;
  quantity: number;
};

type editProductQuantityType = {
  code: string;
  color?: string;
};

const initialState: ProductState[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<payloadType>) => {
      const equalIndex = state.findIndex(
        (product) =>
          product.code === action.payload.code &&
          product.color === action.payload.color
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
        if (
          product.code === action.payload.code &&
          product.color === action.payload.color
        ) {
          product.quantity = action.payload.quantity;
        }
        return product;
      });
    },
    increaseQuantity: (
      state,
      action: PayloadAction<editProductQuantityType>
    ) => {
      state.map((product) => {
        if (
          product.code === action.payload.code &&
          product.color === action.payload.color &&
          product.quantity! < 999
        ) {
          product.quantity!++;
        }
        return product;
      });
    },
    decreaseQuantity: (
      state,
      action: PayloadAction<editProductQuantityType>
    ) => {
      state.map((product) => {
        if (
          product.code === action.payload.code &&
          product.color === action.payload.color &&
          product.quantity! > 1
        ) {
          product.quantity!--;
        }
        return product;
      });
    },
    deleteFromCart: (state, action: PayloadAction<editProductQuantityType>) => {
      return (state = state.filter((product) => {
        if (action.payload.color === undefined)
          return product.code !== action.payload.code;
        else
          return (
            product.color !== action.payload.color ||
            product.code !== action.payload.code
          );
      }));
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
