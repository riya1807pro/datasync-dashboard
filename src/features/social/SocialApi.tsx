import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = process.env.NEXT_PUBLIC_SOCIAL_API_KEY

export const socialApi = createApi({
  reducerPath:'socialApi',
  baseQuery:fetchBaseQuery({baseUrl:"https://newsapi.org/v2/"}),
  endpoints:(builder)=>({
    getTopHeadlines: builder.query({
      query: (category = 'technology') => `top-headlines?country=us&category=${category}&apiKey=${API_KEY}`,
    }),
  })

})

export const { useGetTopHeadlinesQuery } = socialApi