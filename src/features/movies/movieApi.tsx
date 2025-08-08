import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    getTrendingMovies: builder.query<any, void>({
  query: () => `trending/movie/day?api_key=${API_KEY}`,
}),

    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${API_KEY}`,
    }),
    getMoviesByGenre: builder.query({
      query: (genreId) => `discover/movie?api_key=${API_KEY}&with_genres=${genreId}`,
    }),
    getMovieVideos: builder.query({
      query: (movieId) => `movie/${movieId}/videos?api_key=${API_KEY}`,
    }),
  }),
})

export const {
  useGetTrendingMoviesQuery,
  useGetGenresQuery,
  useGetMoviesByGenreQuery,
  useGetMovieVideosQuery,
} = movieApi
