import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY as string;
const BASE_URL = 'https://newsapi.org/v2/';
const DEFAULT_COUNTRY = process.env.NEXT_PUBLIC_NEWS_API_DEFAULT_COUNTRY || 'us';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('X-Api-Key', API_KEY || '');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopHeadlines: builder.query({
      query: (category: string) => {
        let url = `top-headlines?country=${DEFAULT_COUNTRY}`;
        if (category && category !== 'all') {
          url += `&category=${category}`;
        }
        return url;
      },
    }),
  }),
});

export const { useGetTopHeadlinesQuery } = newsApi;