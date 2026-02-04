import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPartnerships: JSON.parse(localStorage.getItem('filterCompanys')) || [],
  companiesList: [],
  isLoadingCompanies: false,
};

const filterCompaniesSlice = createSlice({
  name: "filterCompanies",
  initialState,
  reducers: {
    setSelectedPartnerships(state, action) {
      state.selectedPartnerships = action.payload;
    },

    setCompaniesList(state, action) {
      state.companiesList = action.payload;
    },

    setLoadingCompanies(state, action) {
      state.isLoadingCompanies = action.payload;
    },

    resetFilter: () => initialState,
  },
});

export const { setSelectedPartnerships, setCompaniesList, setLoadingCompanies } = filterCompaniesSlice.actions;

export default filterCompaniesSlice.reducer;
