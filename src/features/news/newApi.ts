import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), 
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<any, string>({
      query: (category: string) =>
       `news?category=${category || "general"}&country=us`,
    }),
  }),
});

export const { useGetTopHeadlinesQuery } = newsApi;