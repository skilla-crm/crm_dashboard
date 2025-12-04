import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dateStartPicker: null,
  dateEndPicker: null,
};

export const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState,
  reducers: {
    setDateStartPicker: (state, action) => {
      state.dateStartPicker = action.payload;
    },
    setDateEndPicker: (state, action) => {
      state.dateEndPicker = action.payload;
    },
  },
});

export const { setDateStartPicker, setDateEndPicker } = dateRangeSlice.actions;

export default dateRangeSlice.reducer;

