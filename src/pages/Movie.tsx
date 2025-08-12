"use client"
import React, { useState } from "react"
import {
  useGetTrendingMoviesQuery,
  useGetGenresQuery,
  useGetMoviesByGenreQuery,
} from "@/features/movies/movieApi"
import MovieCard from "@/components/MovieCard"
import DashboardLayout from "@/layouts/DashboardLayout"
import { useUser } from "@clerk/nextjs"
import useDebounce from "@/components/useDebounce"

export default function Movies() {
  const { isSignedIn } = useUser()
  const [selectedGenre, setSelectedGenre] = useState("")
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const { data: trendingData } = useGetTrendingMoviesQuery()
  const { data: genresData } = useGetGenresQuery(undefined)
  const { data: genreMoviesData } = useGetMoviesByGenreQuery(selectedGenre, {
    skip: !selectedGenre,
  })

  if (!isSignedIn) {
    return (
      <DashboardLayout>
        <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded shadow">
          Please sign in to view movies.
        </div>
      </DashboardLayout>
    )
  }

  const movieList = selectedGenre
    ? genreMoviesData?.results
    : trendingData?.results

  const filteredMovies = movieList?.filter((m:any) => m.title.toLowerCase().includes(debouncedSearch.toLowerCase()))

  return (
    <DashboardLayout>
      <div className="p-6 w-full bg-white dark:bg-gray-900 rounded shadow">
        <h2 className="text-3xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">🎬 Movies</h2>

        {/* Search + Genre filter */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-md border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2 rounded-md border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Genres</option>
            {genresData?.genres?.map((genre: any) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Movie List */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredMovies?.map((movie: any) => (
            <div
              key={movie.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow border border-indigo-100 dark:border-indigo-900"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
