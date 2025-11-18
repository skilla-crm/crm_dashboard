import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = document.getElementById("root_dashboard")?.getAttribute("token");
const baseURL = process.env.REACT_APP_BASE_URL;


export const dashboardApiActions = createApi({
  reducerPath: " dashboardApiActions",
  tagTypes: ["Main", "Detail"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? token : "",
      Accept: "application/json",
    },
  }),
  endpoints: (build) => ({
    getDashboard: build.query({
      query: (params) => ({
        url: `dashboard`,
        method: "GET",
        params
      }),
      transformResponse: (response) => response?.data,
      /* providesTags: ["Main"], */
    }),

   
  }),
});

export const {
  useGetDashboardQuery
} = dashboardApiActions;
