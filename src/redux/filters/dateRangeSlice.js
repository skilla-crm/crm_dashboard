import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dateStartPicker: null,
    dateEndPicker: null,
    datePeriod: 'Месяц',
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
        setDatePeriod: (state, action) => {
            state.datePeriod = action.payload;
        },
        resetDateRange: () => initialState,
    },
});

export const {
    setDateStartPicker,
    setDateEndPicker,
    setDatePeriod,
    resetDateRange,
} = dateRangeSlice.actions;

export default dateRangeSlice.reducer;
