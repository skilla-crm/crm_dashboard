import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const token = document.getElementById('root_dashboard')?.getAttribute('token');
const baseURL = process.env.REACT_APP_BASE_URL;

export const employeesApiActions = createApi({
    reducerPath: 'employeesApiActions',
    tagTypes: ['Employees'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? token : '',
            Accept: 'application/json',
        },
    }),
    endpoints: (build) => ({
        getEmployees: build.query({
            query: (params) => ({
                url: `dashboard/details/employees`,
                method: 'GET',
                params,
            }),
            transformResponse: (response) => response?.data,
        }),
    }),
});

export const { useGetEmployeesQuery } = employeesApiActions;
