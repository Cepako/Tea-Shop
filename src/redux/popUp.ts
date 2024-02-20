import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

type payloadType = {
  name: string;
  price: string;
  code: string;
  imgUrl: string;
};

interface PopUpState {
  name: string;
  price: string;
  code: string;
  imgUrl: string;
}

const initialState: PopUpState = { name: '', price: '', code: '', imgUrl: '' };

export const popUpSlice = createSlice({
  name: 'popUp',
  initialState,
  reducers: {
    editPopUp: (state, action: PayloadAction<payloadType>) => {
      state.name = action.payload.name;
      state.price = action.payload.price;
      state.code = action.payload.code;
      state.imgUrl = action.payload.imgUrl;
    },
  },
});

export const { editPopUp } = popUpSlice.actions;
export const selectPopUp = (state: RootState) => state.popUp;
export default popUpSlice.reducer;
