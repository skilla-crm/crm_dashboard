import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const token = document.getElementById('root_dashboard')?.getAttribute('token');
const baseURL = process.env.REACT_APP_BASE_URL;

export const ordersApiActions = createApi({
    reducerPath: 'ordersApiActions',
    tagTypes: ['Orders'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? token : '',
            Accept: 'application/json',
        },
    }),
    endpoints: (build) => ({
        getOrders: build.query({
            query: (params) => ({
                url: `dashboard/details/orders`,
                method: 'GET',
                params,
            }),
            transformResponse: (response) => response?.data,
        }),
    }),
});

export const { useGetOrdersQuery } = ordersApiActions;
