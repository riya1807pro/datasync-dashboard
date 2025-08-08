// src/pages/Favorite.tsx
'use client'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MovieCard from '@/components/MovieCard'
import DashboardLayout from '@/layouts/DashboardLayout'
import { useUser } from '@clerk/nextjs'
import { getUserLocalFavorites } from '@/utils/userFavorites'
import { setFavorites } from '@/features/favorite/favoriteSlice'

export default function FavoritesPage() {
  const [isClient, setIsClient] = useState(false)
  const favorites = useSelector((state: any) => state.favorites.favorites)
  const { isSignedIn, user } = useUser()
  const dispatch = useDispatch()

  useEffect(() => {
    setIsClient(true)
  }, [])

  // load per-user local favorites into redux when this page mounts & user is signed in
  useEffect(() => {
    if (isSignedIn && user?.id) {
      const local = getUserLocalFavorites(user.id)
      dispatch(setFavorites(local))
    }
  }, [isSignedIn, user?.id, dispatch])

  if (!isClient) return null

  if (!isSignedIn) {
    return (
      <DashboardLayout>
        <div className="p-6 text-lg">Please sign in to view your favorites.</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">⭐ Your Favorites</h1>
        {favorites.length === 0 ? (
          <p>No favorites added yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {favorites.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
