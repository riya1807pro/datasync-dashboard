import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const socialApi = createApi({
  reducerPath: 'socialApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://my-json-server.typicode.com/typicode/demo/' }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => `posts`,
    }),
  }),
});

export const { useGetAllPostsQuery } = socialApi;

