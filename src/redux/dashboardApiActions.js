import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const token = document.getElementById('root_dashboard')?.getAttribute('token');
const baseURL = process.env.REACT_APP_BASE_URL;

export const dashboardApiActions = createApi({
    reducerPath: 'dashboardApiActions',
    tagTypes: ['Main', 'Detail'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? token : '',
            Accept: 'application/json',
        },
    }),
    endpoints: (build) => ({
        // Финансы
        getMainDashboardFinance: build.query({
            query: (params) => ({
                url: `dashboard/main/finance`,
                method: 'GET',
                params,
            }),
            transformResponse: (response) => response?.data,
        }),

        // Заказы
        getMainDashboardOrders: build.query({
            query: (params) => ({
                url: `dashboard/main/orders`,
                method: 'GET',
                params,
            }),
            transformResponse: (response) => response?.data,
        }),

        // Контрагенты
        getMainDashboardCounterparties: build.query({
            query: (params) => ({
                url: `dashboard/main/counterparties`,
                method: 'GET',
                params,
            }),
            transformResponse: (response) => response?.data,
        }),

        // Сотрудники
        getMainDashboardEmployees: build.query({
            query: (params) => ({
                url: `dashboard/main/employees`,
                method: 'GET',
                params,
            }),
            transformResponse: (response) => response?.data,
        }),

        // Исполнители
        getMainDashboardPerformers: build.query({
            query: (params) => ({
                url: `dashboard/main/performers`,
                method: 'GET',
                params,
            }),
            transformResponse: (response) => response?.data,
        }),

        // Прогнозы
        getMainDashboardForecasts: build.query({
            query: (params) => ({
                url: `dashboard/main/forecasts`,
                method: 'GET',
                params,
            }),
            transformResponse: (response) => response?.data,
        }),
    }),
});

export const {
    useGetMainDashboardFinanceQuery,
    useGetMainDashboardOrdersQuery,
    useGetMainDashboardCounterpartiesQuery,
    useGetMainDashboardEmployeesQuery,
    useGetMainDashboardPerformersQuery,
    useGetMainDashboardForecastsQuery,
} = dashboardApiActions;
