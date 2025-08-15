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
  const [searchTerm, setSearchTerm] = useState("")

  const { data: trendingData } = useGetTrendingMoviesQuery()
  const { data: genresData } = useGetGenresQuery(undefined)
  const { data: genreMoviesData } = useGetMoviesByGenreQuery(selectedGenre, {
    skip: !selectedGenre,
  })


  const movieList = selectedGenre
    ? genreMoviesData?.results
    : trendingData?.results

  const debouncedSearch = useDebounce(searchTerm, 300)
const filteredMovies = movieList?.filter((m:any) => m.title.toLowerCase().includes(debouncedSearch.toLowerCase()))


  return (
    <DashboardLayout>
      <ProtectedPage>
      <div className="p-6 w-full">
        <h2 className="text-3xl font-bold mb-4">🎬 Movies</h2>

        {/* Search + Genre filter */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
            />

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300"
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
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
      </ProtectedPage>
    </DashboardLayout>
  )
}
