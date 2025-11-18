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

    getWorker: build.query({
      query: (id) => ({
        url: `workers/${id}/show`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["Detail"],
    }),

   /*  workerCreate: build.mutation({
      query: (body) => ({
        url: `workers/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["List"],
    }) */
  }),
});

export const {
  useGetWorkerQuery,
} = dashboardApiActions;
