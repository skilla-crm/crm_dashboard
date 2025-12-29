import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { dashboardApiActions } from "./dashboardApiActions";
import { financeApiActions } from "./financeApiActions";
import { counterpartiesApiActions } from "./counterpartiesApiActions";
import { ordersApiActions } from "./ordersApiActions";
import { employeesApiActions } from "./employeesApiActions";
import { filtersApiActions } from "./companiesForFilterApiActions";
//slice
import indicatorsGridSlice from "./indicatorsGrid/slice";
import dateRangeSlice from "./filters/dateRangeSlice";
import filterCompaniesSlice from "./filters/companyFilterSlice";
import modalReducer from "./modalManager/modalSlice";

export const store = configureStore({
  reducer: {
    indicatorsGrid: indicatorsGridSlice,
    dateRange: dateRangeSlice,
    companies: filterCompaniesSlice,
    modal: modalReducer,

    [dashboardApiActions.reducerPath]: dashboardApiActions.reducer,
    [financeApiActions.reducerPath]: financeApiActions.reducer,
    [counterpartiesApiActions.reducerPath]: counterpartiesApiActions.reducer,
    [ordersApiActions.reducerPath]: ordersApiActions.reducer,
    [employeesApiActions.reducerPath]: employeesApiActions.reducer,
    [filtersApiActions.reducerPath]: filtersApiActions.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      dashboardApiActions.middleware,
      financeApiActions.middleware,
      counterpartiesApiActions.middleware,
      ordersApiActions.middleware,
      employeesApiActions.middleware,
      filtersApiActions.middleware
    ),
});

setupListeners(store.dispatch);
