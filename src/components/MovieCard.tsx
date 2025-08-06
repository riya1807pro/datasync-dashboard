'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState, useRef } from 'react'
import { Heart, Volume2, VolumeX } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite } from '@/features/favorite/favoriteSlice'
import { useGetMovieVideosQuery } from '@/features/movies/movieApi'

export default function MovieCard({ movie }: any) {
  const { user, isSignedIn } = useUser()
  const dispatch = useDispatch()
  const [favorites, setFavorites] = useState<any[]>([])
  const [isFav, setIsFav] = useState(false)
  const [showTrailer, setShowTrailer] = useState(false)
  const [mute, setMute] = useState(true)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 🎥 Fetch trailer
  const { data: videosData } = useGetMovieVideosQuery(movie.id)
  const trailer = videosData?.results?.find(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
  )

  // 🎯 Fetch user favorites from Clerk
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isSignedIn || !user?.id) return
      try {
        const res = await fetch(`/api/Favourites?userId=${user.id}`)
        if (!res.ok) return
        const data = await res.json()
        setFavorites(data)
        setIsFav(data.some((fav: any) => fav.id === movie.id))
      } catch (err) {
        console.error('Failed to load favorites', err)
      }
    }
    fetchFavorites()
  }, [user?.id, isSignedIn, movie.id])

  // 💖 Handle toggle
  const handleToggleFavorite = async () => {
    if (!isSignedIn) {
      alert('Please sign in to add favorites.')
      return
    }

    const updatedFavorites = isFav
      ? favorites.filter((fav: any) => fav.id !== movie.id)
      : [...favorites, movie]

    setFavorites(updatedFavorites)
    setIsFav(!isFav)
    dispatch(toggleFavorite(movie))

    await fetch('/api/Favourites', {
      method: 'POST',
      body: JSON.stringify({ userId: user?.id, favorites: updatedFavorites }),
    })
  }

  return (
    <div
      className="relative bg-white shadow rounded p-2 w-full transition-all"
      onMouseEnter={() => {
        hoverTimeoutRef.current = setTimeout(() => {
          setShowTrailer(true)
        }, 2000) // ⏱ 2 sec delay
      }}
      onMouseLeave={() => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
        setShowTrailer(false)
      }}
    >
      {/* 🎞️ Trailer */}
      {showTrailer && trailer ? (
        <div className="relative">
          <iframe
            width="100%"
            height="250"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=${mute ? 1 : 0}`}
            title="Movie Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="rounded"
          />
          <button
            onClick={() => setMute(!mute)}
            className="absolute bottom-2 right-2 bg-black text-white p-1 rounded-full"
          >
            {mute ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      ) : (
        <img
          src={
            movie?.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : '/fallback.jpg'
          }
          alt={movie?.title || 'No title'}
          className="rounded h-64 w-full object-cover"
        />
      )}

      {/* 💖 Title + Fav */}
      <div className="mt-2 flex justify-between items-center">
        <h2 className="text-sm font-semibold">{movie.title}</h2>
        <button onClick={handleToggleFavorite}>
          <Heart
            className={`w-5 h-5 transition ${
              isFav ? 'text-red-500 fill-red-500' : 'text-gray-400'
            }`}
          />
        </button>
      </div>
    </div>
  )
}
