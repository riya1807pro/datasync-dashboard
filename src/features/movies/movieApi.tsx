// src/features/movies/movieApi.ts
import { MovieApiResponse } from '@/types/movieType';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    getTrendingMovies: builder.query<MovieApiResponse,void>({
      query: () => `trending/movie/day?api_key=${API_KEY}`,
    }),
  }),
});

export const { useGetTrendingMoviesQuery } = movieApi;
