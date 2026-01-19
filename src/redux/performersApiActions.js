import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const token = document.getElementById('root_dashboard')?.getAttribute('token');
const baseURL = process.env.REACT_APP_BASE_URL;

export const performersApiActions = createApi({
    reducerPath: 'performersApiActions',
    tagTypes: ['Performers'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? token : '',
            Accept: 'application/json',
        },
    }),
    endpoints: (build) => ({
        getPerformers: build.query({
            query: (params) => ({
                url: `dashboard/details/performers`,
                method: 'GET',
                params,
            }),
            transformResponse: (response) => response?.data,
        }),
    }),
});

export const { useGetPerformersQuery } = performersApiActions;
