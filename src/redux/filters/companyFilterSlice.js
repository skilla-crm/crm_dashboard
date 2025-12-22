import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPartnerships: [],
};

const filterCompaniesSlice = createSlice({
  name: "filterCompanies",
  initialState,
  reducers: {
    setSelectedPartnerships(state, action) {
      state.selectedPartnerships = action.payload;
    },

    resetFilter: () => initialState,
  },
});

export const { setSelectedPartnerships } = filterCompaniesSlice.actions;

export default filterCompaniesSlice.reducer;
