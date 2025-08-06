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
import { useDispatch } from "react-redux"

export default function Movies() {
    const { isSignedIn } = useUser()
  const dispatch = useDispatch()
  const [selectedGenre, setSelectedGenre] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const { data: trendingData } = useGetTrendingMoviesQuery()
  const { data: genresData } = useGetGenresQuery(undefined)
  const { data: genreMoviesData } = useGetMoviesByGenreQuery(selectedGenre, {
    skip: !selectedGenre, // only call if genre selected
  })

  const movieList = selectedGenre
    ? genreMoviesData?.results
    : trendingData?.results

  const filteredMovies = movieList?.filter((movie: any) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
    if (!isSignedIn) {
      console.log("User not sig in ")
      return
    }

 const toggleFavorite = () => {
  return {
    type: 'TOGGLE_FAVORITE',
  };
};

dispatch(toggleFavorite());


  return (
   <DashboardLayout>
     <div className="p-6 w-full">
      <h2 className="text-3xl font-bold mb-4">🎬 Movies</h2>

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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredMovies?.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
   </DashboardLayout>
  )

  }