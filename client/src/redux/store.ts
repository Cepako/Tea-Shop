import { configureStore } from '@reduxjs/toolkit';
import popUpReducer from './popUp';
import cartReducer from './cart';
import filterReducer from './filters';

export const store = configureStore({
  reducer: {
    popUp: popUpReducer,
    cart: cartReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
