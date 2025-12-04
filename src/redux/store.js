
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { dashboardApiActions } from './dashboardApiActions';
//slice
import indicatorsGridSlice from './indicatorsGrid/slice';
import dateRangeSlice from './filters/dateRangeSlice';

export const store = configureStore({
  reducer: {
    indicatorsGrid: indicatorsGridSlice,
    dateRange: dateRangeSlice,
    [dashboardApiActions.reducerPath]: dashboardApiActions.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat(dashboardApiActions.middleware)
});

setupListeners(store.dispatch);
