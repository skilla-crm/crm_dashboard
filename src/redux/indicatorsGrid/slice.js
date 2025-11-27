import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  financeGrid: [
    { indicator: 'table', type_block: 1 }, 
    { indicator: 'orders', type_block: 3 },
    { indicator: 'orders', type_block: 3 },
    { indicator: 'orders', type_block: 3 },
     { indicator: 'orders', type_block: 3 },
     { indicator: 'orders', type_block: 3 },
     { indicator: 'orders', type_block: 3 }, 
    { indicator: 'orders', type_block: 3 },
    { indicator: 'lost_revenue', type_block: 3 },
    { indicator: 'orders', type_block: 3 },
     { indicator: 'orders', type_block: 3 },
     { indicator: 'orders', type_block: 3 },
     { indicator: 'lost_revenue', type_block: 3 },
     { indicator: 'orders', type_block: 3 },
     { indicator: 'orders', type_block: 3 }, 
    { indicator: 'orders', type_block: 3 },
    { indicator: 'lost_revenue', type_block: 3 },
    { indicator: 'transaction', type_block: 2 },
    { indicator: 'transaction', type_block: 2, increaseView: true, info: 'sdfsdfsd', reverse: true },
  ]
};

export const indicatorsGridSlice = createSlice({
  name: "indicatorsGrid",
  initialState,
  reducers: {
    setFinanceGrid: (state, action) => {
      state.id = action.payload;
    }
  },
});

export const {
  setFinanceGrid
} = indicatorsGridSlice.actions;

export default indicatorsGridSlice.reducer;
