// src/components/MovieCard.tsx
'use client'
import { useUser } from '@clerk/nextjs'
import { useEffect, useRef, useState } from 'react'
import { Heart, Volume2, VolumeX } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { toggleFavorite } from '@/features/favorite/favoriteSlice'
import { useGetMovieVideosQuery } from '@/features/movies/movieApi'
import { getUserLocalFavorites, setUserLocalFavorites } from '@/utils/userFavorites'

type Props = { movie: any }

export default function MovieCard({ movie }: Props) {
  const { user, isSignedIn } = useUser()
  const dispatch = useDispatch()
  const [isFav, setIsFav] = useState(false)
  const [showTrailer, setShowTrailer] = useState(false)
  const [mute, setMute] = useState(true)
  const hoverTimeoutRef = useRef<number | null>(null)

  // trailer
  const { data: videosData } = useGetMovieVideosQuery(movie.id)
  const trailer = videosData?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube')

  // init isFav from local favorites for this user
  useEffect(() => {
    if (!isSignedIn || !user?.id) {
      setIsFav(false)
      return
    }
    const local = getUserLocalFavorites(user.id)
    setIsFav(local.some((m: any) => m.id === movie.id))
  }, [isSignedIn, user?.id, movie.id])

  const handleToggleFavorite = () => {
    if (!isSignedIn) {
      alert('Please sign in to add to favorites.')
      return
    }

    // update redux (UI)
    dispatch(toggleFavorite(movie))
    // localStorage per-user update
    const currentLocal = getUserLocalFavorites(user?.id)
    const newLocal = currentLocal.some((m: any) => m.id === movie.id)
      ? currentLocal.filter((m: any) => m.id !== movie.id)
      : [...currentLocal, movie]
    setUserLocalFavorites(user?.id, newLocal)

    setIsFav((prev) => !prev)
    // NOTE: optional: call your /api/favorites to sync with backend if implemented
  }

  // hover handlers (2s delay)
  const handleMouseEnter = () => {
    hoverTimeoutRef.current = window.setTimeout(() => {
      setShowTrailer(true)
    }, 2000)
  }
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setShowTrailer(false)
  }

  return (
    <div
      key={movie.id}
      className="bg-card border border-theme rounded shadow p-4 flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Poster or trailer */}
      <img
        src={movie?.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/fallback.jpg'}
        alt={movie?.title || 'No title'}
        className="rounded h-64 w-full object-cover mb-2"
      />
      <div className="flex justify-between items-center mt-2">
        <h2 className="text-base font-semibold accent">{movie.title}</h2>
        <button onClick={(e) => { e.stopPropagation(); handleToggleFavorite(); }}>
          <Heart className={`w-5 h-5 transition ${isFav ? 'text-red-500 fill-red-500' : 'text-muted'}`} />
        </button>
      </div>
      <p className="text-xs text-muted mt-1">{movie.release_date}</p>
    </div>
  )
}
