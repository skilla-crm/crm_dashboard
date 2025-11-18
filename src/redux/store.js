
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { dashboardApiActions } from './dashboardApiActions';
//slice

export const store = configureStore({
  reducer: {
    [dashboardApiActions.reducerPath]: dashboardApiActions.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat(dashboardApiActions.middleware)
});

setupListeners(store.dispatch);
