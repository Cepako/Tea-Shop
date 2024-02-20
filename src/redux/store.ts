import { configureStore } from '@reduxjs/toolkit';
import popUpReducer from './popUp';

export const store = configureStore({
  reducer: {
    popUp: popUpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
