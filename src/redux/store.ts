import { configureStore } from '@reduxjs/toolkit';
import popUpReducer from './popUp';
import cartReducer from './cart';

export const store = configureStore({
  reducer: {
    popUp: popUpReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
