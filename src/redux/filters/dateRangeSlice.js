import { createSlice } from '@reduxjs/toolkit';

import {
    getCurrentDay,
    getWeek,
} from '../../components/filters/DateFilter/DateMenu/utils/date';

const defaultStart = getWeek();
const defaultEnd = getCurrentDay();

const initialState = {
    dateStartPicker: defaultStart,
    dateEndPicker: defaultEnd,
    datePeriod: 'Неделя',
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
