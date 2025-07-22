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
   getMovieVideos: builder.query({
  query: (movieId) => `/movie/${movieId}/videos?api_key=${API_KEY}`,
}),
    getGenres: builder.query({
  query: () => `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
}),
getMoviesByGenre: builder.query({
  query: (genreId) =>
    `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${API_KEY}`,
}),
  }),
});

export const {
  useGetTrendingMoviesQuery,
  useGetGenresQuery,
  useGetMoviesByGenreQuery,
  useGetMovieVideosQuery
} = movieApi;