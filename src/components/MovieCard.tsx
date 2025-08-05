import { useState } from 'react'
import { useGetMovieVideosQuery } from "../features/movies/movieApi"
import { Heart, PlayCircle } from 'lucide-react' 
import { toggleFavorite } from '@/features/favorite/favoriteSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function MovieCard({ movie }:any) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites?.favorites)
const isFav = favorites?.some((fav: any) => fav.id === movie.id)
  const { data: videoData } = useGetMovieVideosQuery(movie.id)
  const trailer = videoData?.results?.find(
    (vid:any) => vid.type === 'Trailer' && vid.site === 'YouTube'
  )

  const [showTrailer, setShowTrailer] = useState(false)

  return (
    <div className="relative bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold">{movie.title}</h2>

      {/* Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        className="rounded mt-2 h-64"
      />

      <button
        onClick={() => dispatch(toggleFavorite(movie))}
      >
        <Heart fill={isFav ? 'red' : 'none'} />
      </button>

      {/* Play Button */}
      {trailer && (
        <button
          onClick={() => setShowTrailer(true)}
          className="absolute bottom-4 right-4 bg-black bg-opacity-70 p-2 rounded-full hover:bg-opacity-100 transition"
        >
          <PlayCircle className="text-white w-6 h-6" />
        </button>
      )}

      {/* Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="relative w-[90%] max-w-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
              className="w-full h-[300px] md:h-[450px] rounded"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-2 right-2 bg-white rounded-full p-1"
            >
              ❌
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
