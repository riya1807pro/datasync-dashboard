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
import ProtectedPage from "@/components/ProtectedPage"

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

<<<<<<< HEAD
=======
  if (!isSignedIn) {
    return (
      <DashboardLayout>
        <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded shadow">
          Please sign in to view movies.
        </div>
      </DashboardLayout>
    )
  }
>>>>>>> 3f1c363bb1e3c0938fb63bc0fb6bee5aeca32484

  const movieList = selectedGenre
    ? genreMoviesData?.results
    : trendingData?.results

  const filteredMovies = movieList?.filter((m:any) => m.title.toLowerCase().includes(debouncedSearch.toLowerCase()))

  return (
    <DashboardLayout>
<<<<<<< HEAD
      <ProtectedPage>
      <div className="p-6 w-full">
        <h2 className="text-3xl font-bold mb-4">🎬 Movies</h2>
=======
      <div className="p-6 w-full bg-white dark:bg-gray-900 rounded shadow">
        <h2 className="text-3xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">🎬 Movies</h2>
>>>>>>> 3f1c363bb1e3c0938fb63bc0fb6bee5aeca32484

        {/* Search + Genre filter */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search movie..."
<<<<<<< HEAD
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
            />
=======
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-md border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
>>>>>>> 3f1c363bb1e3c0938fb63bc0fb6bee5aeca32484

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
      </ProtectedPage>
    </DashboardLayout>
  )
}
