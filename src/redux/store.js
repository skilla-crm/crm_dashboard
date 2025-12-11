import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { dashboardApiActions } from './dashboardApiActions';
import { financeApiActions } from './financeApiActions';
import { ordersApiActions } from './ordersApiActions';
//slice
import indicatorsGridSlice from './indicatorsGrid/slice';
import dateRangeSlice from './filters/dateRangeSlice';
import modalReducer from './modalManager/modalSlice';

export const store = configureStore({
    reducer: {
        indicatorsGrid: indicatorsGridSlice,
        dateRange: dateRangeSlice,
        modal: modalReducer,
        [dashboardApiActions.reducerPath]: dashboardApiActions.reducer,
        [financeApiActions.reducerPath]: financeApiActions.reducer,
        [ordersApiActions.reducerPath]: ordersApiActions.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(
            dashboardApiActions.middleware,
            financeApiActions.middleware,
            ordersApiActions.middleware
        ),
});

setupListeners(store.dispatch);
