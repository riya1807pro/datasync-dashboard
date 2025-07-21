import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY

export const movieApi = createApi({
  reducerPath:'movieApi',
  baseQuery:fetchBaseQuery({baseUrl:"https://newsapi.org/v2/"}),
  endpoints:(builder)=>({
    getTopHeadlines: builder.query({
      query: (category = 'technology') => `top-headlines?country=us&category=${category}&apiKey=${API_KEY}`,
    }),
  })

})

export const { useGetTopHeadlinesQuery } = movieApi