
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { dashboardApiActions } from './dashboardApiActions';
//slice
import indicatorsGridSlice from './indicatorsGrid/slice';

export const store = configureStore({
  reducer: {
    indicatorsGrid: indicatorsGridSlice,
    [dashboardApiActions.reducerPath]: dashboardApiActions.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat(dashboardApiActions.middleware)
});

setupListeners(store.dispatch);
